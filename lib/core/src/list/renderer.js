import merge from "merge-options"
import { each, objectGet, replaceString, getReturn, toString } from "@util/index.js"

export class ListItemRenderer {
    constructor(app, target) {
        const config = merge(getDefaultConfig(app), target)
        each(config, ({ handlerFun, callbackFun, defaultVal }, name) => this.addItem(name, handlerFun, callbackFun, defaultVal))
    }
    renderers = {}
    setListItem(listItem) {
        this.listItem = listItem
        return this
    }
    addItem(name, handlerFun, callbackFun, defaultVal) {
        this.renderers[name] = new ListItemRendererItem(handlerFun, callbackFun, defaultVal)
        return this
    }
    getItem(name) {
        return this.renderers[name]
    }
    hasItem(name) {
        if (this.getItem(name)) return true
        else return false
    }
    get(name) {
        let target
        if (this.hasItem(name)) target = this.getItem(name)
        else target = new ListItemRendererItem(item => objectGet(item, name))
        return target.run(this.listItem)
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

function getDefaultConfig(app) {
    return {
        input: {
            handlerFun(item) {
                const input = item.input
                if (input && Object.keys(input).length) {
                    const { text, replace } = input
                    const output = {
                        text: "",
                        replace: ""
                    }
                    if (replace) output.replace = replace
                    if (text) output.text = replaceString(text, {
                        name: toString(item.name, "")
                            .replace(/\<.+\>(.*)\<\/.+\>/g, "$1"),
                        description: toString(item.description, "")
                            .replace(/{color:\s?.+}/g, "")
                            .replace(/\<.+\>(.*)\<\/.+\>/g, "$1")
                    })
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
            handlerFun(item) {
                const name = toString(item.name, "")
                return name
            }
        },
        description: {
            handlerFun(item) {
                const description = toString(item.description, "")
                const colorReg = /{color:\s?(#[0-9A-Za-z]{6}|rgb\([.0-9]+,\s?[.0-9]+,\s?[.0-9]+\)|rgba\([.0-9]+,\s?[.0-9]+,\s?[.0-9]+,\s?[.0-9]+\)|[a-z]+)}/g
                return description.replace(colorReg, '<span style="background-color: $1; margin: 0 4px; border: 1px inset black">&emsp;</span>')
            }
        },
        url: {
            handlerFun(item) {
                const url = item.url
                if (url) return replaceString(url, {
                    name: toString(item.name, "")
                        .replace(/\<.+\>.*\<\/.+\>/g, ""),
                    description: toString(item.description, "")
                        .replace(/{color:\s?.+}/g, "")
                        .replace(/\[.*\]/g, "")
                        .replace(/\<.+\>.*\<\/.+\>/g, ""),
                    command_page: app.data.get("text", "url.command_page"),
                    normal_page: app.data.get("text", "url.normal_page"),
                    search_page: app.data.get("text", "url.search_page")
                })
            }
        }
    }
}
