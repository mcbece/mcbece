import { rename } from "./rename.js"
import { copyObject } from "../../util/common.js"

export function getFromJson(listGroup) {
    if (listGroup === undefined) return {}
    listGroup = [...new Set(listGroup.replace(/\s?;\s?/g, ";").split(";"))]
    let output = {
        names: {},
        lists: {}
    }
    for (let i = 0; i < listGroup.length; i++) {
        let part = listGroup[i].match(/^([.A-Za-z0-9\[\]\(\)_@#$&*%=^~]+)({.*})?$/) ?? []
        let _name = rename.call(this, part[1])
        let option = part[2] ?? ""
        let name = _name + option
        let item = this.data.getList(_name)
        if (/\s*;\s*/.test(_name)) {
            let result = this.list.getFromJson(_name)
            Object.assign(output.lists, result.lists)
            Object.assign(output.names, result.names)
            continue
        }
        if (item === undefined) {
            output.lists[name] = [
                {
                    "info": "未知的列表"
                }
            ]
            output.names[name] = reeditHeader.call(this, name)
            continue
        } else if (!item.length || (item.length === 1 && !("extend" in item[0]))) {
            output.lists[name] = [
                {
                    "info": "空列表"
                }
            ]
            output.names[name] = reeditHeader.call(this, name)
            continue
        } else if ("extend" in item[0]) {
            let result = this.list.getFromJson(item[0].extend)
            Object.assign(output.lists, result.lists)
            Object.assign(output.names, result.names)
            if (item.length === 1) continue
        }
        let { length: { max: maxLength = item.length - 1, min: minLength = 1 } = {}, input: { replace, text } = {} } = option && JSON.parse(option)
        item = copyObject(item)
        ~~maxLength
        ~~minLength
        if (maxLength > item.length - 1) maxLength = item.length - 1
        if (minLength < 1) minLength = 1
        if (maxLength < 1) maxLength = 1
        if (minLength > maxLength) minLength = maxLength - 1
        let header = item[0]
        let { input = {}, url } = header.template ?? {}
        if (replace !== undefined) input.replace = replace
        if (text !== undefined) input.text = text
        let list = {
            header: reeditHeader.call(this, name, header),
            body: []
        }
        for (let i = minLength; i < maxLength + 1; i++) {
            if (item[i].input === undefined) item[i].input = input
            if (item[i].url === undefined) item[i].url = url
            list.body.push(item[i])
        }
        output.lists[name] = list.body
        output.names[name] = list.header
    }
    return output
}

function reeditHeader(name, header) {
    return {
        name: header?.name || name,
        minecraft_version: header?.minecraft_version || this.data[this.LANG].MINECRAFT_VERSION,
        option: Object.assign({
            searchable: true,
            search_spaces: ["name", "info"]
        }, header?.option)
    }
}