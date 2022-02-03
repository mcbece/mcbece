import { each, stringToNode } from "../../util/common.js"
import { VirtualScroll } from "../../lib/VirtualScroll.class.js"

export function loadToPage(data, container) {
    container.innerHTML = ""
    if (this._useVirtualScroll) loadByVirtualScroll.call(this, data)
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

function loadByVirtualScroll(data) {
    new VirtualScroll(this, data, 1)
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