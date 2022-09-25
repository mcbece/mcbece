import { each } from "@/util/index.js"
import EventEmitter from "../../lib/EventEmitter.class.js"

const ALL_EVENTS = [
    "app.construct.end",
    "app.init",
    "app.init.end",
    "app.i18n",
    "app.change",
    "app.clear",
    "app.plugin.load",
    "app.plugin.init",
    "app.plugin.init.end",
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
        
        each(app.config.get("event", {}), (listeners, eventName) => {
            each(listeners, listener => this.on(eventName, listener))
        })
        
        //@dev each(ALL_EVENTS, eventName => this.on(eventName, () => console.debug(eventName)))
    }
}
