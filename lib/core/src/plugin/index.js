import merge from "merge-options"
import { asyncEach, objectHas, includesAll, includesSome, objectMap } from "@/util/index.js"
import innerPackage from "./plugins/index.js"

export default app => ({
    active: {},
    _initFunList: {},
    _waitingArea: {},
    async init() {
        const config = app.config.get("plugins", {})
        const pkgs = config.packages ?? []
        const groups = Object.assign({}, innerPackage, ...pkgs)
        
        await asyncEach(config.groups, async (group, groupName) => {
            if (typeof group === "boolean" && group) group = groups[groupName]
            await this.load(group, groupName)
        })
        await this.reloadWaitingArea()
        delete this._waitingArea
        
        await asyncEach(this._initFunList, async (fun, groupName) => {
            app.event.emit("app.plugin.init", groupName)
            await fun(this.active)
            app.event.emit("app.plugin.init.end", groupName)
        })
        delete this._initFunList
        
        this.active = objectMap(this.active, (value, key) => ({
            key: key.replace(/(.+:)/, "")
        }))
    },
    async load(group, groupName, forceload) {
        const activeIds = Object.keys(this.active)
        if (group.conflicts && includesSome(activeIds, group.conflicts)) {
            console.warn(`Plugin System: the group "${groupName}" conflicts with the plugin "${activeIds.find(e => group.conflicts.includes(e))}"`)
            return true
        }
        if (
            (group.dependencies && !includesAll(activeIds, group.dependencies)) ||
            (group.extend && !includesAll(activeIds, group.extend) && !forceload) ||
            (group.conflicts && !includesSome(activeIds, group.conflicts) && !forceload)
        ) {
            this._waitingArea[groupName] = group
            return
        }
        
        const result = {}
        await asyncEach(group.plugin ?? [], async ({ id: pluginId, creater }) => {
            const index = `${groupName}:${pluginId}`
            app.event.emit("app.plugin.load", index)
            result[index] = await creater(app, this.active)
        })
        Object.assign(this.active, result)
        this._initFunList[groupName] = group.initFun ?? new Function()
        return true
    },
    async reloadWaitingArea(forceload) {
        let timer = 0
        await asyncEach(this._waitingArea, async (group, groupName) => {
            const result = await this.load(group, groupName, forceload)
            if (result) {
                timer++
                delete this._waitingArea[groupName]
            }
        })
        if (Object.keys(this._waitingArea).length) {
            if (timer) await this.reloadWaitingArea()
            else return await this.reloadWaitingArea(true)
        }
    },
    has(pluginName) {
        return objectHas(this.active, pluginName)
    },
    extend(pluginName) {
        
    }
})
