import { deepEqual } from "fast-equals"
import { each, objectGet, stringToNode } from "@/util/index.js"

// https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/components/VVirtualScroll/VVirtualScroll.ts
export class VirtualScroll {
    constructor({
        rootEle = document.querySelector(".virtual-scroll"),
        data,
        render = e => e,
        callback = defCallback,
        
        bench,
        height,
        itemHeight,
        _getter = {}
        
    }) {
        this.rootEle = rootEle
        this.container = rootEle.querySelector(".virtual-scroll__container")
        this.data = data
        this.render = render
        this.callback = callback
        
        if (bench !== undefined) this.bench = bench
        if (height !== undefined) this.height = height
        if (itemHeight !== undefined) this.itemHeight = itemHeight
        each(Object.keys(_getter), name => {
            Object.defineProperty(this, name, {
                get() {
                    return _getter[name]
                }
            })
        })
    }
    
    first = 0
    last = 0
    scrollTop = 0
    _listener = {}
    _items = []
    
    initScroll() {
        const listener = {
            scroll: () => this.onEvent(),
            resize: () => this.onEvent({ forceload: true })
        }
        this.rootEle.removeEventListener("scroll", this._listener.scroll)
        window.removeEventListener("resize", this._listener.resize)
        this.rootEle.addEventListener("scroll", listener.scroll)
        window.addEventListener("resize", listener.resize)
        this._listener = listener
        this.onEvent({ forceload: true })
    }
    destroy() {
        const listener = this._listener
        this.rootEle.removeEventListener("scroll", listener.scroll)
        window.removeEventListener("resize", listener.resize)
        this.data = []
    }
    get firstToRender() {
        return Math.max(0, this.first - this.bench)
    }
    get lastToRender() {
        return Math.min(this.data.length, this.last + this.bench)
    }
    getFirst() {
        return Math.floor(this.scrollTop / this.itemHeight)
    }
    getLast() {
        return this.first + Math.ceil(this.height / this.itemHeight)
    }
    onEvent({ forceload } = {}) {
        this.rootEle.style.height = this.height + "px"
        this.container.style.height = this.itemHeight * this.data.length + "px"
        this.scrollTop = this.rootEle.scrollTop
        this.first = this.getFirst()
        this.last = this.getLast()
        const items = this.getItems({ forceload })
        if (items) this.callback(items, this.container, this)
    }
    getItems({ forceload } = {}) {
        const items = this.data.slice(this.firstToRender, this.lastToRender)
        if (forceload || !deepEqual(this._items, items)) {
            this._items = items
            return this.render(items).map(this.genItem.bind(this))
        }
    }
    genItem(_item, index) {
        const item = stringToNode(_item)
        item.style.top = `${ (index + this.firstToRender) * this.itemHeight }px`
        item.style.height = `${this.itemHeight}px`
        item.classList.add("virtual-scroll__item")
        return item
    }
    resetData(data) {
        this.data = data
        this.initScroll()
        return this
    }
    scrollToTop() {
        this.rootEle.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
        return this
    }
}

function defCallback(_items, container) {
    const items = document.createDocumentFragment()
    each(_items, item => items.appendChild(item))
    container.innerHTML = ""
    container.appendChild(items)
}
