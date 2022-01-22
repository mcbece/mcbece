import { testRegExp } from "../../util/common.js"

export function getFromJson(grammarGroup) {
    let commandLength = this.config.$input.value.split(" ").length - 1
    if (grammarGroup.length > 2) {
        let output = []
        for (let i = 1; i < grammarGroup.length; i++) {
            let result = []
            for (let e = 0; e < commandLength && e < grammarGroup[i].control.length; e++) {
                let rule = grammarGroup[i].control[e].rule
                let input = this.input.catchInput(grammarGroup[i].control[e].length)
                if (rule in this.config.grammar.control.shortcut) result.push(testRegExp(this.config.grammar.control.shortcut[rule], input))
                else result.push(testRegExp(rule, input))
            }
            if (!result.includes(false)) output.push(i)
        }
        // console.log({output})
        if (output.length) return grammarGroup[output[0]]
        else return grammarGroup[1]
    }
    else return grammarGroup[1]
}