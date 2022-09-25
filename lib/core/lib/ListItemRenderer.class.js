import merge from "merge-options"
import { each, objectGet, replaceString, getReturn, toString } from "@/util/index.js"
import { getDefListRendererConfig } from "../defConfig.js"
import { ListItemReplacer } from "./ListItemReplacer.class.js"

export class ListItemRenderer {
    constructor(app) {
        const config = merge(getDefListRendererConfig(app), app.config.get("list.renderer", {}))
        each(config, ({ handlerFun, callbackFun, defaultVal }, name) => this.addItem(app, name, handlerFun, callbackFun, defaultVal))
        // 这里如果 this.__app = app 来保存的话，因为之后会 deepCopy 这个的实例，会导致很卡
        this.genItem = this.genItem.bind(this, app) 
    }
    renderers = {}
    setListItem(listItem) {
        this.listItem = listItem
        return this
    }
    addItem(app, name, handlerFun, callbackFun, defaultVal) {
        this.renderers[name] = new ListItemRendererItem(app, handlerFun, callbackFun, defaultVal)
        return this
    }
    genItem(app, name) {
        return new ListItemRendererItem(app, item => objectGet(item, name))
    }
    getItem(name) {
        return this.renderers[name]
    }
    hasItem(name) {
        if (this.getItem(name)) return true
        else return false
    }
    get(name, ...args) {
        let target
        if (this.hasItem(name)) target = this.getItem(name)
        else target = this.genItem(name)
        return target.run(this.listItem, args)
    }
}

class ListItemRendererItem {
    constructor(app, handlerFun, callbackFun = s => s, defaultVal = "") {
        this.handlerFun = handlerFun
        this.callbackFun = callbackFun
        this.defaultVal = defaultVal
        this.run = this.run.bind(this, app) // 和上面同一个原因
    }
    run(app, item, args) {
        const result = this.handlerFun(item, new ListItemReplacer(item, app), ...args)
        if (result) {
            if (Array.isArray(result)) return getReturn(this.callbackFun, ...result)
            else return getReturn(this.callbackFun, result)
        } else return getReturn(this.defaultVal)
    }
}
