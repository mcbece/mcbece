import { deepEqual } from "fast-equals"
import { getReturn } from "@/util/index.js"
import { DataCache } from "../../lib/DataCache.class.js"
import { VirtualScroll } from "../../lib/VirtualScroll.class.js"
import { _reconstruction } from "./reconstruction.js"
import { _get } from "./get.js"
import { _load } from "./load.js"
import { _search } from "./search.js"
import { _render } from "./render.js"

export default app => class {
    constructor() {
        this.names = {}
        this.lists = {}
        this._lists = []
        this.searchCache = new DataCache(10000)
        // app.event.once("app.init", () => {})
        this.__vs = new VirtualScroll({
            rootEle: document.querySelector(".list-container"),
            data: [],
            render: _render(app).bind(this),
            _getter: {
                get bench() {
                    return app.plugin.get(/^(.+):option$/).getItem("listBench")
                },
                get height() {
                    return getReturn(app.config.get("list._height"))
                },
                get itemHeight() {
                    return getReturn(app.config.get("list._itemHeight"))
                }
            }
        })
    }
    load(_listGroup) {
        const lists = _reconstruction(app).call(this, _listGroup)
        const _lists = lists.map(({ name }) => name)
        if (!deepEqual(this._lists, _lists)) {
            this._lists = _lists
            const result = _get(app).call(this, lists)
            app.event.emit("app.list.load", result)
            this.names = result.names
            this.lists = result.lists
            _load(app).call(this, result)
        }
    }
    reload() {
        this.__vs.initScroll()
    }
    search() {
        const query = app.input.catchInput(-1)
        const cacheName = app.input.catchInput().join(" ")
        const result = _search(app).call(this, query, cacheName)
        this.searchCache.push(cacheName, result)
        app.event.emit("app.list.search", result, query)
        _load(app).call(this, result)
    }
    clear() {
        app.config.$list.innerHTML = ""
        this.names = {}
        this.lists = {}
        this._lists = []
        this.__vs.destroy()
        this.searchCache.clear()
    }
}
