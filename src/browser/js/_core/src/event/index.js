import EventEmitter from "events"
import { each } from "../../util/common.js"

const ALL_EVENTS = [
    "app.init",
    "app.i18n",
    "app.change",
    "app.clear",
    "app.plugin.load",
    "app.plugin.init",
    "app.input",
    "app.input.copy",
    "app.list.load",
    "app.list.search",
    "app.grammar.load"
]

export default class extends EventEmitter {
    constructor(app) {
        super()
        this.on("error", console.error)
        
        each(app.config.event, (eventName, listeners) => {
            each(listeners, listener => this.on(eventName, listener))
        })
        
        //@dev each(ALL_EVENTS, eventName => this.on(eventName, () => console.debug(eventName)))
    }
}
