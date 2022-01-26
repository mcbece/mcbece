import { testRegExp } from "../../util/common.js"

export function getFromJson(commandName) {
    const grammarGroup = this.data.getGrammar(commandName) ?? []
    const output = {
        header: grammarGroup[0],
        body: undefined
    }
    if (grammarGroup.length > 2) {
        const result = []
        for (let i = 1; i < grammarGroup.length; i++) {
            const _result = []
            for (let e = 0; e < this.input.catchInput().length - 1 && e < grammarGroup[i].control.length; e++) {
                const rule = grammarGroup[i].control[e].rule
                const input = this.input.catchInput(grammarGroup[i].control[e].length)
                if (rule in this.config.grammar.control.shortcut) _result.push(testRegExp(this.config.grammar.control.shortcut[rule], input))
                else _result.push(testRegExp(rule, input))
            }
            if (!_result.includes(false)) result.push(i)
        }
        if (result.length) output.body = grammarGroup[result[0]]
        else output.body = grammarGroup[1]
    } else if (grammarGroup.length > 1) output.body = grammarGroup[1]
    return output
}