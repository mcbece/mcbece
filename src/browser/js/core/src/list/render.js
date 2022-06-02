import { each, objectHas, objectGet } from "../../util/common.js"
import deepCopy from "fast-copy"
import { ListItemRenderer } from "./renderer.js"

export function _render(items) {
    const renderer = new ListItemRenderer(this, objectGet(this.config, "list.renderer", { _return: {} }))
    return items.map(item => handle.call(this, item, renderer.setListItem(item)))
}

function handle(item, renderer) {
    if (item.__divider) return objectGet(this.config, "list.template.divider", { _return: defDividerTmpl })(
        item.name,
        item.__listName
    )
    else return objectGet(this.config, "list.template.item", { _return: defItemTmpl })(
        item._id,
        item.__listName,
        deepCopy(renderer)
    )
}

function defDividerTmpl(name, _name) {
    return `<li id="-1" data-list-name="${_name}">${name}</li>`
}
function defItemTmpl(_id, _name, renderer) {
    return `<li id="${_id}" data-list-name="${_name}">${renderer.get("name")}</li>`
}
