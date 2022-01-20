import {
    getList,
    getGrammar,
    getText
} from "./get.js"

export default class {
    constructor(app) {
        this.getList = this.getList.bind(app)
        this.getGrammar = this.getGrammar.bind(app)
        this.getText = this.getText.bind(app)
    }
    getList(name, _return, lang) {
        if (!lang) lang = this.LANG
        return getList.call(this, name, _return, lang)
    }
    getGrammar(name, lang) {
        if (!lang) lang = this.LANG
        return getGrammar.call(this, name, lang)
    }
    getText(name, lang) {
        if (!lang) lang = this.LANG
        return getText.call(this, name, lang)
    }
}