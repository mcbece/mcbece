import { WebOption } from "../../lib/WebOption.class.js"

export default async function(app) {
    const user = new WebOption("userData", 2)
    
    app.event.on("app.input", () => {
        user.setItemVal("inputting", app.config.$input.value)
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
