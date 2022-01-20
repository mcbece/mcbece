import { forEachObject, getReturn, toString } from "../../util/common.js"

const DEFAULT_CONFIG = {
    image: {
        handlerFun(item, util) {
            if (app.thin_model || !app.list.withImage) return
            let image = item.image
            if (image) return image
        }
    },
    onclick: {
        handlerFun(item) {
            let input = item.input
            let auto_next_list = item.auto_next_list
            if (input || auto_next_list) {
                let output = {
                    input: {
                        text: "",
                        replace: ""
                    },
                    auto_next_list: ""
                }
                if (input) {
                    let replace = input.replace
                    let text = input.text
                    if (replace) output.input.replace = replace
                    if (text) output.input.text = text.replace(/{name}/g, item.name.replace(/\<.+\>(.*)\<\/.+\>/g, "$1")).replace(/{info}/g, item.info.replace(/{color:\s?.+}/g, "").replace(/\<.+\>(.*)\<\/.+\>/g, "$1"))
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
            let name = toString(item.name)
            return name
        }
    },
    info: {
        handlerFun(item) {
            let info = toString(item.info)
            let regexp = /{color:\s?(#[0-9A-Za-z]{6}|rgb\([.0-9]+,\s?[.0-9]+,\s?[.0-9]+\)|rgba\([.0-9]+,\s?[.0-9]+,\s?[.0-9]+,\s?[.0-9]+\)|[a-z]+)}/g
            return info?.replace(regexp, '<span style="background-color: $1; margin: 0 4px; border: 1px inset black">&emsp;</span>')
        }
    },
    url: {
        handlerFun(item) {
            if (!app.thin_model) {
                let url = item.url
                if (url) {
                    let output = url.replace(/{name}/g, item.name.replace(/\<.+\>.*\<\/.+\>/g, "")).replace(/{info}/g, item.info.replace(/{color:\s?.+}/g, "").replace(/\[.*\]/g, "").replace(/\<.+\>.*\<\/.+\>/g, "")).replace(/{command_page}/g, app.data.getGlobal("url.command_page")).replace(/{normal_page}/g, app.data.getGlobal("url.normal_page")).replace(/{search_page}/g, app.data.getGlobal("url.search_page"))
                    return output
                }
            }
            
        }
    }
}

export class ListItemGetter {
    constructor(target, listItem) {
        this.getters = {}
        if (listItem) this.setListItem(listItem)
        
        forEachObject(DEFAULT_CONFIG, (name, { handlerFun, callbackFun, defaultVal }) => this.addItem(name, handlerFun, callbackFun, defaultVal))
        forEachObject(target, (name, { handlerFun, callbackFun, defaultVal }) => {
            if (name in DEFAULT_CONFIG) {
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
        this.getters[name] = new ListItemGetterItem(handler, callbackFun, defaultVal)
        return this
    }
    getItem(name) {
        return this.getters[name]
    }
    hasItem(name) {
        if (this.getters[name]) return true
        else return false
    }
    get(name) {
        return this.getItem(name).run(this.listItem)
    }
}

class ListItemGetterItem {
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
        let result = this.handlerFun(item)
        if (result) {
            if (Array.isArray(result)) return getReturn(this.callbackFun, ...result)
            else return getReturn(this.callbackFun, result)
        }
        else return getReturn(this.defaultVal)
    }
}