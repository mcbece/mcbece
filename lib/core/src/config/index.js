import merge from "merge-options"
import { objectGet, each } from "@util/index.js"
import { defAppConfig } from "../../defConfig.js"

export default class {
    constructor(config = {}) {
        this._config = merge(defAppConfig, config)
        each(this._config, (_, key) => {
            if (/^[$A-Z]/.test(key)) Object.defineProperty(this, key, {
                get() {
                    return this._config[key]
                }
            })
        })
    }
    get(key, _return) {
        return objectGet(this._config, key, { _return })
    }
    set(config) {
        this._config = merge.call({ concatArrays: true }, this._config, config)
    }
}
