import { each } from "@/util/index.js"
import { importData } from "./import.js"
import { loadExtensionPacks } from "./extension.js"

import { List } from "../../lib/ListData.class.js"

export default app => ({
    async init(lang, branch) {
        app.LANG = lang
        app.BRANCH = branch
        this._data = {}
        await importData(app).call(this)
        await app.event.emit("app.data.init")
        await loadExtensionPacks(app).call(this)
    },
    get(space, name, _return, lang) {
        if (!lang) lang = app.LANG
        try {
            if (!name) return this._data[lang][space]
            else return this._data[lang][space].get(name, _return)
        } catch (err) {
            console.warn(`Could not get "${name}" in "${space}", returning with default language or \`_return\`.`, { _return, lang })
        }
    },
    set(lang, data) {
        if (data.list) each(data.list, (list, indexName) => {
            const thisList = this._data[lang].list
            if (thisList.has(indexName)) thisList.get(indexName).addItem(...list)
            else thisList.set(indexName, list)
        })
        if (data.grammar) each(data.grammar, grammar => this._data[lang].grammar.add(grammar))
        if (data.text) each(data.text, (key, value) => this._data[lang].text.set(key, value))
    },
    __extensionPackLib: {
        List
    }
})
