import { each } from "../util/common.js"

export class DataCache {
    constructor(maxLength, filter, data) {
        this.maxLength = maxLength
        this.filter = filter
        this._data = data ?? new Map()
    }
    push(name, data) {
        if (!this.has(name)) {
            this._data.set(name, data)
            if (this.maxLength) this._data = new Map(Array.from(this._data).reverse().slice(0, this.maxLength).reverse())
            return true
        } else {
            this._data.delete(name)
            this._data.set(name, data)
            return false
        }
    }
    has(name) {
        return this._data.has(name)
    }
    get(name) {
        return this._data.get(name)
    }
    clear() {
        this._data.clear()
    }
    get data() {
        let data = []
        each(this._data, item => {
            if (this.filter(item)) data.push(item)
        })
        return new Map(data)
    }
}
