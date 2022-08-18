import { testRegExp } from "../util/common.js"

export class GrammarData {
    constructor(data) {
        this._data = parse(data)
    }
    get(name) {
        return this._data.find(item => testRegExp(item.header.command.name, name)) ?? new Grammar()
    }
    add(item) {
        this._data.push(item)
        return this
    }
}

function parse(data) {
    if (Array.isArray(data)) return data.map(grammar => new Grammar(grammar))
    else return data
}

export class Grammar {
    constructor(grammar) {
        if (grammar) {
            this.setHeader(grammar[0])
            for (let i = 1; i < grammar.length; i++) this.setItem(grammar[i])
        }
    }
    _header = {}
    _body = []
    setHeader(header) {
        this._header = header
        return this
    }
    setItem(item) {
        this._body.push(item)
        return this
    }
    getItem(index) {
        if (index >= 0) return this._body[index]
        else if (index < 0) return this._header
        else return this._body
    }
    get header() {
        return this.getItem(-1)
    }
    get body() {
        return this.getItem()
    }
}
