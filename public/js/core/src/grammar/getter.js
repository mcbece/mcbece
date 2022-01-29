export class ListNameGetter {
    constructor(app) {
        this._app = app
    }
    catchInput(length) {
        return this._app.input.catchInput(length)
    }
    catchName() {
        return this._app.input.catchName()
    }
    searchFrom(list, query, template = i => i) {
        const index = this._app.data.get("list", list).getBody().findIndex(_item => _item.name === query)
        if (index !== -1) return template(index)
        else return template(0)
    }
}