import { includesAll } from "@/util/index.js"

export function typeFrom(...targets) {
    const types = []
    const keywords = {}
    const last = this.input.catchInput(-1)
    if (last.startsWith("@")) {
        const result = typeFromSelector(last, "selector.")
        types.push("selector", ...result.types)
        keywords.selector = result.keywords
    }
    else if (last.length) types.push("next")
    if (targets.length) return includesAll(types, targets)
    else return {
        types,
        keywords
    }
}

export function typeFromSelector(selector, prefix = "", ...targets) {
    const types = []
    types.pushWithPrefix = function(...items) {
        this.push(...items.map(e => prefix + e))
    }
    const keywords = {}
    if (selector === "" || selector === "@") types.pushWithPrefix("variable")
    else if (!selector.startsWith("@")) types.pushWithPrefix("player")
    else if (selector.startsWith("@") && !selector.includes("[")) types.pushWithPrefix("next", "variable")
    else if (selector.startsWith("@") && selector.includes("[")) {
        const item = selector.split("[")[1].split("]")[0].split(",").at(-1); keywords._item = item
        const key = item.split("=")[0]; keywords.key = key
        const value = item.split("=")[1]; keywords.value = value
        if (key !== undefined && value === undefined) types.pushWithPrefix("argument")
        else if (key && value && selector.endsWith("]")) types.pushWithPrefix("_end")
        else if (key && value && !selector.endsWith("]")) {
            types.pushWithPrefix("argument.next", "argument.value")
            if (key === "x" || key === "y" || key === "z") {
                if (value === "~" || value === "^" ) types.pushWithPrefix("argument.value.coordinate.value")
                else types.pushWithPrefix("argument.next")
            } else if (key === "scores") {
                types.pushWithPrefix("argument.value.scores.value")
                // TODO ...
            } else if (key === "hasitem") {
                types.pushWithPrefix("argument.value.hasitem.value")
                // TODO ...
            }
        } else if (key && value === "") {
            types.pushWithPrefix("argument.value")
            if (key === "x" || key === "y" || key === "z") types.pushWithPrefix("argument.value.coordinate")
            else if (key === "scores") types.pushWithPrefix("argument.value.scores")
            else if (key === "hasitem") types.pushWithPrefix("argument.value.hasitem")
        }
    }
    if (targets.length) return includesAll(types, targets)
    else return {
        types,
        keywords
    }
}
