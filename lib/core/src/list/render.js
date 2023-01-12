import deepCopy from "fast-copy"
import { ListItemRenderer } from "../../lib/ListItemRenderer.class.js"

export const _render = core => function(items) {
    const itemTmpl = core.config.get("list.template.item")
    return items.map(item => handle(itemTmpl, new ListItemRenderer(core, item), item))
}

function handle(itemTmpl, renderer, item) {
    return itemTmpl(
        renderer,
        item.__id,
        item.__listName,
        item._i
    )
}
