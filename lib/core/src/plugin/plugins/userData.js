import { WebOption } from "@/core/lib/WebOption.class.js"

export default async function(app) {
    const user = new WebOption("userData")
    
    app.event.on("app.input", value => {
        user.setItemVal("inputting", value).done()
    }).on("app.init.end", () => {
        app.config.$input.value = user.getItemVal("inputting")
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
}