import { getReturn } from "@/util/index.js"
import { _get } from "./get.js"
import { InputGetter } from "../../lib/InputGetter.class.js"

export default class {
    constructor(app) {
        this.load = this.load.bind(app)
    }
    load(commandName) {
        const { $grammar, $note } = this.config
        const result = _get.call(this, commandName)
        this.event.emit("app.grammar.load", result, commandName)
        if (result.body) {
            const commandLength = this.input.catchInput().length - 1
            $grammar.innerHTML = `<span>${commandName} </span>`
            $note.innerHTML = `<span>${result.header.command.info}</span>`
            if (result.body.info.length < commandLength) {
                return Object.assign(
                    {}, 
                    { _finish: true },
                    getReturn(result.body.endFun, new InputGetter(this))
                )
            } else {
                $grammar.innerHTML += `<span>${replace(result.body.grammar)}</span>`
                $grammar.querySelectorAll("span")[commandLength].style.fontWeight = "bold"
                /* $grammar.querySelectorAll("span")[commandLength].scrollIntoView({
                    behavior: "smooth",
                    inline: "start"
                }) */
                $note.innerHTML = getReturn(result.body.info[commandLength - 1].note, new InputGetter(this))
                const list = getReturn(
                    result.body.info[commandLength - 1].list,
                    new InputGetter(this)
                )
                return { list }
            }
        } else {
            return {
                _undefined: true
            }
        }
    }
}

function replace(grammar) {
    return grammar
        .replaceAll(/\</g, "<&lrm;")
        .replaceAll(/\>/g, "&lrm;>")
        .replaceAll(/x y z/g, "x&ensp;<span>y&ensp;</span><span>z</span>")
        .replaceAll(/(>|]|[a-zA-Z])\s(<|\[|[a-zA-Z])/g, "$1 </span><span>$2")
}
