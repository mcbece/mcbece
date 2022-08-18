import { stringToNode, getReturn } from "../../util/common.js"

export default {
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
    },
}
