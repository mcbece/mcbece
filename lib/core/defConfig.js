import { toString, stringToNode, getReturn } from "@/util/index.js"

export const defAppConfig = {
    DEFAULT_LANGUAGE: "zh_cn",
    
    $input: document.querySelector("#edit"),
    $grammar: document.querySelector("#grammar"),
    $note: document.querySelector("#note"),
    $list: document.querySelector("#list"),
    
    list: {
        _height() {
            return document.documentElement.clientHeight - 120
        },
        _itemHeight: 16,
        template: {
            item(_id, _name, i, renderer) {
                const item = stringToNode(`<li id="${i}" data-id="${_id}" data-list-name="${_name}">${renderer.get("name")} - ${renderer.get("description")}</li>`)
                item.onclick = () => {
                    getReturn(renderer.get("input"))
                }
                return item
            },
            highlight(_, $1) {
                return `<span style="color: red;">${$1}</span>`
            }
        }
    },
    
    data: {
        url: "/api/mcbelist.{lang}.{branch}.min.js"
    }
}

export const getDefListRendererConfig = app => ({
    input: {
        handlerFun(item, replacer) {
            const input = item.input
            if (input && Object.keys(input).length) {
                const { text, replace } = input
                const output = {
                    text: "",
                    replace: ""
                }
                if (replace) output.replace = replace
                if (text) output.text = replacer.parse(text)
                return output
            }
        },
        callbackFun(opt) {
            return function() {
                app.input.input(opt)
            }
        }
    },
    name: {
        handlerFun(item, replacer) {
            const name = toString(item.name, "")
            if (name) return replacer.parse(name)
        }
    },
    description: {
        handlerFun(item, replacer) {
            const description = toString(item.description, "")
            if (description) return replacer.parse(description)
        }
    },
    url: {
        handlerFun(item, replacer) {
            const url = toString(item.url, "")
            if (url) return replacer.parse(url)
        }
    }
})

export const getDefListReplacerConfig = app => ({
    "This:": {
        directReturn(name, present) {
            return present.getItemData(name)
        }
    },
    "Header:": {
        directReturn(name, present) {
            return present.getHeaderData(name)
        }
    },
    "Global:": {
        directReturn(name) {
            return app.data.get("text", name)
        }
    }
})

export function getDefaultListShortcut() {
    return {
        "enchantment.level": handler,
        "entity.event": handler,
        "block.data": handler,
        "item.data": handler
    }
    
    function handler(getter, item) {
        //@return string || string[]
        return `${item}.${getter.catchInput(-2)}`
    }
}

export const getDefGrammarControlShortcut = () => ({
    isCoordinate: /^[-~^.0-9]+/,
    isSelector: /(^@[a-z]?(\[[-~^=,\.\w]*\]?)?|[\w]+)/
})
