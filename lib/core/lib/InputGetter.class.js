export class InputGetter {
    constructor(core) {
        this.__core = core
    }
    catchInput(length) {
        return this.__core.input.catchInput(length)
    }
    catchName() {
        return this.__core.input.catchName()
    }
    searchIn(listName, query, template = i => i) {
        const index = this.__core.data.get("list", listName)._body.findIndex(e => e.name === query)
        return template(index)
    }
}
