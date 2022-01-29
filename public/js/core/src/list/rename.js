export function rename(listName) {
    const { input: { catchInput }, config: { $input } } = this
    const inputLength = catchInput().length
    if (listName === "selector") {
        const selector = catchInput(-1)
        if (selector.length < 2) {
            return "selector.parameter"
        } else if (selector.length === 2 && selector.startsWith("@")) {
            return "selector.next; selector.parameter"
        } else if (selector.length > 2 && selector.split("")[2] === "[") {
            const variable_item = selector.split("[")[1].split("]")[0].split(",")[selector.split("[")[1].split("]")[0].split(",").length - 1]
            const key = variable_item.split("=")[0]
            const value = variable_item.split("=")[1]
            const index = this.data.get("list", "selector.variable").getBody().findIndex(_item => _item.name === key)
            if (key !== undefined && key !== "" && value !== undefined && value !== "" && !selector.endsWith("]")) {
                
                // TODO 逻辑有问题，等再改
                //if (/^coordinate.(x|y|z)$/.test(listName)) return `selector.next_variable; coordinate.${key}[0].value`
                //else 
                
                return `selector.next_variable; selector.variable.getItem(${index}).value`
                
                //return "selector.next_variable"
                
            } else if (key !== undefined && key !== "" && value !== undefined && value !== "" && selector.endsWith("]")) {
                return "next"
            } else if (key !== undefined && key !== "" && value === "") {
                return `selector.variable.getItem(${index}).value`
            } else if ((key === "" && value === undefined) || (key !== undefined && key !== "" && value === undefined)) {
                return "selector.variable"
            }
        }
    } else if (/^coordinate.(x|y|z)$/.test(listName)) {
        const coordinate = catchInput(-1)
        if (coordinate.length < 1) return listName
        else if (coordinate === "~" || coordinate === "^") return `${listName}[0].value`
        else return "next"
    } else if (/^rotation.(x|y)$/.test(listName)) {
        const rotation = catchInput(-1)
        if (rotation.length < 1) return listName
        else if (rotation === "~") return `${listName}[0].value`
        else return "next"
    } else return listName
}