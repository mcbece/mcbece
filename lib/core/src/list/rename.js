import { getReturn } from "@/util/index.js"
import { InputGetter } from "../../lib/InputGetter.class.js"
import { typeFromSelector } from "../input/type.js"
import { getDefaultListShortcut } from "../../defConfig.js"

export const _rename = core => function(listName) {
    //@return string || string[]
    const { input: { catchInput }, config: { $input } } = core
    const listShortcut = Object.assign({}, getDefaultListShortcut(), core.config.get("list.shortcut", {}))
    const inputGetter = new InputGetter(core)
    const lastInput = catchInput(-1)
    const parsedSelector = typeFromSelector(lastInput)
    if (listName === "selector") {
        const { types, keywords } = parsedSelector
        const output = []
        if (types.includes("variable")) output.push("selector.variable")
        if (types.includes("player")) output.push("player")
        if (types.includes("next")) output.push("selector.next")
        if (types.includes("argument")) output.push("selector.argument")
        if (types.includes("_end")) output.push("next")
        if (types.includes("argument.next")) output.push("selector.next_argument")
        if (types.includes("argument.value")) output.push(`selector.argument.value.${keywords.key}`)
        return output
    } else if (/^coordinate.(x|y|z)$/.test(listName)) {
        if (!lastInput || parsedSelector.types.includes("argument.value.coordinate")) return listName
        else if (lastInput === "~" || lastInput === "^" || parsedSelector.types.includes("argument.value.coordinate.value")) return `${listName}.value`
        else return "next"
    } else if (/^rotation.(x|y)$/.test(listName)) {
        if (!lastInput) return listName
        else if (lastInput === "~") return `${listName}.value`
        else return "next"
    }
    else if (listShortcut[listName]) return getReturn(listShortcut[listName], inputGetter, listName) ?? listName
    else return listName
}
