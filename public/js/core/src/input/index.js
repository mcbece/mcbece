import { catchInput } from "./catchInput.js"
import { input } from "./input.js"
import { copy } from "./copy.js"
import { typeFrom } from "./type.js"

export default class {
    constructor(app) {
        this.catchInput = this.catchInput.bind(app)
        this.input = this.input.bind(app)
        this.copy = this.copy.bind(app)
        this.typeFrom = this.typeFrom.bind(app)
    }
    catchInput(length) {
        return catchInput.call(this, length)
    }
    catchName() {
        let commandName = this.catchInput(0)
        if (commandName) return commandName.replace("/", "")
    }
    input(text, replace) {
        input.call(this, text, replace)
    }
    copy(model) {
        copy.call(this, model)
    }
    typeFrom(target) {
        return typeFrom.call(this, target)
    }
}