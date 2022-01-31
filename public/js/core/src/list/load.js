import { each, stringToNode, nodeToString } from "../../util/common.js"

export function loadToPage(data, container) {
    container.innerHTML = ""
    if (this.useVirtualScroll) new VirtualScroll(this, data, 1)
    else if (window.IntersectionObserver) loadByIntersectionObserver.call(this, data, container)
    else {
        const items = document.createDocumentFragment()
        each(data, item => items.appendChild(stringToNode(item, true)))
        container.appendChild(items)
        this.list.complete = true
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    }
}

// https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/components/VVirtualScroll/VVirtualScroll.ts
class VirtualScroll {
    constructor(app, data, bench = 0) {
        this.__app = app
        this.data = data
        this.bench = bench
        this.rootEle = document.querySelector(".virtual-scroll")
        this.container = this.rootEle.querySelector(".virtual-scroll__container")
        this.init()
        this.rootEle.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    }
    init(container) {
        this.first = 0
        this.last = 0
        this.scrollTop = 0
        const onScroll = () => this.onScroll()
        this.rootEle.removeEventListener("scroll", this.__app._onScroll)
        window.removeEventListener("resize", this.__app._onScroll)
        this.__app._onScroll = onScroll
        this.rootEle.addEventListener("scroll", onScroll)
        window.addEventListener("resize", onScroll)
        this.rootEle.dispatchEvent(new Event("scroll"))
    }
    get height() {
        const _fix = this.__app.lite ? 85 : 120
        return document.documentElement.clientHeight - _fix
    }
    get itemHeight() {
        if (this.__app.lite) {
            const height = window.innerHeight / 16
            if (height > 36) return 36
            else if (height < 24) return 24
            else return Math.round(height)
        } else return 72
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
    onScroll() {
        this.rootEle.style.height = this.height + "px"
        this.container.style.height = this.itemHeight * this.data.length + "px"
        this.scrollTop = this.rootEle.scrollTop
        this.first = this.getFirst()
        this.last = this.getLast()
        this.render()
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
        let list = ""
        each(items, e => list += e)
        this.container.innerHTML = list
    }
}

// https://www.xiabingbao.com/post/scroll/longlist-optimization.html
function loadByIntersectionObserver(data, container) {
    this.list.__complete = false
    let start = 0
    const COUNT = 20
    loadList(start)
    if (data.length >= 20) {
        const observerEle = document.createElement("div")
        observerEle.id = "observer"
        container.appendChild(observerEle)
        const observer = new IntersectionObserver(entries => {
            const entry = entries[0]
            if (entry.intersectionRatio <= 0 || !entry.isIntersecting) return false
            start += COUNT
            loadList(start, () => {
                observer.unobserve(entry.target)
                container.removeChild(entry.target)
                // FIXME  ^^^^^^^^^^^
                this.list.__complete = true
            })
        }, {
            rootMargin: "400px 0px"
        })
        observer.observe(container.querySelector("#observer"))
    }
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    })
    function loadList(start, handler = () => {}) {
        const list = document.createDocumentFragment()
        for (let i = start, len = start + COUNT; i < len && i < data.length; i++) {
            list.appendChild(stringToNode(data[i], true))
            if (i === data.length - 1) handler()
        }
        container.insertBefore(list, container.querySelector(`#observer`))
    }
}