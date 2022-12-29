import { each } from "@/util/index.js"
import { importData } from "./import.js"
import { loadExtensionPacks } from "./extension.js"

import { List } from "../../lib/ListData.class.js"

export default core => class {
    constructor() {}
    async init() {
        const option = core.plugin.get(/^(.+):option/)
        this.lang = option.getItemVal("lang")
        this.branch = option.getItemVal("branch")
        this._data = {}
        await importData(core).call(this)
        await core.event.emit("core.data.init")
        await loadExtensionPacks(core).call(this)
    }
    get(space, name, _return) {
        try {
            if (!name) return this._data[this.lang][space]
            else return this._data[this.lang][space].get(name, _return)
        } catch (err) {
            console.warn(`Could not get "${name}" in "${space}", returning with \`_return\`.`, { _return })
        }
    }
    set(data) {
        if (data.list) each(data.list, (list, indexName) => {
            const thisList = this._data[this.lang].list
            if (thisList.has(indexName)) thisList.get(indexName).addItem(...list)
            else thisList.set(indexName, list)
        })
        if (data.grammar) each(data.grammar, grammar => this._data[this.lang].grammar.add(grammar))
        if (data.text) each(data.text, (key, value) => this._data[this.lang].text.set(key, value))
    }
    __extensionPackLib = {
        List
    }
}
