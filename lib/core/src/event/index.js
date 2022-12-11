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
    "app.grammar.load",
    "app.data.init"
]

export default app => {
    const emitter = new EventEmitter()
    
    emitter.on("error", console.error)
    
    each(app.config.get("event", {}), (listeners, eventName) => {
        each(listeners, listener => emitter.on(eventName, listener))
    })
    
    //@dev each(ALL_EVENTS, eventName => emitter.on(eventName, () => console.debug(eventName)))
    
    return emitter
}
