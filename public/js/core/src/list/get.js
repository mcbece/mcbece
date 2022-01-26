import { rename } from "./rename.js"
import { copyObject, toJSON } from "../../util/common.js"

export function getFromJson(listGroup) {
    if (listGroup === undefined) return {}
    listGroup = [...new Set(split(listGroup))]
    const output = {
        names: {},
        lists: {}
    }
    for (let i = 0; i < listGroup.length; i++) {
        const part = listGroup[i].match(/^([.A-Za-z0-9\[\]\(\)_@#$&*%=^~]+)({.*})?$/) ?? []
        const name = rename.call(this, part[1])
        const option = part[2] ?? ""
        const _name = name + option
        if (/\s*;\s*/.test(name)) {
            const result = this.list.getFromJson(name)
            Object.assign(output.lists, result.lists)
            Object.assign(output.names, result.names)
            continue
        }
        const item = copyObject(this.data.getList(name))
        if (item === undefined) {
            output.lists[_name] = [
                {
                    "info": "未知的列表"
                }
            ]
            output.names[_name] = reeditHeader.call(this, _name)
            continue
        } else if (!item.length || (item.length === 1 && !("extend" in item[0]))) {
            output.lists[_name] = [
                {
                    "info": "空列表"
                }
            ]
            output.names[_name] = reeditHeader.call(this, _name)
            continue
        } else if ("extend" in item[0]) {
            const result = this.list.getFromJson(item[0].extend)
            Object.assign(output.lists, result.lists)
            Object.assign(output.names, result.names)
            if (item.length === 1) continue
        }
        let { length: { max: maxLength = item.length - 1, min: minLength = 1 } = {}, input: { replace, text } = {} } = option && toJSON(option)
        ~~maxLength
        ~~minLength
        if (maxLength > item.length - 1) maxLength = item.length - 1
        if (minLength < 1) minLength = 1
        if (maxLength < 1) maxLength = 1
        if (minLength > maxLength) minLength = maxLength - 1
        const header = item[0]
        const { input = {}, url } = header.template ?? {}
        if (replace !== undefined) input.replace = replace
        if (text !== undefined) input.text = text
        const list = {
            header: reeditHeader.call(this, name, header),
            body: []
        }
        for (let i = minLength; i < maxLength + 1; i++) {
            if (!item[i].input) item[i].input = input
            if (!item[i].url) item[i].url = url
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

function split(target) {
    if (Array.isArray(target)) return target
    else return target.split(/\s*;\s*/)
}