import { openDB } from "idb/with-async-ittr"
import { each, asyncEach, toString } from "../_core/util/common.js"

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
                    each(wo.items, name => store.put({
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
            await wo._setStorage()
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
                each(this.items, name => store.put({
                    name,
                    value: this.getItemVal(name)
                }))
            }
        })
        await this._getStorage()
        await this._setStorage()
        const result = this.getItemValMap()
        each(callbacks, callback => callback(result))
        return result
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
    async setItemVal(name, value, callback = () => {}, replaceModel = false) {
        const item = this._getItem(name)
        const result = item?.select(value, replaceModel)
        if (result) callback(item.selected, item.original, this.getItemValMap())
        await this._setStorage()
        return this
    }
    async toggleItemVal(name, callback = () => {}) {
        const item = this._getItem(name)
        item?.toggle()
        callback(item.selected, item.original, this.getItemValMap())
        await this._setStorage()
        return this
    }
    getItemVal(name) {
        return this._getItem(name)?.selected
    }
    getItemValMap() {
        const result = {}
        each(this.items, name => result[name] = this.getItemVal(name))
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
    async _getStorage() {
        const storage = await this._db.getAll(this._storeName)
        
        console.log({storage})
        
        await asyncEach(storage, async ({name, value}) => await this.setItemVal(name, value, undefined, true))
    }
}

class WebOptionItem {
    constructor({ name, description, values = [], callback = () => {}, /* handler = s => s, */ defaultValue, storageModel = false }) {
        this.name = name
        this.description = description
        this._storageModel = storageModel
        this.values = new Map(values.map(value => {
            if (typeof value[0] === "object") value[0] = toString(value[0])
            else if (value[0] === undefined) value[0] = "undefined"
            if (value[0] === true && !value[1]) value[1] = "开启"
            else if (value[0] === false && !value[1]) value[1] = "关闭"
            return value
        }))
        this.callback = callback
        // this.handler = handler
        if (defaultValue !== undefined && this.hasVal(defaultValue)) this.selected = defaultValue
        else if (values[0]) this.selected = values[0][0]
        if (storageModel) this.selected = []
        this.callback(this.selected)
    }
    select(value, replaceModel) {
        if (this.selected !== value && this.hasVal(value)) {
            this.original = this.selected
            if (this._storageModel && !replaceModel) this.selected.push(value)
            else this.selected = /* this.handler(value) */ value
            this.callback(this.selected, this.original)
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
