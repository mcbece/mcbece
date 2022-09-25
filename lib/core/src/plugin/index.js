import { asyncEach, objectHas } from "@/util/index.js"
import { predefinePlugin } from "@/lib/plugins/index.js"

export default class {
    constructor(app) {
        this.init = this.init.bind(app)
        this.load = this.load.bind(app)
    }
    active = {}
    async init() {
        const plugins = this.config.get("plugins", {})
        await asyncEach(plugins, async (group, groupName) => {
            if (typeof group === "boolean" && group) group = predefinePlugin[groupName]
            const result = await this.plugin.load(group, groupName)
            Object.assign(this.plugin.active, result)
            this.event.emit("app.plugin.init", groupName)
            const initFn = group.init ?? new Function()
            await initFn(result)
            this.event.emit("app.plugin.init.end", groupName)
        })
    }
    async load(group, groupName) {
        const result = {}
        await asyncEach(group.plugin ?? [], async (creater, pluginName) => {
            this.event.emit("app.plugin.load", `${groupName}:${pluginName}`)
            result[pluginName] = await creater(this)
        })
        return result
    }
    has(pluginName) {
        return objectHas(this.active, pluginName)
    }
}
