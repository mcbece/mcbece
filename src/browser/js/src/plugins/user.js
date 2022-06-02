import { WebOption } from "../../lib/WebOption.class.js"
import { DataCache } from "../../core/lib/DataCache.class.js"

export default async function(app) {
    const user = new WebOption("userData")
    
    app.event.on("app.input", () => {
        user.setItemVal("inputting", app.config.$input.value)
    }).on("app.list.search", () => {
        user.setItemVal("searchCache", app.list.searchCache.data)
    }).on("app.input.copy", value => {
        user.setItemVal("history", value)
    }).on("app.input.love", value => {
        user.setItemVal("love", value)
    })
    
    return user
    
    .addItem({
        name: "inputting",
        defaultValue: "",
        callback(...args) {
            console.debug("userData: inputting -> from", args[1], "to", args[0])
        }
    })
    .addItem({
        name: "searchCache",
        defaultValue: new Map(),
        callback(...args) {
            console.debug("userData: searchCache -> from", args[1], "to", args[0])
        }
    })
    .addItem({
        name: "history",
        callback(...args) {
            console.debug("userData: history -> from", args[1], "to", args[0])
        },
        storageModel: true
    })
    .addItem({
        name: "love",
        callback(...args) {
            console.debug("userData: love -> from", args[1], "to", args[0])
        },
        storageModel: true
    })
}
