import { getFromJson } from "./get.js"
import { ListNameGetter } from "./getter.js"

export default class {
    constructor(app) {
        this.load = this.load.bind(app)
        this.getFromJson = getFromJson.bind(app)
    }
    load(commandName) {
        const { $grammar, $note } = this.config
        const result = this.grammar.getFromJson(commandName)
        if (result.body) {
            const commandLength = this.input.catchInput().length - 1
            $grammar.innerHTML = `<span>${commandName} </span>`
            $note.innerHTML = `<span>${result.header.command.info}</span>`
            if (result.body.info.length < commandLength) {
                return {
                    finish: true
                }
            } else {
                $grammar.innerHTML += `<span>${replace(result.body.grammar)}</span>`
                $grammar.querySelectorAll("span")[commandLength].style.fontWeight = "bold"
                $note.innerHTML = handle.call(this, result.body.info[commandLength - 1].note, result.body.info[commandLength - 1])
                return {
                    list: handle.call(this, result.body.info[commandLength - 1].list, result.body.info[commandLength - 1])
                }
            }
        } else return {
            undefined: true
        }
    }
}

function replace(grammar) {
    return grammar.replace(/\</g, "<&lrm;")
        .replace(/\>/g, "&lrm;>")
        .replace(/x y z/g, "x&ensp;<span>y&ensp;</span><span>z</span>")
        .replace(/(>|]|[a-zA-Z])\s(<|\[|[a-zA-Z])/g, "$1 </span><span>$2")
}

function handle(target, thisArg) {
    const getter = new ListNameGetter(this)
    const regexp = /(enchantment.level|entity.event|block.data|item.data)/g
    if (typeof target === "function") return target.call(thisArg, getter)
    else if (Array.isArray(target)) {
        return target.map(item => regexp.test(item) ? fix(item, getter) : item)
    } else if (typeof target === "string") {
        if (regexp.test(target)) for (let item of target.match(regexp)) target = fix(item, getter, target)
        return target
    } else return target
    
    function fix(item, getter, target) {
        const fixReg = /^(?<name>.+)\.(?<subname>.+)(?<option>\{.*\})$/
        const { groups: { name, subname, option } } = item.match(fixReg)
        const result = getter.searchFrom(name, getter.catchInput(-2), i => `${name}{${i}}.${subname}${option || ""}`)
        if (target) return target.replace(item, result)
        else return result
    }
}