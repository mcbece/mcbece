import { sliceByMaxLength } from "../util/common.js"

export class DataCache {
    constructor(maxLength) {
        this.maxLength = maxLength
    }
    data = new Map()
    push(name, data) {
        if (!this.has(name)) {
            this.data.set(name, data)
            if (this.maxLength) this.data = new Map(sliceByMaxLength(Array.from(this.data), this.maxLength))
            return true
        } else {
            this.data.delete(name)
            this.data.set(name, data)
            return false
        }
    }
    has(name) {
        return this.data.has(name)
    }
    get(name) {
        return this.data.get(name)
    }
    clear() {
        this.data.clear()
    }
}
