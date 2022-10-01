import deepCopy from "fast-copy"
import { ListItemRenderer } from "../../lib/ListItemRenderer.class.js"

export const _render = app => function(items) {
    const renderer = new ListItemRenderer(app)
    const itemTmpl = app.config.get("list.template.item")
    return items.map(item => handle(item, renderer.setListItem(item), itemTmpl))
}

function handle(item, renderer, itemTmpl) {
    return itemTmpl(
        item._id,
        item.__listName,
        item._i,
        deepCopy(renderer)
    )
}
