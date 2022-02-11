import { each, objectHas, objectGet } from "../../util/common.js"
import { ListItemRenderer } from "./renderer.js"

export function _render(items) {
    if (Array.isArray(items)) return items.map(handle.bind(this))
    else return handle.call(this, items)
}

function handle(item) {
    const renderer = new ListItemRenderer(this, objectGet(this.config, "list.renderer", {}))
    if (item.__divider) return objectGet(this.config, "list.template.divider", defDividerTmpl)(
        item.name,
        item.__listName
    )
    else return objectGet(this.config, "list.template.item", defItemTmpl)(
        item._id,
        item.__listName,
        renderer.setListItem(item)
    )
}

function defDividerTmpl(name, _name) {
    return `<li id="-1" data-list-name="${_name}">${name}</li>`
}
function defItemTmpl(_id, _name, renderer) {
    return `
        <li id="${_id}" data-list-name="${_name}">${renderer.get("name")}</li>
    `
}