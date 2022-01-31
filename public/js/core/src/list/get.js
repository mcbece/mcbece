import { rename } from "./rename.js"
import { deepCopy, objectHas, toJSON } from "../../util/common.js"

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
        const _list = deepCopy(this.data.get("list", name))
        const header = _list?.header
        const body = _list?.body
        if (_list === undefined) {
            output.lists[_name] = [
                {
                    "info": "未知的列表"
                }
            ]
            output.names[_name] = reeditHeader.call(this, _name, header)
            continue
        } else if (!header || (!body.length && !objectHas(header, "extend"))) {
            output.lists[_name] = [
                {
                    "info": "空列表"
                }
            ]
            output.names[_name] = reeditHeader.call(this, _name, header)
            continue
        } else if (objectHas(header, "extend")) {
            const result = this.list.getFromJson(header.extend)
            Object.assign(output.lists, result.lists)
            Object.assign(output.names, result.names)
            if (!body.length) continue
        }
        let { length: { max: maxLength = body.length - 1, min: minLength = 0 } = {}, input: { replace, text } = {} } = option && toJSON(option)
        ~~maxLength
        ~~minLength
        if (maxLength > body.length - 1) maxLength = body.length - 1
        if (minLength < 0) minLength = 0
        if (maxLength < 0) maxLength = 0
        if (minLength > maxLength) minLength = maxLength - 1
        const { input = {}, url } = header.template ?? {}
        if (replace !== undefined) input.replace = replace
        if (text !== undefined) input.text = text
        const list = {
            header: reeditHeader.call(this, name, header),
            body: []
        }
        for (let i = minLength; i < maxLength + 1; i++) {
            if (!body[i].input) body[i].input = input
            if (!body[i].url) body[i].url = url
            list.body.push(body[i])
        }
        output.lists[name] = list.body
        output.names[name] = list.header
    }
    return output
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