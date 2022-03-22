export const sleepAsync = ms => new Promise(resolve => setTimeout(resolve, ms))

export function each(target, callbackfn, thisArg) {
    if (Array.isArray(target)) target.forEach(callbackfn, thisArg)
    else if (target && target[Symbol.iterator]) for (let item of target) callbackfn.call(thisArg, item, target)
    else if (typeof target === "object") each(Object.keys(target), (key, i) => callbackfn.call(thisArg, key, target[key], i, target))
}

export async function asyncEach(target, asyncfn, thisArg) {
    if (Array.isArray(target)) for (let i = 0; i < target.length; i++) await asyncfn.call(thisArg, target[i], i, target)
    else if (target && target[Symbol.iterator]) for (let item of target) await asyncfn.call(thisArg, item, target)
    else if (typeof target === "object") await asyncEach(Object.keys(target), async (key, i) => await asyncfn.call(thisArg, key, target[key], i, target))
}

export function mapObject(obj, callbackfn, thisArg) {
    const newObj = {}
    each(obj, (key, value, i, _obj) => newObj[key] = callbackfn.call(thisArg, value, i, _obj))
    return newObj
}

export function objectGet(obj, key, { _return, handler = s => s, strict = true } = {}) {
    if (objectHas(obj, key)) return obj[key]
    else try {
        const output = eval(`obj.${handler(key)}`)
        if (!strict && output === undefined) return _return
        else return output
    } catch (err) {
        // console.warn(`Could not get "${key}" in \`obj\`, returning \`_return\`.`, {obj, _return}, err)
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
    else if (target?.toString) return target.toString()
    else return getReturn(_return, target)
}

export function kvArrayToObject(kvArray) {
    const obj = {}
    each(kvArray, (kv, i) => {
        if (Array.isArray(kv)) {
            const [key, value] = kv
            obj[key] = value
        } else obj[i] = kv
    })
    return obj
}

export function replaceString(target, args) {
    return target.replace(/{([^}]+)}/g, (_, key) => objectGet(args, key))
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
    } else if (regexp instanceof RegExp) {
        return regexp.test(str)
    }
}

export function readLine(text, len) {
    const all = text.split("\n")
    if (typeof len === "number") return all.at(len)
    else return all
}

export function toJSON(str) {
    try {
        return JSON.parse(str)
    } catch (err) {
        console.warn(`Could not use \`JSON.parse()\`, returning with trying \`eval()\`.`, err)
        return eval(`(${str})`)
    }
}

export async function importDefault(url) {
    try {
        const data = await import(url)
        return data.default
    } catch (err) {
        throw err
    }
}

export function stringToNode(str, useFragment) {
    if (useFragment) return document.createRange().createContextualFragment(str)
    else {
        const div = document.createElement("div")
        div.innerHTML = str
        return div.querySelector("*")
    }
}

export function nodeToString(node) {
    const div = document.createElement("div")
    div.appendChild(node)
    return div.innerHTML
}

export function addValueChangedListener(inputEle, listener, withEventListener) {
    if (!(inputEle.__valueChangedListener instanceof Set)) {
        inputEle.__valueChangedListener = new Set()
        const valueDes = Object.getOwnPropertyDescriptor(inputEle.constructor.prototype, "value")
        Object.defineProperty(inputEle, "value", {
            set: function (value) {
                valueDes.set.apply(this, arguments)
                each(inputEle.__valueChangedListener, _listener => _listener.call(this, withEventListener ? undefined : value))
            },
            get: function () {
                return valueDes.get.apply(this, arguments)
            }
        })
    }
    inputEle.__valueChangedListener.add(listener)
    if (withEventListener) inputEle.addEventListener("input", listener)
    return inputEle
}

export function removeValueChangedListener(inputEle, listener, withEventListener) {
    if (inputEle.__valueChangedListener && inputEle.__valueChangedListener instanceof Set) {
        inputEle.__valueChangedListener.delete(listener)
        if (withEventListener) inputEle.removeEventListener("input", listener)
    }
}

export function includesAll(arr, valuesToFind, fromIndex) {
    return !valuesToFind.map(valueToFind => arr.includes(valueToFind, fromIndex)).includes(false)
}

export function includesSome(arr, valuesToFind, fromIndex) {
    return valuesToFind.map(valueToFind => arr.includes(valueToFind, fromIndex)).includes(true)
}
