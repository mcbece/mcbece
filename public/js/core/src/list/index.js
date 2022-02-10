import { each, deepCopy, toStringRegExp, objectGet } from "../../util/common.js"
import { _getFromJson } from "./get.js"
import { _loadToPage } from "./load.js"

export default class {
    constructor(app) {
        this.names = {}
        this.lists = {}
        
        this.load = this.load.bind(app)
        this.search = this.search.bind(app)
        this._getFromJson = _getFromJson.bind(app)
        this._loadToPage = _loadToPage.bind(app)
        
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
        const result = this.list._getFromJson(listGroup)
        // console.log({ listGetResult: result })
        if (Object.keys(deepCopy(this.list.names)).sort().toString() !== Object.keys(deepCopy(result.names)).sort().toString()) {
            console.log({ listLoadResult: result })
            this.list.names = result.names
            this.list.lists = result.lists
            
            this.list._loadToPage(result, this.config.$list)
            
            // this.list.renderToHTML(result, list => this.list.loadToPage(list, this.config.$list))
        }
    }
    search() {
        const { input: { catchInput, typeFrom } } = this
        const result = {
            lists: {},
            names: {}
        }
        each(this.list.names, (listName, _header) => {
            const list = {
                body: deepCopy(this.list.lists[listName]),
                header: _header
            }
            let _query = catchInput(-1)
            if (listName === "command") _query = _query.replace("/", "")
            else if (listName === "selector.variable") _query = catchInput("the_latest_selector_variable")
            else if (typeFrom("selector_variable_value")) _query = catchInput("selector_variable_value")
            if (!list.header.option.searchable || !_query) {
                result.lists[listName] = list.body
                result.names[listName] = list.header
                return
            }
            const query = toStringRegExp(_query)
            let _lists = []
            for (let searchSpace of list.header.option.search_spaces) {
                _lists = _search.call(this, list.body, query, searchSpace)
                if (_lists.length) break
            }
            if (_lists.length) {
                result.lists[listName] = _lists
                result.names[listName] = list.header
            }
        })
        if (Object.keys(result.lists).length) this.list._loadToPage(result, this.config.$list)
        else this.list._loadToPage({
            lists: {
                _: [
                    {
                        info: "没有搜索到任何东西"
                    }
                ]
            },
            names: {
                _: {
                    option: {
                        searchable: false
                    }
                }
            }
        }, this.config.$list)
        
        function _search(list, query, searchSpace) {
            const result = list.filter(item => query.test(item[searchSpace]))
            return result.map(item => {
                item[searchSpace] = item[searchSpace]?.replace(query, objectGet(this.config, "list.template.highlight", (_, $1) => $1))
                return item
            })
        }
    }
}