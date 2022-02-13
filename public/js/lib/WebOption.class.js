import { each } from "../core/util/common.js"
import { stringify, parse } from "../core/util/JSONWithFun.js"

export class WebOption {
    constructor(namespace = "WebOption") {
        this._namespace = namespace
        this.items = {}
    }
    init(...callbacks) {
        this.getStorage()
        this.setStorage()
        each(callbacks, callback => callback(this.getItemValMap()))
        this.addItem = undefined
        this.getStorage = undefined
        this.init = undefined
        return this
    }
    addItem({ name, values, callback, handler, defaultValue }) {
        this.items[name] = new WebOptionItem({ name, values, callback, handler, defaultValue })
        return this
    }
    hasItem(name) {
        return this._getItem(name) ? true : false
    }
    _getItem(name) {
        return this.items[name]
    }
    setItemVal(name, value, callback = () => {}) {
        const item = this._getItem(name)
        const result = item?.select(value)
        if (result) callback(item.selected, item.original, this.getItemValMap())
        this.setStorage()
        return this
    }
    toggleItemVal(name, callback = () => {}) {
        const item = this._getItem(name)
        item?.toggle()
        callback(item.selected, item.original, this.getItemValMap())
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
        localStorage.setItem(this._namespace + ":all", stringify(storage))
    }
    getStorage() {
        let storage = parse(localStorage.getItem(this._namespace + ":all") ?? "{}")
        each(storage, (key, value) => this.setItemVal(key, value))
    }
}

class WebOptionItem {
    constructor({ name, values = [], callback = () => {}, handler = s => s, defaultValue }) {
        this.name = name
        this.values = new Set(values)
        this.callback = (...args) => {
            if (this.selected) callback(...args)
        }
        this.handler = handler
        this.selected = this.hasVal(defaultValue) ? defaultValue : values[0]
        this.original = undefined
        this.callback(this.selected)
    }
    select(value, withoutcallback) {
        if (this.selected !== value && this.hasVal(value)) {
            this.original = this.selected
            this.selected = /* this.handler(value) */ value
            if (!withoutcallback) this.callback(this.selected, this.original)
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
