import { objectGet } from "@/util/index.js"

export class TextData {
    constructor(data) {
        this._data = data
    }
    get(key, _return) {
        return objectGet(this._data, key, { _return })
    }
    set(key, value) {
        this._data[key] = value
        return this
    }
}
