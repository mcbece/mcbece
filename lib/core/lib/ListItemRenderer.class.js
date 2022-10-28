import merge from "merge-options"
import { each, objectGet, getReturn } from "@/util/index.js"
import { getDefListRendererConfig } from "../defConfig.js"
import { ListItemReplacer } from "./ListItemReplacer.class.js"

export class ListItemRenderer {
    constructor(app, listItem) {
        this.__app = app
        this.listItem = listItem
        const config = merge(getDefListRendererConfig(app), app.config.get("list.renderer", {}))
        each(config, ({ handlerFun, callbackFun, defaultVal }, name) => {
            this.renderers[name] = new ListItemRendererItem(app, handlerFun, callbackFun, defaultVal)
        })
    }
    renderers = {}
    getItem(name) {
        return this.renderers[name] ?? new ListItemRendererItem(this.__app, item => objectGet(item, name))
    }
    get(name, ...args) {
        const target = this.getItem(name)
        return target.run(this.listItem, args)
    }
}

class ListItemRendererItem {
    constructor(app, handlerFun, callbackFun = s => s, defaultVal = "") {
        this.__app = app
        this.handlerFun = handlerFun
        this.callbackFun = callbackFun
        this.defaultVal = defaultVal
    }
    run(item, args) {
        const result = this.handlerFun(item, new ListItemReplacer(this.__app, item), ...args)
        if (result) {
            if (Array.isArray(result)) return getReturn(this.callbackFun, ...result)
            else return getReturn(this.callbackFun, result)
        } else return getReturn(this.defaultVal)
    }
}
