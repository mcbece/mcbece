import { initKeyboardContral } from "./keyboard.js"
import { catchInput } from "./catch.js"
import { input } from "./input.js"
import { copy } from "./copy.js"
import { typeFrom } from "./type.js"

export default core => class {
    constructor() {
        this.catchInput = catchInput(core).bind(this)
        this.input = input(core).bind(this)
        this.copy = copy(core).bind(this)
        this.typeFrom = typeFrom(core).bind(this)
        
        this.keyboardContral = initKeyboardContral(core)()
    }
    catchName() {
        const commandName = this.catchInput(0)
        if (commandName) return commandName.replace("/", "")
        else return ""
    }
}
