import { WebOption } from "@/core/lib/WebOption.class.js"

export default async function(core) {
    const user = new WebOption("userData")
    
    core.event.on("core.input", value => {
        user.setItemVal("inputting", value).done()
    }).on("core.init.end", () => {
        core.config.$input.value = user.getItemVal("inputting")
    })
    
    core._userData = user
    
    return user
    
    .addItem({
        name: "inputting",
        defaultValue: "",
        events: {
            selected: (selected, original) => {
                console.debug("userData: inputting -> from", original, "to", selected)
            }
        }
    })
    .addItem({
        name: "extensions",
        storageModel: true,
        keyIndex: "id",
        keysUnstorable: [ "content" ]
    })
}
