import { deepEqual } from "fast-equals"
import { objectGet, toString } from "../../util/common.js"
import { DataCache } from "../../lib/DataCache.class.js"
import { VirtualScroll } from "../../lib/VirtualScroll.class.js"
import { _get } from "./get.js"
import { _load } from "./load.js"
import { _search } from "./search.js"
import { _render } from "./render.js"

export default class {
    constructor(app) {
        this.load = this.load.bind(app)
        this.search = this.search.bind(app)
        
        Object.defineProperty(this, "_useVirtualScroll", {
            get() {
                return objectGet(app.config, "list._useVirtualScroll")
            }
        })
        Object.defineProperty(this, "_useDivider", {
            get() {
                return objectGet(app.config, "list._useDivider") && objectGet(app.config, "list.template.divider") && !this._useVirtualScroll
            }
        })
        Object.defineProperty(this, "_height", {
            get() {
                return objectGet(app.config, "list._height")
            }
        })
        Object.defineProperty(this, "_itemHeight", {
            get() {
                return objectGet(app.config, "list._itemHeight")
            }
        })
        
        if (this._useVirtualScroll) this.__vs = new VirtualScroll({
            rootEle: document.querySelector(".list-container"),
            app: this,
            data: [],
            render: _render.bind(app),
            bench: 5
        })
    }
    names = {}
    lists = {}
    searchCache = new DataCache(10000)
    load(listGroup) {
        const result = _get.call(this, listGroup, false)
        this.event.emit("app.list.load", result, listGroup)
        
        console.debug({ listGetResult: result })
        
        if (!deepEqual(Object.keys(this.list.names).sort(), Object.keys(result.names).sort())) {
            
            console.debug({ listLoadResult: result })
            
            this.list.names = result.names
            this.list.lists = result.lists
            _load.call(this, result, this.config.$list)
        }
    }
    search() {
        const query = this.input.catchInput(-1)
        const cacheName = this.input.catchInput().join(" ")
        const result = _search.call(this, query, cacheName)
        this.event.emit("app.list.search", result, query)
        
        console.debug({listSearchResult: result})
        
        _load.call(this, result, this.config.$list)
        this.list.searchCache.push(cacheName, result)
    }
}
