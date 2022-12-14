import merge from "merge-options"
import { asyncEach, objectHas, includesAll, includesSome, arrayIncludes, isRegexp } from "@/util/index.js"
import innerPackage from "./plugins/index.js"

export default app => class {
    constructor() {
        this.active = {}
        this._initFunList = {}
        this._waitingArea = {}
    }
    get activeIds() {
        return Object.keys(this.active)
    }
    async init() {
        const config = app.config.get("plugins", {})
        const pkgs = config.packages ?? []
        const groups = Object.assign({}, innerPackage, ...pkgs)
        
        await asyncEach(config.groups, async (group, groupId) => {
            if (typeof group === "boolean" && group) group = groups[groupId]
            await this.load(group, groupId)
        })
        await this.reloadWaitingArea()
        delete this._waitingArea
        
        await asyncEach(this._initFunList, async (fun, groupId) => {
            app.event.emit("app.plugin.init", groupId)
            await fun(this.active)
            app.event.emit("app.plugin.init.end", groupId)
        })
        delete this._initFunList
    }
    async load(group, groupId, forceload) {
        if (group.conflicts && includesSome(this.activeIds, group.conflicts)) {
            console.warn(`Plugin System: the group "${groupId}" conflicts with the plugin "${this.activeIds.find(e => group.conflicts.includes(e))}"`)
            return true
        }
        if (
            (group.dependencies && !includesAll(this.activeIds, group.dependencies)) ||
            (group.extend && !includesAll(this.activeIds, group.extend) && !forceload) ||
            (group.conflicts && !includesSome(this.activeIds, group.conflicts) && !forceload)
        ) {
            this._waitingArea[groupId] = group
            return
        }
        
        await asyncEach(group.plugin ?? [], async ({ id: pluginId, creater }, i) => {
            const index = `${groupId}:${pluginId}`
            app.event.emit("app.plugin.load", index)
            this.active[index] = await creater(app, group.extend ? this.get(group.extend[i]) : null)
        })
        this._initFunList[groupId] = group.initFun ?? new Function()
        return true
    }
    async reloadWaitingArea(forceload) {
        let timer = 0
        await asyncEach(this._waitingArea, async (group, groupId) => {
            const result = await this.load(group, groupId, forceload)
            if (result) {
                timer++
                delete this._waitingArea[groupId]
            }
        })
        if (Object.keys(this._waitingArea).length) {
            if (timer) await this.reloadWaitingArea()
            else return await this.reloadWaitingArea(true)
        }
    }
    has(pluginName) {
        return arrayIncludes(this.activeIds, pluginName)
    }
    get(pluginName) {
        if (isRegexp(pluginName)) {
            const keys = Object.keys(this.active)
            const key = keys.find(e => pluginName.test(e))
            return this.active[key]
        } else return this.active[pluginName]
    }
}
