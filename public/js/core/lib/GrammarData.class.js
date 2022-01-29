import { each, objectGet, testRegExp } from "../util/common.js"

export class GrammarData {
    constructor(data) {
        this.data = parse(data)
    }
    get(name) {
        return this.data.find(item => testRegExp(item.getHeader().command.name, name)) ?? new Grammar()
    }
}

function parse(data) {
    if (Array.isArray(data)) {
        const output = []
        each(data, grammar => output.push(new Grammar(grammar)))
        return output
    } else return data
}

export class Grammar {
    constructor(grammar) {
        this.header = {}
        this.body = []
        if (grammar) {
            this.setHeader(grammar[0])
            for (let i = 1; i < grammar.length; i++) this.setItem(grammar[i])
        }
    }
    setHeader(header) {
        this.header = header
        return this
    }
    setItem(item) {
        this.body.push(item)
        return this
    }
    getHeader() {
        return this.header
    }
    getItem(index) {
        if (index) return this.body[index]
        else return this.body
    }
    getBody() {
        return this.getItem()
    }
}