import { each } from "../../core/util/common.js"

const dialogs = {}
each(document.querySelectorAll("[id$='dialog']"), (_, dialog) => {
    const id = dialog.id.replace(/-dialog$/, "")
    dialogs[id] = new mdui.Dialog(dialog, {
        overlay: !app.lite,
        history: false,
        modal: true
    })
})

export default dialogs