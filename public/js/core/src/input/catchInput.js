import { readLine } from "../../util/common.js"

export function catchInput(length) {
    let all = readLine(this.config.$input.value, -1).split(" ")
    if (typeof length === "number") {
        if (length < 0) return all[all.length + length]
        else return all[length]
    }
    
    // TODO  FIXME
    else if (length === "the_latest_selector_variable") {
        all = this.input.catchInput(-1).split("[")[1].split(",")
        return all[all.length - 1]
    } else if (length === "selector_variable_value") {
        return this.input.catchInput("the_latest_selector_variable").split("=")[1]
        
    }
    
    else return all
}