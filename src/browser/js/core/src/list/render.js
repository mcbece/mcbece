import deepCopy from "fast-copy"
import { each, objectHas, objectGet } from "../../util/common.js"
import { ListItemRenderer } from "./renderer.js"

export function _render(items) {
    const renderer = new ListItemRenderer(this, objectGet(this.config, "list.renderer", { _return: {} }))
    const dividerTmpl = objectGet(this.config, "list.template.divider", { _return: defDividerTmpl })
    const itemTmpl = objectGet(this.config, "list.template.item", { _return: defItemTmpl })
    return items.map(item => handle(item, renderer.setListItem(item), dividerTmpl, itemTmpl))
}

function handle(item, renderer, dividerTmpl, itemTmpl) {
    if (item.__divider) return dividerTmpl(
        item.name,
        item.__listName
    )
    else return itemTmpl(
        item._id,
        item.__listName,
        deepCopy(renderer)
    )
}

function defDividerTmpl(name, _name) {
    return `<li id="-1" data-list-name="${_name}">${name}</li>`
}
function defItemTmpl(_id, _name, renderer) {
    return `<li id="${_id}" data-list-name="${_name}">${renderer.get("name")} - ${renderer.get("info")}</li>`
}
