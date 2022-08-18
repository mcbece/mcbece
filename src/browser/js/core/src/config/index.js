import merge from "merge-options"
import { objectGet } from "../../util/common.js"
import defConfig from "./defConfig.js"

export default class {
    constructor(config) {
        this._config = merge(defConfig, config)
    }
    get DEFAULT_LANGUAGE() {
        return this._config.DEFAULT_LANGUAGE
    }
    get $list() {
        return this._config.$list
    }
    get $input() {
        return this._config.$input
    }
    get $grammar() {
        return this._config.$grammar
    }
    get $note() {
        return this._config.$note
    }
    get(key, _return) {
        return objectGet(this._config, key, { _return })
    }
}
