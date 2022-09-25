import merge from "merge-options"
import { each, objectHas, deserialize } from "@/util/index.js"
import { List } from "../../lib/ListData.class.js"

export function _get(listGroup) {
    const output = {
        names: {},
        lists: {}
    }
    each(listGroup, ({ name: _name, list: _list, option: _option }) => {
        const header = _list?._header
        const body = _list?._body
        if (_list === undefined) { // TODO
            output.lists[_name] = [
                {
                    description: "未知的列表"
                }
            ]
            output.names[_name] = reeditHeader(_name, header)
            return
        } else if (!header || !body.length) {
            output.lists[_name] = [
                {
                    description: "空列表"
                }
            ]
            output.names[_name] = reeditHeader(_name, header)
            return
        }
        const option = _option ? deserialize(_option) : {}
        const template = header.template ?? {}
        const list = {
            header: reeditHeader(_name, header),
            body: []
        }
        each(body, item => {
            list.body.push(merge(template, item, option))
        })
        output.lists[_name] = list.body
        output.names[_name] = list.header
    })
    return output
}

function reeditHeader(name, header) {
    return merge({
        name: header?.name || name,
        minecraft_version: header?.minecraft_version,
        option: {
            searchable: true,
            search_spaces: ["name", "description"]
        }
    }, header)
}
