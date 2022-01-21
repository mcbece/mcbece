import { ListItemGetter } from "./getter.js"

export function renderToHTML(callback, _names, _lists) {
    const getter = new ListItemGetter(this.config.list.getter ?? {})
    let names = Object.keys(_names)
    let lists = Object.values(_lists)
    let output = []
    lists.forEach((item, i) => {
        let name = names[i]
        if (!this.thin_model) output.push(`
            <li id="listName" data-list-name="${name}">
                <div class="mdui-list-item-text">---------- ${_names[name].name} ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</div>
            </li>
        `)
        item.forEach((listItem, _id) => output.push(
                this.config.list.template(
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