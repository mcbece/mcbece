import { openDB } from "idb/with-async-ittr"
import { each, asyncEach, toString, sliceByMaxLength } from "@/util/index.js"
import { EventEmitter } from "./EventEmitter.class.js"

export class WebOption {
    static async initAll(...wos) {
        const _db = await openDB("WebOption", 1, {
            upgrade: db => {
                each(wos, wo => {
                    const store = db.createObjectStore(wo._storeName, {
                        keyPath: "name",
                        autoIncrement: true
                    })
                    store.createIndex("value", "value")
                    each(wo.items, (_, name) => store.put({
                        name,
                        value: wo.getItemVal(name)
                    }))
                })
            }
        })
        const result = []
        await asyncEach(wos, async wo => {
            wo._db = _db
            await wo._getStorage()
            result.push(wo.getItemValMap())
        })
        return result
    }
    
    constructor(storeName) {
        this._storeName = storeName
    }
    items = {}
    async init(...callbacks) {
        this._db = await openDB("WebOption", 1, {
            upgrade: db => {
                const store = db.createObjectStore(this._storeName, {
                    keyPath: "name",
                    autoIncrement: true
                })
                store.createIndex("value", "value")
                each(this.items, (_, name) => store.put({
                    name,
                    value: this.getItemVal(name)
                }))
            }
        })
        await this._getStorage()
        const result = this.getItemValMap()
        each(callbacks, callback => callback(result))
        return result
    }
    addItem(opts) {
        if (opts.storageModel) this.items[opts.name] = new WebStorageItem(opts)
        else this.items[opts.name] = new WebOptionItem(opts)
        return this
    }
    _getItem(name) {
        return this.items[name]
    }
    setItemVal(name, value, callback = () => {}, { getFromStorage } = {}) {
        const item = this._getItem(name)
        if (item instanceof WebStorageItem) {
            if (getFromStorage) item.setData(value)
            else item.addData(value)
            callback(value, item.data, this.getItemValMap())
        } else {
            const result = item.select(value)
            if (result) callback(item.selected, item.original, this.getItemValMap())
        }
        return this
    }
    deleteStoreData(name, data) {
        const item = this._getItem(name)
        if (item instanceof WebStorageItem) item.delData(data)
        return this
    }
    clearStoreData(...names) {
        each(names, name => {
            const item = this._getItem(name)
            if (item instanceof WebStorageItem) item.clear()
        })
        return this
    }
    toggleItemVal(name, callback = () => {}) {
        const item = this._getItem(name)
        if (item instanceof WebStorageItem) return this
        item.toggle()
        callback(item.selected, item.original, this.getItemValMap())
        return this
    }
    getItemVal(name) {
        const item = this._getItem(name)
        if (item instanceof WebOptionItem) return item.selected
        else if (item instanceof WebStorageItem) return item.data
    }
    getItemValMap() {
        const result = {}
        each(this.items, (_, name) => result[name] = this.getItemVal(name))
        return result
    }
    async _setStorage() {
        const storage = this.getItemValMap()
        const tx = this._db.transaction(this._storeName, "readwrite")
        for await (const cursor of tx.store) {
            cursor.update({
                ...cursor.value,
                value: storage[cursor.value.name]
            })
        }
        await tx.done
    }
    async done() {
        await this._setStorage()
    }
    async _getStorage() {
        const storage = await this._db.getAll(this._storeName)
        each(storage, ({name, value}) => this.setItemVal(name, value, undefined, { getFromStorage: true }))
        await this.done()
    }
}

class WebOptionItem {
    constructor({ name, description, values = [], defaultValue, events, interceptor = () => {} /*, handler = s => s */ }) {
        this.events = new EventEmitter()
        this.name = name
        this.description = description
        this.values = new Map(values.map(value => {
            if (typeof value[0] === "object") value[0] = toString(value[0])
            else if (value[0] === undefined) value[0] = "undefined"
            if (value[0] === true && !value[1]) value[1] = "开启"
            else if (value[0] === false && !value[1]) value[1] = "关闭"
            return value
        }))
        this._defaultValue = defaultValue
        this.interceptor = interceptor
        // this.handler = handler
        if (events) each(events, (listener, eventName) => this.events.on(eventName, listener))
        if (defaultValue !== undefined && this.hasVal(defaultValue)) this.selected = defaultValue
        else if (values[0]) this.selected = values[0][0]
        this.events.emit("inited", this.selected)
        this.events.emit("changed", this.selected)
    }
    select(value) {
        if (this.selected !== value && this.hasVal(value)) {
            const interceptResult = this.interceptor(value)
            if (interceptResult) {
                this.events.emit("intercepted", interceptResult)
                return false
            }
            this.original = this.selected
            this.selected = /* this.handler(value) */ value
            this.events.emit("selected", this.selected, this.original)
            this.events.emit("changed", this.selected, this.original)
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

class WebStorageItem {
    constructor({ name, description, maxLength /*, callback = () => {}, handler = s => s */ }) {
        // this.events = new EventEmitter()
        this.name = name
        this.description = description
        this.maxLength = maxLength
    }
    data = new Set()
    setData(data) {
        this.data = data || new Set()
    }
    addData(data) {
        this.data.add(data)
        this.data = new Set(sliceByMaxLength([...this.data], this.maxLength))
    }
    delData(data) {
        this.data.delete(data)
    }
    hasData(data) {
        return this.data.has(data)
    }
    clear() {
        this.data = new Set()
    }
}
