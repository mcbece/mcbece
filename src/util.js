function each(target, callbackfn, thisArg) {
    if (Array.isArray(target)) target.forEach(callbackfn, thisArg)
    else if (typeof target === "object") each(Object.keys(target), (key, i) => callbackfn.call(thisArg, key, target[key], i, target))
    else if (target[Symbol.iterator]) for (let item of target) callbackfn.call(thisArg, item, target)
}

function lib(url) {
    return (process.argv.includes("--use-cdn") ? "//cdn.jsdelivr.net/npm/" : "/lib/") + url
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
    lib,
    toObjectString
}