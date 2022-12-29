import { each } from "@/util/index.js"
import EventEmitter from "../../lib/EventEmitter.class.js"

const ALL_EVENTS = [
    "core.construct.end",
    "core.init",
    "core.init.end",
    "core.i18n",
    "core.change",
    "core.clear",
    "core.plugin.load",
    "core.plugin.init",
    "core.plugin.init.end",
    "core.input",
    "core.input.copy",
    "core.list.load",
    "core.list.search",
    "core.grammar.load",
    "core.data.init"
]

export default core => class extends EventEmitter {
    constructor() {
        super()
        
        this.on("error", console.error)
        
        each(core.config.get("event", {}), (listeners, eventName) => {
            each(listeners, listener => this.on(eventName, listener))
        })
        
        //@dev each(ALL_EVENTS, eventName => this.on(eventName, () => console.debug(eventName)))
    }
}
