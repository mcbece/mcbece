export function typeFrom(target) {
    const output = []
    const latest = this.input.catchInput(-1)
    if (latest.startsWith("@")) {
        output.push("selector")
        const selector = latest
        if (selector.length < 2) output.push("selector_parameter")
        else if (selector.length === 2) output.push("selector_next")
        else if (selector.length > 2 && selector.split("")[2] === "[") {
            let variable_item = selector.split("[")[1].split("]")[0].split(",")[selector.split("[")[1].split("]")[0].split(",").length - 1]
            let key = variable_item.split("=")[0]
            let value = variable_item.split("=")[1]
            if (key !== undefined && key !== "" && value !== undefined && value !== "" && !selector.endsWith("]")) output.push("selector_variable_next", "selector_variable_value")
            else if (key !== undefined && key !== "" && value !== undefined && value !== "" && selector.endsWith("]")) output.push("next")
            else if (key !== undefined && key !== "" && value === "") {
                
                
                if (key === "x" || key === "y" || key === "z") {
                    // TODO
                } else if (key === "scores") {
                    // TODO
                }
                
                output.push("selector_variable_value")
                
            }
            else if ((key === "" && value === undefined) || (key !== undefined && key !== "" && value === undefined)) output.push("selector_variable")
        }
    } else if (latest.length) output.push("next")
    
    if (target) return output === target || output?.includes(target)
    else return output
}


/*
"selector_variable_value_coordinate"
"selector_variable_value_coordinate_value"
"selector_variable_value_scores"
"selector_variable_value_scores_value"
*/