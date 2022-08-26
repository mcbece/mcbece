export const sleepAsync = ms => new Promise(resolve => setTimeout(resolve, ms))

export function each(target, callbackfn, thisArg) {
    if (Array.isArray(target)) target.forEach(callbackfn, thisArg)
    else if (target && target[Symbol.iterator]) for (let item of target) callbackfn.call(thisArg, item, target)
    else if (typeof target === "object") each(Object.keys(target), (key, i) => callbackfn.call(thisArg, target[key], key, i, target))
}

export async function asyncEach(target, asyncfn, thisArg) {
    if (Array.isArray(target)) for (let i = 0; i < target.length; i++) await asyncfn.call(thisArg, target[i], i, target)
    else if (target && target[Symbol.iterator]) for (let item of target) await asyncfn.call(thisArg, item, target)
    else if (typeof target === "object") await asyncEach(Object.keys(target), async (key, i) => await asyncfn.call(thisArg, target[key], key, i, target))
}

/*export function objectMap(obj, callbackfn, thisArg) {
    const newObj = {}
    each(obj, (value, key, i, _obj) => {
        const result = callbackfn.call(thisArg, value, key, i, _obj)
        newObj[result.key ?? key] = result.value ?? value
    })
    return newObj
}*/

export function objectGet(obj, key, { _return, handler = s => s, strict = false } = {}) {
    const warn = err => {
        console.warn(`Could not get "${key}" in \`obj\`, returning \`_return\`.`, {obj, _return, err})
    }
    if (obj[key]) return obj[key]
    else try {
        const output = eval(`obj.${handler(key)}`)
        if (!strict && output === undefined) {
            // warn()
            return _return
        }
        else return output
    } catch (err) {
        warn(err)
        return _return
    }
}

export function objectHas(obj, key) {
    return objectGet(obj, key, { strict: true }) ? true : false
}

export function getReturn(target, ...args) {
    if (typeof target === "function") return target(...args)
    else return target
}

export function toString(target, _return) { // TODO
    if (typeof target === "object") return JSON.stringify(target)
    else if (target?.toString) return target.toString()
    else return getReturn(_return, target)
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

export function deserialize(str) {
    try {
        return JSON.parse(str)
    } catch (err) {
        console.warn(`Could not use \`JSON.parse()\` to deserialise the string, trying \`eval()\`.`, { string: str })
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

export function addValueSetListener(inputEle, listener, { withEventListener = true, debounce = true, delay = 200 } = {}) {
    if (!(inputEle.__valueSetListener instanceof Set)) {
        inputEle.__valueSetListener = new Set()
        const valueDes = Object.getOwnPropertyDescriptor(inputEle.constructor.prototype, "value")
        Object.defineProperty(inputEle, "value", {
            set(value) {
                valueDes.set.apply(this, arguments)
                // 当修改 $input.value 时触发
                each(inputEle.__valueSetListener, _listener => _listener.call(this, withEventListener ? undefined : value))
            },
            get() {
                return valueDes.get.apply(this, arguments)
            }
        })
    }
    inputEle.__valueSetListener.add(listener)
    if (debounce) listener._debounced = setDebounce(listener)
    if (withEventListener) inputEle.addEventListener("input", debounce ? listener._debounced : listener) // 当直接向 $input 输入时触发
    return [
        inputEle,
        listener,
        {
            withEventListener,
            debounce
        }
    ]
}

export function removeValueSetListener(inputEle, listener, { withEventListener = true, debounce = true } = {}) {
    if (inputEle.__valueSetListener && inputEle.__valueSetListener instanceof Set) {
        inputEle.__valueSetListener.delete(listener)
        if (withEventListener) inputEle.removeEventListener("input", debounce ? listener._debounced : listener)
    }
}

function setDebounce(fn, delay = 200) {
    let timer = null
    return function(...args) {
        if (timer) {
            clearTimeout(timer)
            timer = null
        } else {
            fn(...args)
        }
        timer = setTimeout(() => {
            fn(...args)
        }, delay)
    }
}

export function includesAll(arr, valuesToFind, fromIndex) {
    return !valuesToFind
        .map(valueToFind => arr.includes(valueToFind, fromIndex))
        .includes(false)
}

export function includesSome(arr, valuesToFind, fromIndex) {
    return valuesToFind
        .map(valueToFind => arr.includes(valueToFind, fromIndex))
        .includes(true)
}

export function sliceByMaxLength(arr, maxLength) {
    return arr.reverse()
        .slice(0, maxLength)
        .reverse()
}
