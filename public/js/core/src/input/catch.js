import { readLine } from "../../util/common.js"

export function catchInput(length) {
    const all = readLine(this.config.$input.value, -1).split(" ")
    if (typeof length === "number") return all.at(length)
    
    // TODO  FIXME
    else if (length === "the_latest_selector_variable") {
        const _all = this.input.catchInput(-1).split("[")[1].split(",")
        return _all[_all.length - 1]
    } else if (length === "selector_variable_value") {
        return this.input.catchInput("the_latest_selector_variable").split("=")[1]
        
    }
    
    else return all
}