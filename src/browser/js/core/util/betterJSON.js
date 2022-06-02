/*
 * betterJSON
 * 
 * 通过 `@@function` 注释，标记一个值是一个函数
 */
import { mapObject } from "./common.js"

export function stringify(obj) {
    return JSON.stringify(handle(obj))
    
    function handle(target) {
        if (Array.isArray(target)) return target.map(e => handle(e))
        else if (typeof target === "object") {
            if (target instanceof Number || target instanceof String || target instanceof Boolean) return target.toString()
            else return mapObject(target, (k, e) => ([ k, handle(e) ]))
        }
        else if (typeof target === "number" || typeof target === "boolean") return target
        else if (typeof target === "function") return "@@function " + funStrToArrowFunStr(target.toString())
        else return target.toString()
        
        function funStrToArrowFunStr(funStr) {
            const regexp = /^(function\s)?([a-zA-Z$_0-9]*)?\s?\((?<args>[a-zA-Z$_,0-9\s]*)?\)\s?\{(?<content>[\S\s]*)?\}$/
            const match = funStr.match(regexp)
            if (match) return `(${match.groups.args || ""}) => {${match.groups.content || ""}}`
        }
    }
}

export function parse(str) {
    if (typeof str === "string") str = JSON.parse(str)
    return handle(str)
    
    function handle(target) {
        if (Array.isArray(target)) return target.map(e => handle(e))
        else if (typeof target === "object") return mapObject(target, (k, e) => ([ k, handle(e) ]))
        else if (typeof target === "string" && target.startsWith("@@function ")) return eval(target.replace(/^@@function /, ""))
        else return target
    }
}

export default {
    stringify,
    parse
}
