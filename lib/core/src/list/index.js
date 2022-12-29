import { deepEqual } from "fast-equals"
import { getReturn } from "@/util/index.js"
import { DataCache } from "../../lib/DataCache.class.js"
import { VirtualScroll } from "../../lib/VirtualScroll.class.js"
import { _reconstruction } from "./reconstruction.js"
import { _get } from "./get.js"
import { _load } from "./load.js"
import { _search } from "./search.js"
import { _render } from "./render.js"

export default core => class {
    constructor() {
        this.names = {}
        this.lists = {}
        this._lists = []
        this.searchCache = new DataCache(10000)
        // core.event.once("core.init", () => {})
        this.__vs = new VirtualScroll({
            rootEle: document.querySelector(".list-container"),
            data: [],
            render: _render(core).bind(this),
            _getter: {
                get bench() {
                    return core.plugin.get(/^(.+):option$/).getItemVal("listBench")
                },
                get height() {
                    return getReturn(core.config.get("list._height"))
                },
                get itemHeight() {
                    return getReturn(core.config.get("list._itemHeight"))
                }
            }
        })
    }
    load(_listGroup) {
        const lists = _reconstruction(core).call(this, _listGroup)
        const _lists = lists.map(({ name }) => name)
        if (!deepEqual(this._lists, _lists)) {
            this._lists = _lists
            const result = _get(core).call(this, lists)
            core.event.emit("core.list.load", result)
            this.names = result.names
            this.lists = result.lists
            _load(core).call(this, result)
        }
    }
    reload() {
        this.__vs.initScroll()
    }
    search() {
        const query = core.input.catchInput(-1)
        const cacheName = core.input.catchInput().join(" ")
        const result = _search(core).call(this, query, cacheName)
        this.searchCache.push(cacheName, result)
        core.event.emit("core.list.search", result, query)
        _load(core).call(this, result)
    }
    clear() {
        core.config.$list.innerHTML = ""
        this.names = {}
        this.lists = {}
        this._lists = []
        this.__vs.destroy()
        this.searchCache.clear()
    }
}
