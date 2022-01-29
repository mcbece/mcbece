import { objectGet } from "../util/common.js"

export class TextData {
    constructor(data) {
        this.data = data
    }
    get(name, _return) {
        return objectGet(this.data, name, _return)
    }
}