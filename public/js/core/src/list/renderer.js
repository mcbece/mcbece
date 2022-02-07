import { each, objectHas, objectGet, replaceString, getReturn, toString } from "../../util/common.js"

const DEFAULT_CONFIG = {
    image: {
        handlerFun(item, util) {
            if (!app.list.withImage) return
            const image = item.image
            if (image) return image
        }
    },
    input: {
        handlerFun(item) {
            const input = item.input
            if (input && toString(input) !== "{}") {
                const { text, replace } = input
                const output = {
                    text: "",
                    replace: ""
                }
                if (replace) output.replace = replace
                if (text) output.text = replaceString(text, {
                    name: toString(item.name, "")
                        .replace(/\<.+\>(.*)\<\/.+\>/g, "$1"),
                    info: toString(item.info, "")
                        .replace(/{color:\s?.+}/g, "")
                        .replace(/\<.+\>(.*)\<\/.+\>/g, "$1")
                })
                return output
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
            const url = item.url
            if (url) return replaceString(url, {
                name: toString(item.name, "")
                    .replace(/\<.+\>.*\<\/.+\>/g, ""),
                info: toString(item.info, "")
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
        if (this.getItem(name)) return true
        else return false
    }
    get(name) {
        let target
        if (this.hasItem(name)) target = this.getItem(name)
        else target =  (new ListItemRendererItem(item => objectGet(item, name)))
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