export function forEachObject(obj, callbackfn, thisArg) {
    Object.keys(obj).forEach((key, i) => {
        const value = obj[key]
        callbackfn.call(thisArg, key, value, i, obj)
    })
}

export function copyObject(obj) {
    if (obj) return JSON.parse(JSON.stringify(obj))
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
    return Object.prototype.toString.call(target) === "[object RegExp]"
}

export function toRegExp(str) {
    const regexp = /^(!?)\/(?<pattern>.*)\/(?<flags>.*)$/
    const {groups: { pattern, flags }} = str.match(regexp)
    return new RegExp(pattern, flags)
}

export function testRegExp(regexp, str) {
    if (typeof regexp === "string") {
        if (regexp.startsWith("!/")) return !(toRegExp(regexp).test(str))
        else return toRegExp(regexp).test(str)
    } else if (isRegExp(regexp)) {
        return regexp.test(str)
    }
}

export async function getJsonDataAsync(url) {
    try {
        const data = await fetch(url)
        return await data.json()
    } catch (err) {
        console.error(err)
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
    } catch {
        return eval(`(${str})`)
    }
}

export function toStringRegExp(str) {
    if (/^\/.*\/.*$/.test(str)) return toRegExp(str)
    else return new RegExp(`(${str})`
        .replace("?", "\\?")
        .replace("[", "\\[")
        .replace("]", "\\]")
    )
}