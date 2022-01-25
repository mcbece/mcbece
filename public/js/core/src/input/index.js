import { catchInput } from "./catchInput.js"
import { input } from "./input.js"
import { copy } from "./copy.js"
import { typeFrom } from "./type.js"

export default class {
    constructor(app) {
        this.catchInput = catchInput.bind(app)
        this.input = input.bind(app)
        this.copy = copy.bind(app)
        this.typeFrom = typeFrom.bind(app)
    }
    catchName() {
        let commandName = this.catchInput(0)
        if (commandName) return commandName.replace("/", "")
    }
}