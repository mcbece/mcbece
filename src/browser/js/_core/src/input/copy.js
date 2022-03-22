import { objectGet } from "../../util/common.js"

export function copy() {
    const { $input } = this.config
    $input.select()
    $input.setSelectionRange(0, $input.value.length)
    document.execCommand("copy")
    objectGet(this.config, "_components.snackbar", { _return: window.alert })("已复制")
}
