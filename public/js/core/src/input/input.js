import { readLine } from "../../util/common.js"

export function input({ text, replace }) {
    const { $input } = this.config
    const fixed = fix($input.value)
    const lastLine = readLine($input.value, -1)
    let output = ""
    if (replace === "the_latest_selector_variable") {
        const selector_variable = lastLine.split("[")[lastLine.split("[").length - 1]
        if (/,/.test(selector_variable)) output = lastLine.split(",", lastLine.split(",").length - 1).join(",") + ","
        else output = lastLine.split("[", lastLine.split("[").length - 1).join("[") + "["
    } else if (replace === "the_latest_selector_value") {
        output = lastLine.split("=", lastLine.split("=").length - 1).join("=") + "="
    } else if (replace === "none") {
        output = lastLine
    } else if (replace !== "all") {
        const value = this.input.catchInput(); value.pop()
        if (lastLine === "") output = value.join(" ")
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