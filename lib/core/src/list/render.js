import deepCopy from "fast-copy"
import { ListItemRenderer } from "../../lib/ListItemRenderer.class.js"

export const _render = core => function(items) {
    const itemTmpl = core.config.get("list.template.item")
    return items.map(item => handle(item, new ListItemRenderer(core, item), itemTmpl))
}

function handle(item, renderer, itemTmpl) {
    return itemTmpl(
        item._id,
        item.__listName,
        item._i,
        renderer
    )
}
