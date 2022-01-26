function each(obj, callbackfn, thisArg) {
    Object.keys(obj).forEach((key, i) => {
        const value = obj[key]
        callbackfn.call(thisArg, key, value, i, obj)
    })
}

function funStrToArrowFunStr(funStr) {
    const regexp = /^(function\s)?([a-zA-Z$_0-9]*)?\s?\((?<args>[a-zA-Z$_,0-9\s]*)?\)\s?\{(?<content>[\S\s]*)?\}$/
    const match = funStr.match(regexp)
    if (match) return `(${match.groups.args || ""}) => {${match.groups.content || ""}}`
}

function toObjectString(target) {
    if (Array.isArray(target)) return target.map(e => toObjectString(e))
    else if (typeof target === "object") {
        const newObj = {}
        each(target, (key, value) => {
            if (value instanceof Number || value instanceof String || value instanceof Boolean) newObj[key] = value.toString()
            else newObj[key] = toObjectString(value)
        })
        return newObj
    } else if (typeof target === "function") {
        return "@function " + funStrToArrowFunStr(target.toString())
    }
    else if (typeof target === "number" || typeof target === "boolean") return target
    else return target.toString()
}

module.exports = {
    each,
    toObjectString
}