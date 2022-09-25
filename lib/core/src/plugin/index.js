import { asyncEach, objectHas } from "@/util/index.js"
import { predefinePlugin } from "@/lib/plugins/index.js"

export default class {
    constructor(app) {
        this._plugins = app.config.get("plugins", {})
    }
    active = {}
    async init(app) {
        await asyncEach(this._plugins, async (group, groupName) => {
            if (typeof group === "boolean" && group) group = predefinePlugin[groupName]
            const result = {}
            await asyncEach(group.plugin ?? [], async (creater, pluginName) => {
                app.event.emit("app.plugin.load", `${groupName}:${pluginName}`)
                result[pluginName] = await creater(app)
            })
            Object.assign(this.active, result)
            app.event.emit("app.plugin.init", groupName)
            const initFn = group.init ?? new Function()
            await initFn(result)
            app.event.emit("app.plugin.init.end", groupName)
        })
    }
    has(pluginName) {
        return objectHas(this.active, pluginName)
    }
}
