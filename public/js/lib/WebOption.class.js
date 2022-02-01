import { each } from "../core/util/common.js"

export class WebOption {
    constructor(namespace = "WebOption") {
        this._namespace = namespace
        this.items = {}
    }
    init(...handlers) {
        this.getStorage()
        this.setStorage()
        each(handlers, handler => handler(this.getItemValMap()))
        this.addItem = undefined
        this.getStorage = undefined
        this.init = undefined
        return this
    }
    addItem(name, values, handler, defaultValue) {
        this.items[name] = new WebOptionItem(name, values, handler, defaultValue)
        return this
    }
    hasItem(name) {
        return this._getItem(name) ? true : false
    }
    _getItem(name) {
        return this.items[name]
    }
    setItemVal(name, value, handler = () => {}) {
        const item = this._getItem(name)
        const result = item?.select(value)
        if (result) handler(item.selected, item.original, this.getItemValMap())
        this.setStorage()
        return this
    }
    toggleItemVal(name, handler = () => {}) {
        const item = this._getItem(name)
        item?.toggle()
        handler(item.selected, item.original, this.getItemValMap())
        this.setStorage()
        return this
    }
    getItemVal(name) {
        return this._getItem(name)?.selected
    }
    getItemValMap() {
        let result = {}
        each(this.items, key => result[key] = this.getItemVal(key))
        return result
    }
    setStorage() {
        let storage = this.getItemValMap()
        localStorage.setItem(this._namespace + ":all", JSON.stringify(storage))
    }
    getStorage() {
        let storage = JSON.parse(localStorage.getItem(this._namespace + ":all") ?? "{}")
        each(storage, (key, value) => this.setItemVal(key, value))
    }
}

class WebOptionItem {
    constructor(name, values = [], handler = () => {}, defaultValue) {
        this.name = name
        this.values = new Set(values)
        this.handler = (...args) => {
            if (this.selected) handler(...args)
        }
        this.selected = this.hasVal(defaultValue) ? defaultValue : values[0]
        this.original = undefined
        this.handler(this.selected)
    }
    select(value) {
        if (this.selected !== value && this.hasVal(value)) {
            this.original = this.selected
            this.selected = value
            this.handler(this.selected, this.original)
            return true
        } else return false
    }
    toggle() {
        let _values = [...this.values]
        for (let i = 0; i < _values.length; i++) {
            let item = _values[i]
            if (this.selected === item) {
                if (i < _values.length - 1) this.select(_values[i + 1])
                else this.select(_values[0])
                break
            }
        }
    }
    addVal(value) {
        this.values.add(value)
        return this
    }
    delVal(value) {
        this.values.delete(value)
        return this
    }
    hasVal(value) {
        return this.values.has(value) || !this.values.size
    }
}