import { each, deepCopy, toRegExp, objectGet } from "../../util/common.js"

export function _search(__query, cacheName) {
    const { list: { searchCache }, input: { catchInput, typeFrom } } = this
    if (searchCache.some(cacheName)) return searchCache.find(cacheName)
    const result = {
        lists: {},
        names: {}
    }
    each(this.list.names, (listName, _header) => {
        const list = {
            body: deepCopy(this.list.lists[listName]),
            header: _header
        }
        let _query = __query
        if (listName === "command") _query = _query.replace("/", "")
        else if (listName === "selector.argument") _query = catchInput("last_selector_argument")
        else if (typeFrom("selector.argument.value")) _query = catchInput("selector_argument_value")
        if (!list.header.option.searchable || !_query) {
            result.lists[listName] = list.body
            result.names[listName] = list.header
            return
        }
        const query = (() => {
            if (/^\/.*\/[gimsuy]*$/.test(_query)) return toRegExp(_query)
            else return new RegExp(`(${_query})`)
        })()
        let _lists = []
        for (let searchSpace of list.header.option.search_spaces) {
            _lists = match.call(this, list.body, query, searchSpace)
            if (_lists.length) break
        }
        if (_lists.length) {
            result.lists[listName] = _lists
            result.names[listName] = list.header
        }
    })
    if (Object.keys(result.lists).length) return result
    else return {
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
    }
}

function match(list, query, searchSpace) {
    const result = list.filter(item => query.test(item[searchSpace]))
    return result.map(item => {
        item[searchSpace] = item[searchSpace]?.replace(query, objectGet(this.config, "list.template.highlight", (_, $1) => $1))
        return item
    })
}
