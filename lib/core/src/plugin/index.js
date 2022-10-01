import { asyncEach, objectHas } from "@/util/index.js"
import { predefinePlugin } from "@/lib/plugins/index.js"

export default app => ({
    active: {},
    async init() {
        const plugins = app.config.get("plugins", {})
        await asyncEach(plugins, async (group, groupName) => {
            if (typeof group === "boolean" && group) group = predefinePlugin[groupName]
            const result = await this.load(group, groupName)
            Object.assign(this.active, result)
            app.event.emit("app.plugin.init", groupName)
            const initFn = group.init ?? new Function()
            await initFn(result)
            app.event.emit("app.plugin.init.end", groupName)
        })
    },
    async load(group, groupName) {
        const result = {}
        await asyncEach(group.plugin ?? [], async (creater, pluginName) => {
            app.event.emit("app.plugin.load", `${groupName}:${pluginName}`)
            result[pluginName] = await creater(app)
        })
        return result
    },
    has(pluginName) {
        return objectHas(this.active, pluginName)
    }
})
