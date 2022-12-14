import { includesAll } from "@/util/index.js"

export const typeFrom = app => function(...targets) {
    const types = []
    const keywords = {}
    const last = this.catchInput(-1)
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
    const pushWithPrefix = (...items) => types.push(...items.map(e => prefix + e))
    const keywords = {}
    if (selector === "" || selector === "@") pushWithPrefix("variable")
    else if (!selector.startsWith("@")) pushWithPrefix("player")
    else if (selector.startsWith("@") && !selector.includes("[")) pushWithPrefix("next", "variable")
    else if (selector.startsWith("@") && selector.includes("[")) {
        const item = selector.split("[")[1].split("]")[0].split(",").at(-1); keywords._item = item
        const key = item.split("=")[0]; keywords.key = key
        const value = item.split("=")[1]; keywords.value = value
        if (key !== undefined && value === undefined) pushWithPrefix("argument")
        else if (key && value && selector.endsWith("]")) pushWithPrefix("_end")
        else if (key && value && !selector.endsWith("]")) {
            pushWithPrefix("argument.next", "argument.value")
            if (key === "x" || key === "y" || key === "z") {
                if (value === "~" || value === "^" ) pushWithPrefix("argument.value.coordinate.value")
                else pushWithPrefix("argument.next")
            } else if (key === "scores") {
                pushWithPrefix("argument.value.scores.value")
                // TODO ...
            } else if (key === "hasitem") {
                pushWithPrefix("argument.value.hasitem.value")
                // TODO ...
            }
        } else if (key && value === "") {
            pushWithPrefix("argument.value")
            if (key === "x" || key === "y" || key === "z") pushWithPrefix("argument.value.coordinate")
            else if (key === "scores") pushWithPrefix("argument.value.scores")
            else if (key === "hasitem") pushWithPrefix("argument.value.hasitem")
        }
    }
    if (targets.length) return includesAll(types, targets)
    else return {
        types,
        keywords
    }
}
