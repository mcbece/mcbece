import { deepEqual } from "fast-equals"
import { getReturn } from "@util/index.js"
import { DataCache } from "../../lib/DataCache.class.js"
import { VirtualScroll } from "../../lib/VirtualScroll.class.js"
import { _reconstruction } from "./reconstruction.js"
import { _get } from "./get.js"
import { _load } from "./load.js"
import { _search } from "./search.js"
import { _render } from "./render.js"

export default class {
    constructor(app) {
        this.load = this.load.bind(app)
        this.reload = this.reload.bind(app)
        this.search = this.search.bind(app)
        this.clear = this.clear.bind(app)
        
        this.__vs = new VirtualScroll({
            rootEle: document.querySelector(".list-container"),
            config: {
                get height() {
                    return getReturn(app.config.get("list._height"))
                },
                get itemHeight() {
                    return getReturn(app.config.get("list._itemHeight"))
                }
            },
            data: [],
            render: _render.bind(app),
            bench: 10 // TODO 加入 option
        })
    }
    names = {}
    lists = {}
    _lists = []
    searchCache = new DataCache(10000)
    load(_listGroup) {
        const lists = _reconstruction.call(this, _listGroup)
        const _lists = lists.map(({ name }) => name)
        if (!deepEqual(this.list._lists, _lists)) {
            this.list._lists = _lists
            const result = _get.call(this, lists)
            this.event.emit("app.list.load", result)
            this.list.names = result.names
            this.list.lists = result.lists
            _load.call(this, result)
        }
    }
    reload() {
        this.list.__vs.initScroll()
    }
    search() {
        const query = this.input.catchInput(-1)
        const cacheName = this.input.catchInput().join(" ")
        const result = _search.call(this, query, cacheName)
        this.list.searchCache.push(cacheName, result)
        this.event.emit("app.list.search", result, query)
        _load.call(this, result)
    }
    clear() {
        this.config.$list.innerHTML = ""
        this.list.names = {}
        this.list.lists = {}
        this.list._lists = []
        this.list.__vs.destroy()
        this.list.searchCache.clear()
    }
}
