import { testRegExp } from "../../util/common.js"

export function getList(name, _return, lang) {
    if (!lang) lang = this.LANG
    try {
        const result = eval(`this.data[lang].list.${name}`)
        return result ?? _return
    } catch {
        if (lang !== this.config.DEFAULT_LANGUAGE) return this.getList(name, _return, this.config.DEFAULT_LANGUAGE)
        else return _return
    }
}

export function getGrammar(name, lang) {
    if (!lang) lang = this.LANG
    try {
        return this.data[lang].grammar.find(item => testRegExp(item[0].command.name, name))
    } catch {
        if (lang !== this.config.DEFAULT_LANGUAGE) return this.getGrammar(name, this.config.DEFAULT_LANGUAGE)
        else return undefined
    }
}

export function getText(name, lang) {
    if (!lang) lang = this.LANG
    try {
        const result = eval(`this.data[lang].text.${name}`)
        return result ?? ""
    } catch {
        if (lang !== this.config.DEFAULT_LANGUAGE) return this.getText(name, this.config.DEFAULT_LANGUAGE)
        else return ""
    }
}