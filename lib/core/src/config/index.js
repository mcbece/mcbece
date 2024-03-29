import merge from "merge-options"
import { objectGet, each } from "@/util/index.js"
import { defCoreConfig } from "../../defConfig.js"

export default core => class {
    constructor(config = {}) {
        this._config = merge.call({ concatArrays: true }, defCoreConfig, config)
        each(Object.keys(this._config), key => {
            if (/^[$A-Z]/.test(key)) Object.defineProperty(this, key, {
                get() {
                    return this._config[key]
                }
            })
        })
        this.__config = {}
    }
    get(key, _return) {
        return objectGet(this._config, key, { _return })
    }
    set(config) {
        this._config = merge.call({ concatArrays: true }, this._config, config)
    }
    add(config) {
        this.__config = merge.call({ concatArrays: true }, this.__config, config)
    }
    init() {
        this._config = merge.call({ concatArrays: true }, this.__config, this._config)
        delete this.__config
    }
}
