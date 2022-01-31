export class InputGetter {
    constructor(app) {
        this._app = app
    }
    catchInput(length) {
        return this._app.input.catchInput(length)
    }
    catchName() {
        return this._app.input.catchName()
    }
    searchFrom(listName, query, template = i => i) {
        const index = this._app.data.get("list", listName).body.findIndex(_item => _item.name === query)
        return template(index)
    }
}