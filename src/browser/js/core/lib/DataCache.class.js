export class DataCache {
    constructor(maxLenght, data) {
        this.maxLenght = maxLenght
        this.data = data ?? new Map()
    }
    push(name, data) {
        if (!this.has(name)) {
            this.data.set(name, data)
            if (this.maxLenght) this.data = new Map(Array.from(this.data).slice(0, this.maxLenght))
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
