import { getFromJson } from "./get.js"
import { InputGetter } from "../../lib/InputGetter.class.js"

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
                $note.innerHTML = handle.call(this, result.body.info[commandLength - 1].note)
                return {
                    list: handle.call(this, result.body.info[commandLength - 1].list)
                }
            }
        } else return {
            undefined: true
        }
    }
}

function replace(grammar) {
    return grammar
        .replace(/\</g, "<&lrm;")
        .replace(/\>/g, "&lrm;>")
        .replace(/x y z/g, "x&ensp;<span>y&ensp;</span><span>z</span>")
        .replace(/(>|]|[a-zA-Z])\s(<|\[|[a-zA-Z])/g, "$1 </span><span>$2")
}

function handle(target) {
    if (typeof target === "function") return target(new InputGetter(this))
    else if (Array.isArray(target)) {
        return target.map(item => handle(item))
    } else return target
}