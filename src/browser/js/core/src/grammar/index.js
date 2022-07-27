import { deepEqual } from "fast-equals"
import { _get } from "./get.js"
import { InputGetter } from "../../lib/InputGetter.class.js"
import { getReturn } from "../../util/common.js"

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
                this.grammar._list = []
                return Object.assign({}, {
                    _finish: true
                }, getReturn(result.body.endFun, new InputGetter(this)))
            } else {
                $grammar.innerHTML += `<span>${replace(result.body.grammar)}</span>`
                $grammar.querySelectorAll("span")[commandLength].style.fontWeight = "bold"
                // $grammar.querySelectorAll("span")[commandLength].scrollIntoView({
                //     behavior: "smooth",
                //     inline: "start"
                // })
                $note.innerHTML = getReturn(result.body.info[commandLength - 1].note, new InputGetter(this))
                const list = handle(getReturn(result.body.info[commandLength - 1].list, new InputGetter(this)))
                if (!this.grammar._list || !deepEqual(this.grammar._list, list)) {
                    this.grammar._list = list
                    return {
                        _load: true,
                        list
                    }
                } else return {
                    _search: true
                }
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
        .replace(/\</g, "<&lrm;")
        .replace(/\>/g, "&lrm;>")
        .replace(/x y z/g, "x&ensp;<span>y&ensp;</span><span>z</span>")
        .replace(/(>|]|[a-zA-Z])\s(<|\[|[a-zA-Z])/g, "$1 </span><span>$2")
}

function handle(target) {
    if (Array.isArray(target)) {
        return target
    } else if (typeof target === "string") {
        return target.split(/\s*;\s*/)
    } else return target
}
