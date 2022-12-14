import { initKeyboardContral } from "./keyboard.js"
import { catchInput } from "./catch.js"
import { input } from "./input.js"
import { copy } from "./copy.js"
import { typeFrom } from "./type.js"

export default app => class {
    constructor() {
        this.catchInput = catchInput(app).bind(this)
        this.input = input(app).bind(this)
        this.copy = copy(app).bind(this)
        this.typeFrom = typeFrom(app).bind(this)
        
        this.keyboardContral = initKeyboardContral(app)()
    }
    catchName() {
        const commandName = this.catchInput(0)
        if (commandName) return commandName.replace("/", "")
        else return ""
    }
}
