import { each, replaceString, toString } from "@util/index.js"
import { setThemeColor, snackbar, confirm } from "@util/mdui.js"
import { isAprilFools } from "@util/date.js"
import { LANGUAGES, THEME_COLOR } from "@/src/data.js"
import { WebOption } from "@core/lib/WebOption.class.js"
import { List } from "@core/lib/ListData.class.js"

const DEFAULT_THEME_COLOR = {
    primary: "indigo",
    accent: "pink"
}

export default async function(app) {
    const { DEFAULT_LANGUAGE } = app.config
    
    const option = new __Option__("option", () => app.event.emit("app.reoption"))
    
    app.event.on("app.init.end", () => {
        app.list.withImage = option.getItemVal("listWithImage")
    })
    
    app.config.set({
        data: {
            custom: [ getCustomData(app) ]
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
        callback: (selected, original) => {
            document.documentElement.lang = selected
            console.debug("Option: lang -> from", original, "to", selected)
            const branches = LANGUAGES[selected].branches
            option.addItem({
                name: "branch",
                description: "分支",
                values: Object.entries(branches),
                callback:(_selected, _original) => {
                    console.debug("Option: branch -> from", _original, "to", _selected)
                },
                defaultValue: branches[0]
            })
        },
        defaultValue: DEFAULT_LANGUAGE
    })
    
    // Theme Color
    .addItem({
        name: "themePrimaryColor",
        description: "主题色 - 主色",
        values: Object.entries(THEME_COLOR.primary),
        callback: (selected, original) => {
            setThemeColor({ primary: [original, selected] })
            console.debug("Option: themePrimaryColor -> from", original, "to", selected)
        },
        defaultValue: DEFAULT_THEME_COLOR.primary
    })
    .addItem({
        name: "themeAccentColor",
        description: "主题色 - 强调色",
        values: Object.entries(THEME_COLOR.accent),
        callback: (selected, original) => {
            setThemeColor({ accent: [original, selected] })
            console.debug("Option: themeAccentColor -> from", original, "to", selected)
        },
        defaultValue: DEFAULT_THEME_COLOR.accent
    })
    
    // Lite Model
    .addItem({
        name: "liteModel",
        description: "简洁模式，手机用户建议开启",
        values: [ [true, "开启（覆盖 listWithImage，不显示列表项图片）"], [false] ],
        callback: (selected, original) => {
            console.debug("Option: liteModel -> from", original, "to", selected)
            if (selected) document.body.classList.add("lite")
            else document.body.classList.remove("lite")
            window._LITE_MODEL = selected
        },
        defaultValue: window.matchMedia("(max-width: 1023.9px)").matches
    })
    
    // Others
    .addItem({
        name: "customURL",
        callback: (selected, original) => {
            document.querySelector("#customURL").value = selected.join("\n")
            console.debug("Option: customURL -> from", original, "to", selected)
        },
        // handler: value => value.split("\n"),
        defaultValue: []
    })
}

class __Option__ extends WebOption {
    constructor(storeName, callback) {
        super(storeName)
        this.callback = callback
    }
    setItem(key, value) {
        if (
            isAprilFools() &&
            (key === "themePrimaryColor" || key === "themeAccentColor")
        ) return "Happy April Fools!"
        this.setItemVal(key, value, (_, __, res) => this.callback(res)).done()
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

const getCustomData = app => ({
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
                                    const keys = app.option.keys()
                                    const list = new List("_option.keys")
                                    list.setHeader({
                                        template: {
                                            input: {
                                                text: "{This: name} "
                                            }
                                        }
                                    })
                                    each(keys, key => {
                                        const item = app.option._getItem(key)
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
                                    const values = app.option.valuesOf(key)
                                    const list = new List("_option.values")
                                    each(values, ([name, description]) => list.addItem({
                                        name: toString(name),
                                        active: name === app.option._getItem(key).selected,
                                        description: description + (key === "themePrimaryColor" || key === "themeAccentColor" ? ` {Color: ${description}}` : ""),
                                        onclick() {
                                            confirm({
                                                message: replaceString("你确定要将 {key} 的值改为 {name} 吗？", { key, name }),
                                                onConfirm: () => app.option.setItem(key, name)
                                            }).then(([result, e]) => {
                                                if (e) snackbar(e)  // Happy April Fools!
                                                else if (result) snackbar("设置成功")
                                            }).catch(console.error)
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
