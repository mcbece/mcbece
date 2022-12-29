import merge from "merge-options"
import { each, objectGet, getReturn } from "@/util/index.js"
import { getDefListRendererConfig } from "../defConfig.js"
import { ListItemReplacer } from "./ListItemReplacer.class.js"

export class ListItemRenderer {
    constructor(core, listItem) {
        this.__core = core
        this.listItem = listItem
        const config = merge(getDefListRendererConfig(core), core.config.get("list.renderer", {}))
        each(config, ({ handlerFun, callbackFun, defaultVal }, name) => {
            this.renderers[name] = new ListItemRendererItem(core, handlerFun, callbackFun, defaultVal)
        })
    }
    renderers = {}
    getItem(name) {
        return this.renderers[name] ?? new ListItemRendererItem(this.__core, item => objectGet(item, name))
    }
    get(name, ...args) {
        const target = this.getItem(name)
        return target.run(this.listItem, args)
    }
}

class ListItemRendererItem {
    constructor(core, handlerFun, callbackFun = s => s, defaultVal = "") {
        this.__core = core
        this.handlerFun = handlerFun
        this.callbackFun = callbackFun
        this.defaultVal = defaultVal
    }
    run(item, args) {
        const result = this.handlerFun(item, new ListItemReplacer(this.__core, item), ...args)
        if (result) {
            if (Array.isArray(result)) return getReturn(this.callbackFun, ...result)
            else return getReturn(this.callbackFun, result)
        } else return getReturn(this.defaultVal)
    }
}
