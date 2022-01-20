import { toRegExp } from "../../util/common.js"

export function getFromJson(grammarGroup) {
    let commandLength = this.config.$input.value.split(" ").length - 1
    if (grammarGroup.length > 2) {
        let output = []
        for (let i = 1; i < grammarGroup.length; i++) {
            let result = []
            for (let e = 0; e < commandLength && e < grammarGroup[i].control.length; e++) {
                let length = grammarGroup[i].control[e].length
                let rule = grammarGroup[i].control[e].rule
                let input = this.input.catchInput(length)
                if (rule.type === "regexp") {
                    if (toRegExp(rule.text).test(input)) result.push(true)
                    else result.push(false)
                } else if (rule.type === "regexp-contrary") {
                    if (toRegExp(rule.text).test(input)) result.push(false)
                    else result.push(true)
                } else if (rule.type in this.config.grammar.control.shortcut) {
                    let regexp = this.config.grammar.control.shortcut[rule.type]
                    // if (input !== undefined) {
                    if (regexp.test(input)) result.push(false)
                    else result.push(true)
                    // }
                }
            }
            if (!result.includes(false)) output.push(i)
        }
        // console.log({output})
        if (output[0] !== undefined) return grammarGroup[output[0]]
        else return grammarGroup[1]
    }
    else return grammarGroup[1]
}