export function typeFrom(target) {
    /** TODO
     * 判断正在输入的类型
     * output = {
     *     type,
     *     keyword
     * }
     */
    let output,
        type = [
            "selector_variable_value",
            "selector_variable_value_coordinate",
            "selector_variable_value_coordinate_value",
            "selector_variable_value_scores",
            "selector_variable_value_scores_value",
        ],
        latest = this.input.catchInput(-1)
    if (latest.startsWith("@")) {
        let selector = latest
        if (selector.length < 2) output = "selector_parameter"
        else if (selector.length === 2) output = "selector_next"
        else if (selector.length > 2 && selector.split("")[2] === "[") {
            let variable_item = selector.split("[")[1].split("]")[0].split(",")[selector.split("[")[1].split("]")[0].split(",").length - 1]
            let key = variable_item.split("=")[0]
            let value = variable_item.split("=")[1]
            if (key !== undefined && key !== "" && value !== undefined && value !== "" && !selector.endsWith("]")) output = ["selector_variable_next", "selector_variable_value"]
            else if (key !== undefined && key !== "" && value !== undefined && value !== "" && selector.endsWith("]")) output = "next"
            else if (key !== undefined && key !== "" && value === "") {
                
                
                if (key === "coordinate") {
                    // TODO
                } else if (key === "scores") {
                    // TODO
                }
                
                output = "selector_variable_value"
                
            }
            else if ((key === "" && value === undefined) || (key !== undefined && key !== "" && value === undefined)) output = "selector_variable"
        }
    }
    else if (latest.length >= 1) output = "next"
    else output = "command_parameter"

    if (target) return output === target || output?.includes(target)
    // TODO 暂时加个 ? ，等再改                  ^^^
    else return output
}