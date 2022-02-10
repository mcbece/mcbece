import { each, deepCopy, objectHas, toJSON } from "../../util/common.js"
import { rename } from "./rename.js"
import { List } from "../../lib/ListData.class.js"

export function _getFromJson(listGroup) {
    const output = {
        names: {},
        lists: {}
    }
    if (typeof listGroup === "object" || typeof listGroup === "string") {
        if (Array.isArray(listGroup) || typeof listGroup === "string") {
            listGroup = [...new Set(split(listGroup))]
            for (let _listName of listGroup) {
                const _part = _listName.match(/^([.A-Za-z0-9\[\]\(\)_@#$&*%=^~]+)({.*})?$/) ?? []
                const _name = rename.call(this, _part[1])
                const option = _part[2] ?? ""
                const name = _name + option
                if (/\s*;\s*/.test(_name)) {
                    const result = this.list._getFromJson(name)
                    Object.assign(output.lists, result.lists)
                    Object.assign(output.names, result.names)
                    continue
                }
                handleGet.call(this, name, option, this.data.get("list", _name))
            }
        }
        else if (listGroup instanceof List) handleGet.call(this, listGroup.header._indexName || "__anonymous", "", listGroup)
        else each(listGroup, (name, list) => handleGet.call(this, name, "", list))
    }
    return output
    
    function handleGet(_name, _option, _list) {
        const header = deepCopy(_list?.header)
        const body = deepCopy(_list?.body)
        if (_list === undefined) {
            output.lists[_name] = [
                {
                    "info": "未知的列表"
                }
            ]
            output.names[_name] = reeditHeader.call(this, _name, header)
            return
        } else if (!header || (!body.length && !objectHas(header, "extend"))) {
            output.lists[_name] = [
                {
                    "info": "空列表"
                }
            ]
            output.names[_name] = reeditHeader.call(this, _name, header)
            return
        } else if (objectHas(header, "extend")) {
            const result = this.list._getFromJson(header.extend)
            Object.assign(output.lists, result.lists)
            Object.assign(output.names, result.names)
            if (!body.length) return
        }
        let { length: { max: maxIndex = body.length, min: minIndex = 0 } = {}, input: { replace: replaceOption, text: textOption } = {} } = _option && toJSON(_option)
        let { input: { replace: replaceHeader, text: textHeader } = {}, urlHeader } = header.template ?? {}
        replaceHeader ??= replaceOption
        textHeader ??= textOption
        const list = {
            header: reeditHeader.call(this, _name, header),
            body: []
        }
        each(body.slice(~~minIndex, ~~maxIndex), item => {
            item.input ??= {
                replace: replaceHeader,
                text: textHeader
            }
            item.url ??= urlHeader
            list.body.push(item)
        })
        output.lists[_name] = list.body
        output.names[_name] = list.header
    }
}

function reeditHeader(name, header) {
    return {
        name: header?.name || name,
        minecraft_version: header?.minecraft_version || this.data[this.LANG]?.MINECRAFT_VERSION,
        option: Object.assign({
            searchable: true,
            search_spaces: ["name", "info"]
        }, header?.option)
    }
}

function split(target) {
    if (Array.isArray(target)) return target
    else return target.split(/\s*;\s*/)
}