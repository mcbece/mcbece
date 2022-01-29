import deepCopy from "/lib/fast-copy/dist/fast-copy.esm.js"
export { deepCopy }

export function each(target, callbackfn, thisArg) {
    if (Array.isArray(target)) target.forEach(callbackfn, thisArg)
    else if (typeof target === "object") each(Object.keys(target), (key, i) => callbackfn.call(thisArg, key, target[key], i, target))
    else if (target[Symbol.iterator]) for (let item of target) callbackfn.call(thisArg, item, target)
}

export function objectGet(obj, key, _return, handler = s => s) {
    if (objectHas(obj, key)) return obj[key]
    else try {
        return eval(`obj.${handler(key)}`)
    } catch (err) {
        console.warn(err, "Returning `_return`.")
        return _return
    }
}

export function objectHas(obj, key) {
    if (key in obj && obj.hasOwnProperty(key)) return true
    else return false
}

export function getReturn(target, ...args) {
    if (typeof target === "function") return target(...args)
    else return target
}

export function toString(target, _return) {
    if (typeof target === "object") return JSON.stringify(target)
    else if (target) return target.toString()
    else return _return
}

export function arrayToSet(arr) {
    return new Set(arr)
}

export function kvArrayToObject(kvArray) {
    const obj = {}
    kvArray.forEach((kv, i) => {
        if (Array.isArray(kv)) {
            const [key, value] = kv
            obj[key] = value
        } else obj[i] = kv
    })
    return obj
}

export function replaceString(target, args) {
    return target.replace(/{([^}]+)}/g, (_, key) => args[key])
}

export function isRegExp(target) {
    return target instanceof RegExp
}

export function toRegExp(str) {
    const regexp = /^(!?)\/(?<pattern>.*)\/(?<flags>[gimsuy]*)$/
    const {groups: { pattern, flags }} = str.match(regexp)
    return new RegExp(pattern, flags)
}

export function testRegExp(regexp, str) {
    if (typeof regexp === "string") {
        if (regexp.startsWith("!")) return !(toRegExp(regexp).test(str))
        else return toRegExp(regexp).test(str)
    } else if (isRegExp(regexp)) {
        return regexp.test(str)
    }
}

export function readLine(text, len) {
    const all = text.split("\n")
    if (typeof len === "number") {
        if (len < 0) return all[all.length + len]
        else return all[len]
    } else return all
}

export function toJSON(str) {
    try {
        return JSON.parse(str)
    } catch (err) {
        console.warn(err, "Returning trying `eval()`.")
        return eval(`(${str})`)
    }
}

export function toStringRegExp(str) {
    if (/^\/.*\/[gimsuy]*$/.test(str)) return toRegExp(str)
    else return new RegExp(`(${str})`
        .replace("?", "\\?")
        .replace("[", "\\[")
        .replace("]", "\\]")
    )
}

export async function importDefault(url) {
    try {
        const data = await import(url)
        return data.default
    } catch (err) {
        console.error(err)
    }
}