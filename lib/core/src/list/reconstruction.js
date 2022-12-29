import { each, objectHas } from "@/util/index.js"
import { List } from "../../lib/ListData.class.js"
import { rename } from "./rename.js"

export const _reconstruction = core => function(listNameGroup) {
    if (typeof listNameGroup === "string") {
        const listNames = listNameGroup.split(/\s*;\s*/)
        return _reconstruction(core).call(this, listNames)
    } else if (Array.isArray(listNameGroup)) {
        const output = []
        each(listNameGroup, name => {
            if (typeof name === "string") {
                const [ _name, option = "" ] = name.split("<-")
                const renameResult = rename(core).call(this, _name)
                if (Array.isArray(renameResult)) {
                    each(renameResult, name => {
                        const result = testExtend(core).call(this, name)
                        if (result) output.push(...result)
                        output.push({
                            name: name + option,
                            list: core.data.get("list", name),
                            option
                        })
                    })
                } else if (typeof renameResult === "string") {
                    const result = testExtend(core).call(this, renameResult)
                    if (result) output.push(...result)
                    output.push({
                        name: renameResult + option,
                        list: core.data.get("list", renameResult),
                        option
                    })
                }
            } else if (name instanceof List) {
                const result = testExtend(core).call(this, name)
                if (result) output.push(...result)
                const _name = name._indexName || "__anonymous"
                output.push({
                    name: _name,
                    list: name,
                    option: ""
                })
            }
        })
        return output
    } else if (listNameGroup instanceof List) {
        const output = []
        const result = testExtend(core).call(this, listNameGroup)
        if (result) output.push(...result)
        const name = listNameGroup._indexName || "__anonymous"
        output.push({
            name,
            list: listNameGroup,
            option: ""
        })
        return output
    }
}

const testExtend = core => function(_list) {
    let header
    if (typeof _list === "string") {
        const list = core.data.get("list", _list)
        header = list?._header
    } else if (_list instanceof List) {
        header = _list?._header
    }
    if (header && header.extend) {
        return _reconstruction(core).call(this, header.extend)
        //@type header.extend string || string[]
    }
}
