export function copy() {
    const { $input } = this.config
    $input.select()
    $input.setSelectionRange(0, $input.value.length)
    document.execCommand("copy")
    mdui.snackbar({
        message: "已复制",
        position: this._snackbarPosition,
        timeout: 2000,
        closeOnOutsideClick: false
    })
}