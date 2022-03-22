import { each, objectGet, mapObject } from "../util/common.js"

export class ListData {
    constructor(data) {
        this._data = parse(data) ?? {}
    }
    get(name) {
        return objectGet(this._data, name, { _return: new List(), handler: s => s?.replace(/\{([\-0-9]+)\}/g, ".getItem($1)")})
    }
    set(name, list) {
        this._data[name] = list
        return this
    }
}

function parse(data) {
    if (Array.isArray(data)) {
        if (data.__app_list__ || data[0]?.__app_list__) return parse(new List(data))
        else return data.map(item => parse(item))
    } else if (data instanceof List) {
        each(data.header, (key, value) => data.setHeader(key, parse(value)))
        each(data.body, (item, i) => data.setItem(i, parse(item)))
        return data
    }
    else if (typeof data === "object") return mapObject(data, item => parse(item))
    else return data
}

export class List {
    constructor(list) {
        if (list) {
            this.setHeader(list[0])
            for (let i = 1; i < list.length; i++) this.setItem(list[i])
        }
    }
    _header = {}
    _body = []
    setHeader(header, value) {
        if (value) this._header[header] = value
        else this._header = header
        return this
    }
    setItem(item, key, value) {
        if (key && this._body[item]) {
            if (value) this._body[item][key] = value
            else this._body[item] = key
        }
        else this._body.push(item)
        return this
    }
    addItem(...items) {
        this._body = items.concat(this.body)
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
