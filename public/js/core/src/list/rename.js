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
            const index = this.data.getList("selector.variable", [{}]).findIndex(_item => _item.name === key)
            if (key !== undefined && key !== "" && value !== undefined && value !== "" && !selector.endsWith("]")) {
                
                // TODO 逻辑有问题，等再改
                //if (/^coordinate.(x|y|z)$/.test(listName)) return `selector.next_variable; coordinate.${key}[0].value`
                //else 
                
                return `selector.next_variable; selector.variable[${index}].value`
                
                //return "selector.next_variable"
                
            } else if (key !== undefined && key !== "" && value !== undefined && value !== "" && selector.endsWith("]")) {
                return "next"
            } else if (key !== undefined && key !== "" && value === "") {
                return `selector.variable[${index}].value`
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
    } else if (listName === "enchantment.level") {
        const enchantment = catchInput(inputLength - 2)
        const index = this.data.getList("enchantment", [{}]).findIndex(_item => _item.name === enchantment)
        if (index !== -1) return `enchantment[${index}].level`
        else return "enchantment[0].level"
    } else if (listName === "entity.event") {
        const entity = catchInput(inputLength - 2)
        const index = this.data.getList("entity", [{}]).findIndex(_item => _item.name === entity)
        if (index !== -1) return `entity[${index}].event`
        else return "entity[0].event"
    } else if (listName === "block.data") {
        const block = catchInput(inputLength - 2)
        const index = this.data.getList("block", [{}]).findIndex(_item => _item.name === block)
        if (index !== -1) return `block[${index}].data`
        else return "block[0].data"
    } else if (listName === "item.data") {
        const item = catchInput(inputLength - 2)
        const index = this.data.getList("item", [{}]).findIndex(_item => _item.name === item)
        if (index !== -1) return `item[${index}].data`
        else return "item[0].data"
    } else return listName
}