import deepCopy from "fast-copy"
import { each } from "@/util/index.js"

export function _search(__query, cacheName) {
    const { list: { searchCache }, input: { catchInput, typeFrom } } = this
    if (searchCache.has(cacheName)) return searchCache.get(cacheName)
    const result = {
        lists: {},
        names: {}
    }
    const thisLists = deepCopy(this.list.lists)
    each(this.list.names, (_header, listName) => {
        const list = {
            body: thisLists[listName],
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
        const query = new RegExp(`(${_query.replace("?", "\\?")})`)
        for (let searchSpace of list.header.option.search_spaces) {
            const _lists = match.call(this, list.body, query, searchSpace)
            if (_lists.length) {
                result.lists[listName] = _lists
                result.names[listName] = list.header
                break
            }
        }
    })
    if (Object.keys(result.lists).length) return result
    else return {
        lists: {
            _: [
                {
                    description: "没有搜索到任何东西"
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
    const template = this.config.get("list.template.highlight")
    const result = list.filter(item => query.test(item[searchSpace]))
    return result.map(item => {
        item[searchSpace] = item[searchSpace]?.replace(query, template)
        return item
    })
}
