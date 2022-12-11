import { initKeyboardContral } from "./keyboard.js"
import { catchInput } from "./catch.js"
import { input } from "./input.js"
import { copy } from "./copy.js"
import { typeFrom } from "./type.js"

export default app => ({
    catchInput: catchInput(app),
    input: input(app),
    copy: copy(app),
    typeFrom: typeFrom(app),
    keyboardContral: initKeyboardContral(app)(),
    catchName() {
        const commandName = this.catchInput(0)
        if (commandName) return commandName.replace("/", "")
        else return ""
    }
})
