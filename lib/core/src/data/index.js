import { importData } from "./import.js"
import { setCustom } from "./custom.js"

import { List } from "../../lib/ListData.class.js"

export default app => ({
    async init(lang, branch, dataUrl, customDataUrl) {
        app.LANG = lang
        app.BRANCH = branch
        await importData(app).call(this, dataUrl)
        await setCustom(app).call(this, customDataUrl)
    },
    get(space, name, _return, lang) {
        if (!lang) lang = app.LANG
        try {
            if (!name) return this[lang][space]
            else return this[lang][space].get(name, _return)
        } catch (err) {
            console.warn(`Could not get "${name}" in "${space}", returning with default language or \`_return\`.`, { _return, lang })
            const DEFAULT_LANGUAGE = app.config.get("DEFAULT_LANGUAGE", "langDef")
            if (lang !== DEFAULT_LANGUAGE) return this.get(space, name, _return, DEFAULT_LANGUAGE)
        }
    },
    _forCustom: {
        List
    }
})
