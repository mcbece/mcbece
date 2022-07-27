import { deepEqual } from "fast-equals"
import { each, objectGet, stringToNode } from "../util/common.js"

// https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/components/VVirtualScroll/VVirtualScroll.ts
export class VirtualScroll {
    constructor({
        app,
        data,
        render,
        bench = 0,
        callback = defCallback,
        rootEle = document.querySelector(".virtual-scroll"),
        otherEvent = new Map()
    }) {
        this.data = data
        this.render = render
        this.bench = bench
        this.callback = callback
        this.rootEle = rootEle
        this.container = this.rootEle.querySelector(".virtual-scroll__container")
        this.otherEvent = otherEvent
        
        Object.defineProperty(this, "height", {
            get() {
                return objectGet(app, "_height", { _return: objectGet(app, "height") })
            }
        })
        Object.defineProperty(this, "paddingTop", {
            get() {
                return objectGet(app, "_paddingTop", { _return: objectGet(app, "paddingTop", { _return: 0 }) })
            }
        })
        Object.defineProperty(this, "itemHeight", {
            get() {
                return objectGet(app, "_itemHeight", { _return: objectGet(app, "itemHeight") })
            }
        })
        
        this.initScroll()
    }
    
    first = 0
    last = 0
    scrollTop = 0
    _listener = () => {}
    _items = []
    
    initScroll() {
        const listener = {
            scroll: () => this.onEvent(),
            resize: () => this.onEvent(true)
        }
        this.rootEle.removeEventListener("scroll", this._listener.scrollTo)
        window.removeEventListener("resize", this._listener.resize)
        this.rootEle.addEventListener("scroll", listener.scroll)
        window.addEventListener("resize", listener.resize)
        this._listener = listener
        this.onEvent(true)
    }
    destroy() {
        const listener = this._listener
        this.rootEle.removeEventListener("scroll", listener.scrollTo)
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
        return this.first + Math.ceil((this.height - this.paddingTop) / this.itemHeight)
    }
    onEvent(forceload) {
        this.rootEle.style.height = this.height + "px"
        this.container.style.height = this.itemHeight * this.data.length + "px"
        this.scrollTop = this.rootEle.scrollTop
        this.first = this.getFirst()
        this.last = this.getLast()
        const items = this.getItems(forceload)
        if (items) this.callback(this.container, items, this)
    }
    getItems(forceload) {
        const items = this.data.slice(this.firstToRender, this.lastToRender)
        if (forceload || !deepEqual(this._items, items)) {
            this._items = items
            return this.render(items).map(this.genItem.bind(this))
        }
    }
    genItem(_item, index) {
        const item = _item instanceof Node ? _item : stringToNode(_item)
        item.style.top = `${ (index + this.firstToRender) * this.itemHeight + this.paddingTop }px`
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

function defCallback(container, _items) {
    const items = document.createDocumentFragment()
    each(_items, item => items.appendChild(item))
    container.innerHTML = ""
    container.appendChild(items)
}
