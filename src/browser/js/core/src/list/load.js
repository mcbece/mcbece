import { each, stringToNode } from "../../util/common.js"
import { VirtualScroll } from "../../lib/VirtualScroll.class.js"
import { _render } from "./render.js"

export function _load({ names, lists }, container) {
    const data = []
    each(lists, (name, list) => {
        if (this.list._useDivider) data.push({
            __divider: true,
            __listName: name,
            _id: -1,
            name: names[name].name
        })
        each(list, (item, i) =>
            data.push(
                Object.assign(item, {
                    __listName: name,
                    _id: i
                })
            )
        )
    })
    if (this.list._useVirtualScroll) {
        if (this.list.__vs) this.list.__vs.resetData(data).scrollToTop()
        else {
            const vs = new VirtualScroll({
                rootEle: document.querySelector(".list-container"),
                app: this,
                data,
                render: _render.bind(this),
                bench: 5,
                callback: (container, _items) => {
                    const items = document.createDocumentFragment()
                    each(_items, item => items.appendChild(item))
                    container.innerHTML = ""
                    container.appendChild(items)
                }
            })
            this.list.__vs = vs.scrollToTop()
        }
    } else {
        container.innerHTML = ""
        const items = document.createDocumentFragment()
        each(_render.call(this, data), item => items.appendChild(stringToNode(item, true)))
        container.appendChild(items)
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    }
}
