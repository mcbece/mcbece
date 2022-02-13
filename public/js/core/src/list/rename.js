import { objectHas, objectGet, getReturn } from "../../util/common.js"
import { InputGetter } from "../../lib/InputGetter.class.js"
import { typeFromSelector } from "../input/type.js"

export function rename(listName) {
    const { input: { catchInput }, config: { $input } } = this
    const listShortcut = Object.assign({}, getDefaultListShortcut(), objectGet(this.config, "list.shortcut", {}))
    const inputGetter = new InputGetter(this)
    const lastInput = catchInput(-1)
    const parsedSrlector = typeFromSelector(lastInput)
    if (listName === "selector") {
        const { types, keywords } = parsedSrlector
        const output = []
        if (types.includes("variable")) output.push("selector.variable")
        if (types.includes("next")) output.push("selector.next")
        if (types.includes("argument")) output.push("selector.argument")
        if (types.includes("_end")) output.push("next")
        if (types.includes("argument.next")) output.push("selector.next_argument")
        if (types.includes("argument.value")) output.push(inputGetter.searchFrom("selector.argument", keywords.key, i => `selector.argument{${i}}.value`))
        return output
    } else if (/^coordinate.(x|y|z)$/.test(listName)) {
        if (!lastInput || parsedSrlector.types.includes("argument.value.coordinate")) return listName
        else if (lastInput === "~" || lastInput === "^" || parsedSrlector.types.includes("argument.value.coordinate.value")) return `${listName}.header.value`
        else return "next"
    } else if (/^rotation.(x|y)$/.test(listName)) {
        if (!lastInput) return listName
        else if (lastInput === "~") return `${listName}.header.value`
        else return "next"
    }
    else if (objectHas(listShortcut, listName)) return getReturn(listShortcut[listName], inputGetter, listName) ?? listName
    else return listName
}

function getDefaultListShortcut() {
    return {
        "enchantment.level": handler,
        "entity.event": handler,
        "block.data": handler,
        "item.data": handler,
        "entity.family": "entity_family",
        "entity.summonable": "entity.header.summonable"
    }
    
    function handler(getter, item) {
        const fixReg = /^(?<name>.+)\.(?<subname>.+)$/
        const { groups: { name, subname, option } } = item.match(fixReg)
        return getter.searchFrom(name, getter.catchInput(-2), i => `${name}{${i}}.${subname}`)
    }
}
