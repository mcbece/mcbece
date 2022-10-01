import { objectHas, testRegExp } from "@/util/index.js"
import { getDefGrammarControlShortcut } from "../../defConfig.js"

export const _get = app => function(commandName) {
    const grammarGroup = app.data.get("grammar", commandName)
    const body = grammarGroup.body
    const output = {
        header: grammarGroup.header,
        body: undefined
    }
    if (body.length > 1) {
        const result = []
        for (let i = 0; i < body.length; i++) {
            const _result = []
            for (let e = 0; e < app.input.catchInput().length - 1 && e < body[i].control.length; e++) {
                const rule = body[i].control[e].rule
                const input = app.input.catchInput(body[i].control[e].length)
                const shortcut = Object.assign({}, getDefGrammarControlShortcut(), app.config.get("grammar.control.shortcut", {}))
                if (objectHas(shortcut, rule)) _result.push(testRegExp(shortcut[rule], input))
                else _result.push(testRegExp(rule, input))
            }
            if (!_result.includes(false)) result.push(i)
        }
        if (result.length) output.body = body[result[0]]
        else output.body = body[0]
    } else if (body.length) output.body = body[0]
    return output
}
