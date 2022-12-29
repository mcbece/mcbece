import { readLine } from "@/util/index.js"

export const catchInput = core => function(length) {
    const all = readLine(core.config.$input.value, -1).split(" ")
    if (typeof length === "number") return all.at(length)
    
    // TODO FIXME 还能用，先不修
    else if (length === "last_selector_argument") {
        const _all = catchInput(core)(-1).split("[")[1].split(",")
        return _all[_all.length - 1]
    } else if (length === "selector_argument_value") {
        return catchInput(core)("last_selector_argument").split("=")[1]
        
    }
    
    else return all
}
