import { readLine } from "../../util/common.js"

export function catchInput(length) {
    const all = readLine(this.config.$input.value, -1).split(" ")
    if (typeof length === "number") return all.at(length)
    
    // TODO  FIXME
    else if (length === "the_last_selector_argument") {
        const _all = this.input.catchInput(-1).split("[")[1].split(",")
        return _all[_all.length - 1]
    } else if (length === "selector_argument_value") {
        return this.input.catchInput("the_last_selector_argument").split("=")[1]
        
    }
    
    else return all
}
