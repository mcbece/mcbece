import merge from "merge-options"
import { each, getReturn, objectGet } from "@util/index.js"
import { getDefListReplacerConfig } from "../defConfig.js"

export class ListItemReplacer {
    constructor(listItem, app) {
        const listInfo = new ListInfo(app, listItem)
        const config = merge(getDefListReplacerConfig(app), app.config.get("list.replacer", {}))
        each(config, ({ directReturn, indirectReturn }, space) => this.addItem(space, directReturn, indirectReturn, listInfo))
    }
    replacers = {}
    addItem(space, directReturn, indirectReturn, listInfo) {
        this.replacers[space] = new ListItemReplacerItem(directReturn, indirectReturn, listInfo)
        return this
    }
    getItem(space) {
        return this.replacers[space]
    }
    hasItem(space) {
        return this.getItem(space) ? true : false
    }
    parse(str, { direct = true } = {}) {
        const regexp = /{\s*(?<space>[^}]+)?\s+(?<name>[^}]+)\s*}/g
        return str.replaceAll(regexp, (...match) => {
            const { space, name } = match.pop()
            if (this.hasItem(space)) return this.parse(this.getItem(space).run(name, { direct }), { direct: false })
            else return ""
        })
    }
}

class ListItemReplacerItem {
    constructor(directReturn, indirectReturn = directReturn, listInfo) {
        this.directReturn = directReturn
        this.indirectReturn = indirectReturn
        this.listInfo = listInfo
    }
    run(name, { direct = false } = {}) {
        if (direct) return getReturn(this.directReturn, name, this.listInfo)
        else return getReturn(this.indirectReturn, name, this.listInfo)
    }
}

class ListInfo {
    constructor(app, listItem) {
        this.listItem = listItem
        this.listHeader = app.list.names[listItem.__listName]
    }
    getItemData(key) {
        return objectGet(this.listItem, key)
    }
    getHeaderData(key) {
        return objectGet(this.listHeader, key)
    }
}
