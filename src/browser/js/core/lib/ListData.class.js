import { each, objectGet } from "../util/common.js"

export class ListData {
    constructor(_data) {
        if (_data) each(_data, (_list, indexName) => this.set(indexName, _list))
    }
    _data = {}
    get(indexName) {
        return objectGet(this._data, indexName)
    }
    set(indexName, _list) {
        const list = new List(indexName)
        list.setHeader(_list[0])
        for (let i = 1; i < _list.length; i++) list.addItem(_list[i])
        this._data[indexName] = list
        return this
    }
    has(indexName) {
        return this._data[indexName] ? true : false
    }
}

export class List {
    constructor(indexName) {
        this._indexName = indexName
    }
    _header = {}
    _body = []
    setHeader(header, value) {
        if (value) this._header[header] = value
        else this._header = header
        return this
    }
    setItem(index, key, value) {
        if (value) this._body[index][key] = value
        else this._body[index] = key
        return this
    }
    addItem(...items) {
        this._body = this._body.concat(items)
        return this
    }
    get export() {
        return [
            this._header,
            ...this._body
        ]
    }
}
