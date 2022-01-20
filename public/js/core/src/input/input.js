export function input(text, replace) {
    const { $input } = this.config
    if (replace === "all") $input.value = ""
    else if (replace === "the_latest_selector_variable") {
        let selector_variable = $input.value.split("[")[$input.value.split("[").length - 1]
        if (/,/.test(selector_variable)) $input.value = $input.value.split(",", $input.value.split(",").length - 1).join(",") + ","
        else $input.value = $input.value.split("[", $input.value.split("[").length - 1).join("[") + "["
    } else if (replace !== "none") {
        if (this.input.catchInput().length === 1 && Object.keys(this.list.names).length === 1 && "command" in this.list.names) $input.value = "/"
        else {
            let value = this.input.catchInput()
            value.pop()
            if ($input.value === "") $input.value = value.join(" ")
            else $input.value = value.join(" ") + " "
        }
    }
    $input.value += text
}