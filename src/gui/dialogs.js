import { each } from "@/util/index.js"
import { OptionDialog } from "./lib/OptionDialog.class.js"

const dialogs = {}
each(document.querySelectorAll("[id$='-dialog']"), $dialog => {
    const id = $dialog.id.replace(/-dialog$/, "")
    if (id === "option") dialogs[id] = new OptionDialog($dialog)
    else dialogs[id] = new mdui.Dialog($dialog, {
        history: false,
        modal: true
    })
})

export default dialogs
