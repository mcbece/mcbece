import { each, objectGet } from "../util/common.js"

export class ListData {
    constructor(data) {
        this.data = parse(data)
    }
    get(name) {
        return objectGet(this.data, name, new List(), s => s?.replace(/\{([0-9]+)\}/g, ".getItem($1)"))
    }
}

function parse(data) {
    if (Array.isArray(data)) {
        if (data.__app_list__ || data[0]?.__app_list__) return parse(new List(data))
        else return data.map(item => parse(item))
    } else if (data instanceof List) {
        each(data.getHeader(), (key, value) => data.setHeader(key, parse(value)))
        each(data.getBody(), (item, i) => data.setItem(i, parse(item)))
        return data
    } else if (typeof data === "object") {
        const output = {}
        each(data, (key, value) => output[key] = parse(value))
        return output
    } else return data
}

export class List {
    constructor(list) {
        this.header = {}
        this.body = []
        if (list) {
            this.setHeader(list[0])
            for (let i = 1; i < list.length; i++) this.setItem(list[i])
        }
    }
    setHeader(header, value) {
        if (value) this.header[header] = value
        else this.header = header
        return this
    }
    setItem(item, key, value) {
        if (key && this.body[item]) {
            if (value) this.body[item][key] = value
            else this.body[item] = key
        }
        else this.body.push(item)
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