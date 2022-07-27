import { each, stringToNode } from "../../util/common.js"
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
    if (this.list._useVirtualScroll) this.list.__vs.resetData(data).scrollToTop()
    else {
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
