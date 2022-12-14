import { getReturn } from "@/util/index.js"
import { _get } from "./get.js"
import { InputGetter } from "../../lib/InputGetter.class.js"

export default app => class {
    constructor() {}
    load(commandName) {
        const { $grammar, $note } = app.config
        const result = _get(app).call(this, commandName)
        app.event.emit("app.grammar.load", result, commandName)
        if (result.body) {
            const commandLength = app.input.catchInput().length - 1
            $grammar.innerHTML = `<span>${commandName} </span>`
            $note.innerHTML = `<span>${result.header.command.info}</span>`
            if (result.body.info.length < commandLength) {
                return Object.assign(
                    {}, 
                    { _finish: true },
                    getReturn(result.body.endFun, new InputGetter(app))
                )
            } else {
                $grammar.innerHTML += `<span>${replace(result.body.grammar)}</span>`
                $grammar.querySelectorAll("span")[commandLength].style.fontWeight = "bold"
                /* $grammar.querySelectorAll("span")[commandLength].scrollIntoView({
                    behavior: "smooth",
                    inline: "start"
                }) */
                $note.innerHTML = getReturn(result.body.info[commandLength - 1].note, new InputGetter(app))
                const list = getReturn(
                    result.body.info[commandLength - 1].list,
                    new InputGetter(app)
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
