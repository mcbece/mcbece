import { each } from "../../util/common.js"
import { ListItemRenderer } from "./renderer.js"

export function renderToHTML({ names: _names, lists: _lists }, callback) {
    const renderer = new ListItemRenderer(this.config.list.renderer ?? {})
    const names = Object.keys(_names)
    const lists = Object.values(_lists)
    const output = []
    each(lists, (item, i) => {
        const name = names[i]
        if (this.list._useDivider()) output.push(
            this.config.list.template.divider(
                _names[name].name,
                name
            )
        )
        each(item, (listItem, _id) =>
            output.push(
                this.config.list.template.item(
                    _id,
                    name,
                    renderer.setListItem(listItem)
                )
            )
        )
    })
    callback(output)
}