import { getFromJson } from "./get.js"

export default class {
    constructor(app) {
        this.load = this.load.bind(app)
        this.getFromJson = getFromJson.bind(app)
    }
    load(commandName) {
        const { $input, $grammar, $note } = this.config
        $grammar.innerHTML = `<span>${commandName} </span>`
        $note.innerHTML = ""
        let grammarGroup = this.data.getGrammar(commandName)
        if (grammarGroup) {
            $note.innerHTML = `<span>${grammarGroup[0].command.info}</span>`
            let result = this.grammar.getFromJson(grammarGroup)
            let inputLength = this.input.catchInput().length
            if (result.info.length < inputLength - 1) {
                return {
                    finish: true
                }
            } else {
                $grammar.innerHTML += `<span>${result.grammar.replace(/\</g, "<&lrm;").replace(/\>/g, "&lrm;>").replace(/x y z/g, "x&ensp;<span>y&ensp;</span><span>z</span>").replace(/(>|]|[a-z])\s(<|\[|[a-z])/g, "$1 </span><span>$2")}</span>`
                $grammar.querySelectorAll("span")[inputLength - 1].style.fontWeight = "bold"
                $note.innerHTML = result.info[inputLength - 2].note
                return {
                    list: result.info[inputLength - 2].list
                }
            }
        } else return {
            undefined: true
        }
    }
}