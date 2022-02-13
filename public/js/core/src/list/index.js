import { objectGet, toString } from "../../util/common.js"
import { DataCache } from "../../lib/DataCache.class.js"
import { _get } from "./get.js"
import { _load } from "./load.js"
import { _search } from "./search.js"

export default class {
    constructor(app) {
        this.names = {}
        this.lists = {}
        this.searchCache = new DataCache(1000)
        
        this.load = this.load.bind(app)
        this.search = this.search.bind(app)
        this._useDivider = this._useDivider.bind(app)
        this._useVirtualScroll = this._useVirtualScroll.bind(app)
    }
    _useDivider() {
        return objectGet(this.config, "list._use_divider") && objectGet(this.config, "list.template.divider") && !this.list._useVirtualScroll
    }
    _useVirtualScroll() {
        return objectGet(this.config, "list._use_virtual_scroll") && document.querySelector(".virtual-scroll")
    }
    load(listGroup) {
        const result = _get.call(this, listGroup, false)
        // console.log({ listGetResult: result })
        if (toString(Object.keys(this.list.names).sort()) !== toString(Object.keys(result.names).sort())) {
            console.log({ listLoadResult: result })
            this.list.names = result.names
            this.list.lists = result.lists
            _load.call(this, result, this.config.$list)
        }
    }
    search() {
        const query = this.input.catchInput(-1)
        const cacheName = this.input.catchInput().join(" ")
        const result = _search.call(this, query, cacheName)
        // console.log({listSearchResult: result})
        _load.call(this, result, this.config.$list)
        this.list.searchCache.push(cacheName, result)
    }
}
