import { each } from "./index.js"

export function hasLoved(cont) {
    return core._userData._getItem("love").hasData(cont)
}

export function setLiteMode(bool) {
    if (bool) document.body.classList.add("lite-mode")
    else document.body.classList.remove("lite-mode")
    window._LITE_MODE= bool
    setBodyPaddingTop()
    core.list.reload()
    each(app.gui.dialogs, (dialog, id) => {
        dialog.handleUpdate()
        if (id === "option") dialog.load()
    })
}

export function setBodyPaddingTop() {
    document.body.style.paddingTop = app.gui.collapses.header.$element[0].querySelector(".mdui-collapse-item-open")
        ? window._LITE_MODE ? "90px" : "180px"
        : window._LITE_MODE ? "45px" : "120px"
}
