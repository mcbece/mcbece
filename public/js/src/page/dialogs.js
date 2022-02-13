import { each } from "../../core/util/common.js"

const dialogs = {}
each(document.querySelectorAll("[id$='dialog']"), dialog => {
    const id = dialog.id.replace(/-dialog$/, "")
    dialogs[id] = new mdui.Dialog(dialog, {
        history: false,
        modal: true
    })
})

export default dialogs
