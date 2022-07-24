import { objectGet } from "../../util/common.js"

export function copy() {
    const value = this.config.$input.value
    navigator.clipboard.writeText(value).then(() => {
        this.event.emit("app.input.copy", value)
    }).catch(console.error)
}
