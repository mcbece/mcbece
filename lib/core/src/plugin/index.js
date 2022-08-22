import { addValueChangedListener } from "@util/index.js"

export default class {
    constructor(app) {
        Promise.all(
            app.config.get("plugin.plugins", []).map(plugin => {
                const result = plugin(app)
                app.event.emit("app.plugin.load", result)
                return result
            })
        ).then(result => {
            const init = app.config.get("plugin.init", new Function()).bind(app.config.plugin)
            app.event.emit("app.plugin.init", result)
            init(result, app)
        }).then(() => {
            addValueChangedListener(app.config.$input, () => {
                app.event.emit("app.input", app.config.$input.value)
                if (app.initialized) app.change()
            }, true)
        }).catch(console.error)
    }
}
