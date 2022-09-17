import { WebOption } from "@core/lib/WebOption.class.js"

export default async function(app) {
    const user = new WebOption("userData")
    
    app.event.on("app.input", value => {
        user.setItemVal("inputting", value).done()
    }).on("app.init.end", () => {
        app.config.$input.value = user.getItemVal("inputting")
    })
    
    app.config.add({
        userData: {
            history: {
                maxLength: 10000
            }
        }
    })
    
    app._userData = user
    
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
        maxLength: app.config.get("userData.history.maxLength")
    })
    .addItem({
        name: "love",
        callback(...args) {
            console.debug("userData: love -> add", args[1], "to", args[0])
        },
        storageModel: true
    })
}
