import { copyObject, toStringRegExp } from "../../util/common.js"
import { getFromJson } from "./get.js"
import { renderToHTML } from "./render.js"
import { loadToPage } from "./load.js"

export default class {
    constructor(app) {
        this.names = {}
        this.lists = {}
        this.complete = false
        
        this.load = this.load.bind(app)
        this.search = this.search.bind(app)
        this.getFromJson = getFromJson.bind(app)
        this.renderToHTML = renderToHTML.bind(app)
        this.loadToPage = loadToPage.bind(app)
    }
    load(listGroup) {
        const { names, lists } = this.list.getFromJson(listGroup)
        // console.log({ names, lists })
        if (Object.keys(copyObject(this.list.names)).sort().toString() !== Object.keys(copyObject(names)).sort().toString()) {
            console.log({ names, lists })
            this.list.names = names
            this.list.lists = lists
            this.list.renderToHTML(list => this.list.loadToPage(list, this.config.$list), names, lists)
        }
    }
    search() {
        const { input: { catchInput, typeFrom } } = this
        let result = {
            lists: {},
            names: {}
        }
        Object.keys(this.list.names).forEach(listName => {
            let list = {
                body: copyObject(this.list.lists[listName]),
                header: this.list.names[listName]
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
            let query = toStringRegExp(_query)
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
        this.list.renderToHTML(list => this.list.loadToPage(list, this.config.$list), result.names, result.lists)
        
        function _search(list, query, searchSpace) {
            let result = list.filter(item => query.test(item[searchSpace]))
            return result.map(item => {
                item[searchSpace] = item[searchSpace].replace(query, this.config.list.highlight)
                return item
            })
        }
    }
}