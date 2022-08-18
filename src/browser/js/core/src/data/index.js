import { importData } from "./import.js"
import { setCustom } from "./custom.js"

import { List } from "../../lib/ListData.class.js"

export default class {
    constructor(app) {
        this.init = this.init.bind(app)
        this.get = this.get.bind(app)
    }
    async init(lang, branch, dataUrl, customDataUrl) {
        this.LANG = lang
        this.BRANCH = branch
        await importData.call(this, dataUrl)
        await setCustom.call(this, customDataUrl)
    }
    get(space, name, _return, lang) {
        if (!lang) lang = this.LANG
        try {
            if (!name) return this.data[lang][space]
            else return this.data[lang][space].get(name, _return)
        } catch (err) {
            console.warn(`Could not get "${name}" in "${space}", returning with default language or \`_return\`.`, { _return, lang })
            const DEFAULT_LANGUAGE = this.config.get("DEFAULT_LANGUAGE", "langDef")
            if (lang !== DEFAULT_LANGUAGE) return this.data.get(space, name, _return, DEFAULT_LANGUAGE)
        }
    }
    _forCustom = {
        List
    }
}
