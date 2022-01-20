export function copy(model) {
    const { $input } = this.config
    if (model === "copy") {
        $input.select()
        $input.setSelectionRange(0, $input.value.length)
        document.execCommand("copy")
        mdui.snackbar({
            message: "已复制",
            position: "left-top",
            timeout: 2000,
            closeOnOutsideClick: false
        })
    } else if (model === "display") {
        if (this.editEnd === true) {
            document.querySelector("#wiki").style.display = "none"
            document.querySelector("#copy").style.display = ""
        } else {
            document.querySelector("#wiki").style.display = ""
            document.querySelector("#copy").style.display = "none"
        }
    }
}