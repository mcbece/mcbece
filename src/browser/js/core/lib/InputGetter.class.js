export class InputGetter {
    constructor(app) {
        this.__app = app
    }
    catchInput(length) {
        return this.__app.input.catchInput(length)
    }
    catchName() {
        return this.__app.input.catchName()
    }
    searchIn(listName, query, template = i => i) {
        const index = this.__app.data.get("list", listName)._body.findIndex(e => e.name === query)
        return template(index)
    }
}
