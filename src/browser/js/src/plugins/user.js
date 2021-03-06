import { WebOption } from "../../lib/WebOption.class.js"

export default async function(app) {
    const user = new WebOption("userData")
    
    app.event.on("app.input", value => {
        user.setItemVal("inputting", value).done()
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
            console.debug("userData: history -> add", args[1], "to", args[0])
        },
        storageModel: true,
        maxLength: 10000
    })
    .addItem({
        name: "love",
        callback(...args) {
            console.debug("userData: love -> add", args[1], "to", args[0])
        },
        storageModel: true
    })
}
