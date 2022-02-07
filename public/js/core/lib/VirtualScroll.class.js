import { each, stringToNode, nodeToString } from "../util/common.js"

// https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/components/VVirtualScroll/VVirtualScroll.ts
export class VirtualScroll {
    constructor(app, data, option = {}) {
        this.__app = app
        this.data = data
        this.option = option
        this.rootEle = document.querySelector(".virtual-scroll")
        this.container = this.rootEle.querySelector(".virtual-scroll__container")
        this.init()
    }
    
    first = 0
    last = 0
    scrollTop = 0
    
    init() {
        const onScroll = () => this.onScroll()
        this.rootEle.removeEventListener("scroll", this.__app._onScroll)
        window.removeEventListener("resize", this.__app._onScroll)
        this.__app._onScroll = onScroll
        this.rootEle.addEventListener("scroll", onScroll)
        window.addEventListener("resize", onScroll)
        this.rootEle.dispatchEvent(new Event("scroll"))
    }
    get height() {
        return this.__app.config.list._height
    }
    get itemHeight() {
        return this.__app.config.list._itemHeight
    }
    get firstToRender() {
      return Math.max(0, this.first - this.option.bench ?? 0)
    }
    get lastToRender() {
      return Math.min(this.data.length, this.last + this.option.bench ?? 0)
    }
    getFirst() {
        return Math.floor(this.scrollTop / this.itemHeight)
    }
    getLast() {
        return this.first + Math.ceil(this.height / this.itemHeight)
    }
    onScroll() {
        this.rootEle.style.height = this.height + "px"
        this.container.style.height = this.itemHeight * this.data.length + "px"
        this.scrollTop = this.rootEle.scrollTop
        this.first = this.getFirst()
        this.last = this.getLast()
        const items = this.render()
        if (this.option.onScroll) this.option.onScroll(items)
    }
    getChildren() {
        return this.data.slice(
            this.firstToRender,
            this.lastToRender,
        ).map(this.genChild.bind(this))
    }
    genChild(_item, index) {
        index += this.firstToRender
        const top = `${index * this.itemHeight}px`
        const item = stringToNode(_item)
        item.style.top = top
        item.classList.add("virtual-scroll__item")
        return nodeToString(item)
    }
    render() {
        const items = this.getChildren()
        if (this.option.raw) return items
        let list = ""
        each(items, e => list += e)
        this.container.innerHTML = list
    }
}