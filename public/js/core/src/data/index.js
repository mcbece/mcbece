import {
    getList,
    getGrammar,
    getText
} from "./get.js"

export default class {
    constructor(app) {
        this.getList = getList.bind(app)
        this.getGrammar = getGrammar.bind(app)
        this.getText = getText.bind(app)
    }
}