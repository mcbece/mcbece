import merge from "merge-options"
import { each, getReturn, objectGet } from "@/util/index.js"
import { getDefListReplacerConfig } from "../defConfig.js"

export class ListItemReplacer {
    constructor(app, listItem) {
        const presentListItem = new PresentListItem(app, listItem)
        const config = merge(getDefListReplacerConfig(app), app.config.get("list.replacer", {}))
        each(config, ({ directReturn, indirectReturn }, space) => {
            this.replacers[space] = new ListItemReplacerItem(directReturn, indirectReturn, presentListItem)
        })
    }
    replacers = {}
    getItem(space) {
        return this.replacers[space]
    }
    hasItem(space) {
        return (
            this.getItem(space) ||
            this.getItem(space.replace(":").toLowerCase())
        ) ? true : false
    }
    parse(str, { direct = true } = {}) {
        const regexp = /{\s*(?<space>[^}]+)?\s+(?<name>[^}]+)\s*}/g
        return str.replaceAll(regexp, (...match) => {
            const { space, name } = match.pop()
            if (this.hasItem(space)) return this.parse(this.getItem(space).run(name, { direct }), { direct: false })
            else return ""
        })
    }
    get(name) {
        return this.parse(this.presentListItem.getItemData(name))
    }
}

class ListItemReplacerItem {
    constructor(directReturn, indirectReturn = directReturn, presentListItem) {
        this.directReturn = directReturn
        this.indirectReturn = indirectReturn
        this.presentListItem = presentListItem
    }
    run(name, { direct = false } = {}) {
        if (direct) return getReturn(this.directReturn, name, this.presentListItem)
        else return getReturn(this.indirectReturn, name, this.presentListItem)
    }
}

class PresentListItem {
    constructor(app, listItem) {
        this.item = listItem
        this.header = app.list.names[listItem.__listName]
    }
    getItemData(key) {
        return objectGet(this.item, key)
    }
    getHeaderData(key) {
        return objectGet(this.header, key)
    }
}
