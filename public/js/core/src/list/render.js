import { ListItemGetter } from "./getter.js"

export function renderToHTML(callback, _names, _lists) {
    const getter = new ListItemGetter(this.config.list.getter ?? {})
    let names = Object.keys(_names)
    let lists = Object.values(_lists)
    let output = []
    lists.forEach((item, i) => {
        let name = names[i]
        if (!this.lite && this.config.list.divider) output.push(
            this.config.list.divider(
                _names[name].name,
                name
            )
        )
        item.forEach((listItem, _id) =>
            output.push(
                this.config.list.item(
                    _id,
                    name,
                    getter.setListItem(listItem)
                )
            )
        )
        getter.setListItem()
    })
    callback(output)
}