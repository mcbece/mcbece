import { objectGet } from "../../util/common.js"
import { getFromURL } from "./get.js"
import { setCustom } from "./custom.js"

export default class {
    constructor(app) {
        this.init = this.init.bind(app)
        this.get = this.get.bind(app)
    }
    async init(lang, branch, url, urlsInput) {
        this.LANG = lang
        this.BRANCH = branch
        await getFromURL.call(this, url)
        await setCustom.call(this, urlsInput)
    }
    get(space, name, _return, lang) {
        if (!lang) lang = this.LANG
        try {
            return this.data[lang][space].get(name, _return)
        } catch (err) {
            console.warn(`Could not get "${name}" in "${space}", returning with default language or \`_return\`.`, {_return}, err)
            const DEFAULT_LANGUAGE = objectGet(this.config, "DEFAULT_LANGUAGE", { _return: "langDef" })
            if (lang !== DEFAULT_LANGUAGE) return this.data.get(space, name, _return, DEFAULT_LANGUAGE)
        }
    }
}
