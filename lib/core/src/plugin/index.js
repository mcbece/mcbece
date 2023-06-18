import merge from "merge-options"
import { eachAsync, objectHas, includesAll, includesSome, arrayIncludes, isRegexp } from "@/util/index.js"
import innerPackage from "./plugins/index.js"

export default core => class {
    constructor() {
        this.active = {}
        this._initFunList = {}
        this._waitingArea = {}
    }
    get activeIds() {
        return Object.keys(this.active)
    }
    async init() {
        const config = core.config.get("plugins", {})
        const pkgs = config.packages ?? []
        const groups = Object.assign({}, innerPackage, ...pkgs)
        
        await eachAsync(config.groups, async (group, groupId) => {
            if (typeof group === "boolean" && group) group = groups[groupId]
            await this.load(group, groupId)
        })
        await this.reloadWaitingArea()
        delete this._waitingArea
        
        await eachAsync(this._initFunList, async (fun, groupId) => {
            core.event.emit("core.plugin.init", groupId)
            await fun(this.active)
            core.event.emit("core.plugin.init.end", groupId)
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
        
        await eachAsync(group.plugin ?? [], async ({ id: pluginId, creater }, i) => {
            const index = `${groupId}:${pluginId}`
            core.event.emit("core.plugin.load", index)
            this.active[index] = await creater(core, group.extend ? this.get(group.extend[i]) : null)
        })
        this._initFunList[groupId] = group.initFun ?? new Function()
        return true
    }
    async reloadWaitingArea(forceload) {
        let timer = 0
        await eachAsync(this._waitingArea, async (group, groupId) => {
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
