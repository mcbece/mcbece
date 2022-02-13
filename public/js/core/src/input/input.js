import { readLine } from "../../util/common.js"

export function input({ text, replace }) {
    const { $input } = this.config
    const fixed = fix($input.value)
    const lastLine = readLine($input.value, -1)
    let output = ""
    if (replace === "the_last_selector_argument") {
        const selector_argument = lastLine.split("[").at(-1)
        if (/,/.test(selector_argument)) output = fixLine(lastLine, ",")
        else output = fixLine(lastLine, "[")
    } else if (replace === "the_last_selector_argument_value") {
        output = fixLine(lastLine, "=")
    } else if (replace === "none") {
        output = lastLine
    } else if (replace !== "all") {
        const value = this.input.catchInput(); value.pop()
        if (!value.length) output = value.join(" ")
        else output = value.join(" ") + " "
    }
    $input.value = fixed + output + text
}

function fix(value) {
    const _fix = value.split("\n")
    if (_fix.length > 1) {
        _fix.pop()
        return _fix.join("\n") + "\n"
    } else return ""
}

function fixLine(line, keyword) {
    return line.split(keyword, line.split(keyword).length - 1).join(keyword) + keyword
}
