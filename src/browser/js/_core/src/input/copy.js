import { objectGet } from "../../util/common.js"

export function copy() {
    const { $input } = this.config
    $input.select()
    $input.setSelectionRange(0, $input.value.length)
    document.execCommand("copy")
    this.event.emit("app.input.copy", $input.value)
}
