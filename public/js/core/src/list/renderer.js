import { each, objectHas, getReturn, toString } from "../../util/common.js"

const DEFAULT_CONFIG = {
    image: {
        handlerFun(item, util) {
            if (app.lite || !app.list.withImage) return
            const image = item.image
            if (image) return image
        }
    },
    onclick: {
        handlerFun(item) {
            const input = item.input
            const auto_next_list = item.auto_next_list
            if (input || auto_next_list) {
                const output = {
                    input: {
                        text: "",
                        replace: ""
                    },
                    auto_next_list: ""
                }
                if (input) {
                    const replace = input.replace
                    const text = input.text
                    if (replace) output.input.replace = replace
                    if (text) output.input.text = text
                        .replace(/{name}/g, toString(item.name, "")
                            .replace(/\<.+\>(.*)\<\/.+\>/g, "$1")
                        )
                        .replace(/{info}/g, toString(item.info, "")
                            .replace(/{color:\s?.+}/g, "")
                            .replace(/\<.+\>(.*)\<\/.+\>/g, "$1")
                        )
                    output.input = `app.input.input('${Object.values(output.input).join("', '")}')`
                } else output.input = ""
                if (auto_next_list) output.auto_next_list = `app.list.load('${auto_next_list}')`
                else output.auto_next_list = "app.change()"
                return Object.values(output).join("; ")
            }
        }
    },
    name: {
        handlerFun(item) {
            const name = toString(item.name, "")
            return name
        }
    },
    info: {
        handlerFun(item) {
            const info = toString(item.info, "")
            const colorReg = /{color:\s?(#[0-9A-Za-z]{6}|rgb\([.0-9]+,\s?[.0-9]+,\s?[.0-9]+\)|rgba\([.0-9]+,\s?[.0-9]+,\s?[.0-9]+,\s?[.0-9]+\)|[a-z]+)}/g
            return info.replace(colorReg, '<span style="background-color: $1; margin: 0 4px; border: 1px inset black">&emsp;</span>')
        }
    },
    url: {
        handlerFun(item) {
            if (!app.lite) {
                const url = item.url
                if (url) return url
                    .replace(/{name}/g, item.name
                        .replace(/\<.+\>.*\<\/.+\>/g, "")
                    )
                    .replace(/{info}/g, item.info
                        .replace(/{color:\s?.+}/g, "")
                        .replace(/\[.*\]/g, "")
                        .replace(/\<.+\>.*\<\/.+\>/g, "")
                    )
                    .replace(/{command_page}/g, app.data.get("text", "url.command_page"))
                    .replace(/{normal_page}/g, app.data.get("text", "url.normal_page"))
                    .replace(/{search_page}/g, app.data.get("text", "url.search_page"))
            }
        }
    }
}

export class ListItemRenderer {
    constructor(target, listItem) {
        this.renderers = {}
        if (listItem) this.setListItem(listItem)
        
        each(DEFAULT_CONFIG, (name, { handlerFun, callbackFun, defaultVal }) => this.addItem(name, handlerFun, callbackFun, defaultVal))
        each(target, (name, { handlerFun, callbackFun, defaultVal }) => {
            if (objectHas(DEFAULT_CONFIG, name)) {
                if (handlerFun) this.getItem(name).setHandlerFun(handlerFun)
                if (callbackFun) this.getItem(name).setCallbackFun(callbackFun)
                if (defaultVal) this.getItem(name).setDefaultVal(defaultVal)
            }
            else this.addItem(name, handlerFun, callbackFun, defaultVal)
        })
    }
    setListItem(listItem) {
        this.listItem = listItem
        return this
    }
    addItem(name, handler, callbackFun, defaultVal) {
        this.renderers[name] = new ListItemRendererItem(handler, callbackFun, defaultVal)
        return this
    }
    getItem(name) {
        return this.renderers[name]
    }
    hasItem(name) {
        if (this.renderers[name]) return true
        else return false
    }
    get(name) {
        return this.getItem(name).run(this.listItem)
    }
}

class ListItemRendererItem {
    constructor(handlerFun, callbackFun = s => s, defaultVal = "") {
        this.handlerFun = handlerFun
        this.callbackFun = callbackFun
        this.defaultVal = defaultVal
    }
    setHandlerFun(handlerFun) {
        this.handlerFun = handlerFun
        return this
    }
    setCallbackFun(callbackFun) {
        this.callbackFun = callbackFun
        return this
    }
    setDefaultVal(defaultVal) {
        this.defaultVal = defaultVal
        return this
    }
    run(item) {
        const result = this.handlerFun(item)
        if (result) {
            if (Array.isArray(result)) return getReturn(this.callbackFun, ...result)
            else return getReturn(this.callbackFun, result)
        } else return getReturn(this.defaultVal)
    }
}