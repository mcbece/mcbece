export class DataCache {
    constructor(maxLenght) {
        this.maxLenght = maxLenght
    }
    data = []
    push(name, data) {
        if (!this.some(name)) {
            this.data.push([name, data])
            this.data = this.data.slice(0, this.maxLenght)
            return true
        } else return false
    }
    some(name) {
        return this.data.some(([_name]) => _name === name)
    }
    find(name) {
        return this.data.find(([_name]) => _name === name)[1]
    }
    clear() {
        this.data = []
        return this
    }
}
