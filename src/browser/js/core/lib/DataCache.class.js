import { each } from "../util/common.js"

export class DataCache {
    constructor(maxLength) {
        this.maxLength = maxLength
        this.data = new Map()
    }
    push(name, data) {
        if (!this.has(name)) {
            this.data.set(name, data)
            if (this.maxLength) this.data = new Map(Array.from(this.data).reverse().slice(0, this.maxLength).reverse())
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
