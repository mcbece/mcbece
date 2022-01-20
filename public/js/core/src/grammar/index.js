import { getFromJson } from "./get.js"

export default class {
    constructor(app) {
        this.load = this.load.bind(app)
        this.getFromJson = this.getFromJson.bind(app)
    }
    load(commandName) {
        const { $input, $grammar, $note } = this.config
        $grammar.innerHTML = ""
        $note.innerHTML = ""
        let grammarGroup = this.data.getGrammar(commandName)
        $grammar.innerHTML = `<span>${commandName} </span>`
        if (grammarGroup !== undefined) {
            $note.innerHTML = `<span>${grammarGroup[0].command.info}</span>`
            let result = this.grammar.getFromJson(grammarGroup)
            // FIXME         ^^^^^^^^^
            if (result.info.length < $input.value.split(" ").length - 1) return {
                finish: true
            }
            else {
                $grammar.innerHTML += `<span>${result.grammar.replace(/\</g, "<&lrm;").replace(/\>/g, "&lrm;>").replace(/x y z/g, "x&ensp;<span>y&ensp;</span><span>z</span>").replace(/(>|]|[a-z])\s(<|\[|[a-z])/g, "$1 </span><span>$2")}</span>`
                $grammar.querySelectorAll("span")[$input.value.split(" ").length - 1].style.fontWeight = "bold"
                $note.innerHTML = result.info[$input.value.split(" ").length - 2].note
                return {
                    list: result.info[$input.value.split(" ").length - 2].list
                }
            }
        }
        else return {
            undefined: true
        }
    }
    getFromJson(grammarGroup) {
        return getFromJson.call(this, grammarGroup)
    }
}