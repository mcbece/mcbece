import { objectMap, promiseAllObject } from "@util/index.js"

export class PluginGroup {
    constructor(name, plugins) {
        this._name = name
        this._plugins = plugins
    }
    setInitFn(fn, thisArg) {
        this.initFn = fn.bind(thisArg)
        return this
    }
    async init(app) {
        const result = await promiseAllObject(
            objectMap(this._plugins, (pluginCreater, pluginName) => {
                const result = pluginCreater(app)
                app.event.emit("app.plugin.load", pluginName, result)
                return {
                    value: result
                }
            })
        )
        app.event.emit("app.plugin.init", this._name, result)
        this.initFn(result)
        app.event.emit("app.plugin.init.end", this._name)
    }
}
