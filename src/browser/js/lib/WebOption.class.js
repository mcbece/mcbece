import { each, toString } from "../_core/util/common.js"
import { stringify, parse } from "../_core/util/betterJSON.js"

export class WebOption {
    constructor(namespace = "WebOption") {
        this._namespace = namespace
    }
    items = {}
    init(...callbacks) {
        this.getStorage()
        this.setStorage()
        each(callbacks, callback => callback(this.getItemValMap()))
        this.addItem = undefined
        this.getStorage = undefined
        this.init = undefined
        return this
    }
    addItem(opts) {
        this.items[opts.name] = new WebOptionItem(opts)
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
        const result = {}
        each(this.items, key => result[key] = this.getItemVal(key))
        
        console.log(result)
        
        return result
    }
    setStorage() {
        const storage = this.getItemValMap()
        localStorage.setItem(this._namespace + ":all", stringify(storage))
    }
    getStorage() {
        const storage = parse(localStorage.getItem(this._namespace + ":all") ?? "{}")
        each(storage, (key, value) => this.setItemVal(key, value))
    }
}

class WebOptionItem {
    constructor({ name, description, values = [], callback = () => {}, /* handler = s => s, */ defaultValue }) {
        this.name = name
        this.description = description
        this.values = new Map(values.map(value => {
            if (typeof value[0] === "object") value[0] = toString(value[0])
            else if (value[0] === undefined) value[0] = "undefined"
            if (value[0] === true && !value[1]) value[1] = "开启"
            else if (value[0] === false && !value[1]) value[1] = "关闭"
            return value
        }))
        this.callback = callback
        // this.handler = handler
        this.selected = this.hasVal(defaultValue) ? defaultValue : values[0][0]
        this.callback(this.selected)
    }
    select(value, withoutCallback) {
        if (this.selected !== value && this.hasVal(value)) {
            this.original = this.selected
            this.selected = /* this.handler(value) */ value
            if (!withoutCallback) this.callback(this.selected, this.original)
            return true
        } else return false
    }
    toggle() {
        const _values = [...this.values]
        for (let i = 0; i < _values.length; i++) {
            const item = _values[i]
            if (this.selected === item[0]) {
                if (i < _values.length - 1) this.select(_values[i + 1][0])
                else this.select(_values[0][0])
                break
            }
        }
    }
    addVal(name, description) {
        this.values.set(name, description)
        return this
    }
    delVal(name) {
        this.values.delete(value)
        return this
    }
    hasVal(name) {
        return this.values.has(name) || !this.values.size
    }
    getValueDescription(name) {
        if (name === undefined) name = this.selected
        return this.values.get(name)
    }
}
