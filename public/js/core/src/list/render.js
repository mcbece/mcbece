import { ListItemRenderer } from "./renderer.js"

export function renderToHTML({ names: _names, lists: _lists }, callback) {
    const renderer = new ListItemRenderer(this.config.list.renderer ?? {})
    const names = Object.keys(_names)
    const lists = Object.values(_lists)
    const output = []
    lists.forEach((item, i) => {
        const name = names[i]
        if (!this.lite && this.config.list.template.divider) output.push(
            this.config.list.template.divider(
                _names[name].name,
                name
            )
        )
        item.forEach((listItem, _id) =>
            output.push(
                this.config.list.template.item(
                    _id,
                    name,
                    renderer.setListItem(listItem)
                )
            )
        )
        renderer.setListItem()
    })
    callback(output)
}