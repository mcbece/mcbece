import { each, objectGet, stringToNode, nodeToString } from "../util/common.js"

// https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/components/VVirtualScroll/VVirtualScroll.ts
export class VirtualScroll {
    constructor({app, data, render, bench = 0, callback = () => {}, indexSign = "_i"}) {
        this.__app = app
        this.indexSign = indexSign
        this.data = data
        this.render = render
        this.bench = bench
        this.callback = callback
        this.rootEle = document.querySelector(".virtual-scroll")
        this.container = this.rootEle.querySelector(".virtual-scroll__container")
        
        if (/* "IntersectionObserver" in window */ false) this.initObserver()
        else this.initScroll()
    }
    
    first = 0
    last = 0
    scrollTop = 0
    
    initScroll() {
        const _listener = () => this.onEvent()
        this.rootEle.removeEventListener("scroll", this.__app.list._vs_listener)
        window.removeEventListener("resize", this.__app.list._vs_listener)
        this.__app.list._vs_listener = _listener
        this.rootEle.addEventListener("scroll", _listener)
        window.addEventListener("resize", _listener)
        this.rootEle.dispatchEvent(new Event("scroll"))
    }
    destroy() {
        this.rootEle.removeEventListener("scroll", this.__app.list._vs_listener)
        window.removeEventListener("resize", this.__app.list._vs_listener)
    }
    initObserver() {
        this.useObserver = true
        this.observer = new IntersectionObserver((entries, observer) => {
            if (entries[0].intersectionRatio > 0) {
                observer.unobserve(entries.at(-1).target)
                this.onEvent()
            } else {
                observer.unobserve(entries.at(0).target)
                this.onEvent()
            }
        })
        this.onEvent()
    }
    get height() {
        return objectGet(this.__app.config, "list._height")
    }
    get itemHeight() {
        return objectGet(this.__app.config, "list._itemHeight")
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
    onEvent() {
        this.rootEle.style.height = this.height + "px"
        this.container.style.height = this.itemHeight * this.data.length + "px"
        this.scrollTop = this.rootEle.scrollTop
        this.first = this.getFirst()
        this.last = this.getLast()
        this.callback(this.container, this.getItems(), this)
    }
    getItems() {
        const items = this.data.slice(this.firstToRender, this.lastToRender)
        return this.render(items).map(this.genItem.bind(this))
    }
    genItem(_item, index) {
        const item = _item instanceof Node ? _item : stringToNode(_item)
        item.style.top = `${(index + this.firstToRender) * this.itemHeight}px`
        item.classList.add("virtual-scroll__item")
        if (this.useObserver) this.observer.observe(item)
        return item
    }
}
