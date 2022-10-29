import merge from "merge-options"
import { each, replaceString, toString, removeValueChangeListener, addValueChangeListener } from "@/util/index.js"
import { snackbar, confirm } from "@/util/mdui.js"
import { LANGUAGES } from "@/src/data.js"
import { WebOption } from "@/core/lib/WebOption.class.js"
import { List } from "@/core/lib/ListData.class.js"

export default async function(app) {
    const { DEFAULT_LANGUAGE } = app.config
    
    const option = new __Option__("option", () => app.event.emit("app.reoption"))
    
    app.config.add({
        data: {
            custom: [ getCustomData(option, app) ]
        }
    })
    
    app.option = option
    
    return option
    
    // Languages, Branches
    .addItem({
        name: "lang",
        description: "语言",
        values: Object.entries(!function() {
            const _languages = {}
            each(LANGUAGES, ({ name }, lang) => _languages[lang] = name)
            return _languages
        }),
        defaultValue: DEFAULT_LANGUAGE,
        callback: (selected, original) => {
            document.documentElement.lang = selected
            console.debug("Option: lang -> from", original, "to", selected)
            const branches = LANGUAGES[selected].branches
            option.addItem({
                name: "branch",
                description: "分支",
                values: Object.entries(branches),
                defaultValue: branches[0],
                callback:(_selected, _original) => {
                    console.debug("Option: branch -> from", _original, "to", _selected)
                }
            })
        }
    })
    
    // Debounce
    .addItem({
        name: "inputDebounce",
        description: "是否开启输入栏防抖（低配用户建议开启）",
        values: [ [false, "关闭"], [50, "开启，延时 50ms"], [100, "开启，延时 100ms"], [200, "开启，延时 200ms"], [400, "开启，延时 400ms"], [1000, "开启，延时 1000ms (1s)"] ],
        defaultValue: false,
        callback: (selected, original) => {
            console.debug("Option: inputDebounce -> from", original, "to", selected)
            if (app._inputListenerConfig) {
                const [ inputEle, listener, setting ] = app._inputListenerConfig
                removeValueChangeListener(inputEle, listener, setting)
                app._inputListenerConfig = addValueChangeListener(inputEle, listener, merge(setting, { debounce: !!selected, delay: selected }))
            }
        }
    })
}

class __Option__ extends WebOption {
    constructor(storeName, callback) {
        super(storeName)
        this.callback = callback
    }
    setItem(key, value) {
        confirm({
            message: replaceString("你确定要将 {key} 的值改为 {name} 吗？", { key, name }),
            onConfirm: () => this.setItemVal(key, value, (_, __, res) => this.callback(res)).done()
        }).then(([result]) => {
            if (result) snackbar("设置成功")
        }).catch(console.error)
    }
    getItem(key) {
        return this.getItemVal(key)
    }
    keys() {
        return Object.keys(this.items)
    }
    valuesOf(key) {
        return [...this._getItem(key).values]
    }
}

const getCustomData = option => ({
    zh_cn: {
        vanilla: {
            list: {
                command: [
                    {
                        name: "@option",
                        description: "切换页面设置",
                        input: {
                            replace: "all",
                            text: "{This: name} "
                        }
                    }
                ]
            },
            grammar: [
                [
                    {
                        command: {
                            name: "/^@option$/",
                            info: "切换页面设置"
                        }
                    },
                    {
                        grammar: "<设置名> <值>",
                        info: [
                            {
                                length: 1,
                                note: "指定要切换设置的名称",
                                list() {
                                    const keys = option.keys()
                                    const list = new List("_option.keys")
                                    list.setHeader({
                                        template: {
                                            input: {
                                                text: "{This: name} "
                                            }
                                        }
                                    })
                                    each(keys, key => {
                                        const item = option._getItem(key)
                                        if (item.values.size) list.addItem({
                                           name: key,
                                           description: item.description
                                        })
                                    })
                                    return list
                                }
                            },
                            {
                                length: 2,
                                note: "指定要设置的值",
                                list(getter) {
                                    const key = getter.catchInput(1)
                                    const values = option.valuesOf(key)
                                    const list = new List("_option.values")
                                    each(values, ([name, description]) => list.addItem({
                                        name: toString(name),
                                        active: name === option._getItem(key).selected,
                                        description: description + (key === "themePrimaryColor" || key === "themeAccentColor" ? ` {Color: ${description}}` : ""),
                                        onclick() {
                                            option.setItem(key, name)
                                        }
                                    }))
                                    return list
                                }
                            }
                        ]
                    }
                ]
            ]
        }
    }
})
