import { LANGUAGES, THEME_COLOR } from "../../../../data.js"
import { WebOption } from "../../lib/WebOption.class.js"
import { addValueChangedListener } from "../../_core/util/common.js"
import { setThemeColor } from "../mdui.js"
import { isAprilFools } from "../util.js"

export default async function (app) {
    const { DEFAULT_LANGUAGE } = app.config
    const DEFAULT_THEME_COLOR = {
        primary: "indigo",
        accent: "pink"
    }
    const option = new __Option__("option", res => {
        document.body.classList.add("loading")
        app.initialize(res)
    })
    
    // Events
    app.event.on("app.input", () => {
        option._getItem("inputing").select(app.config.$input.value, true)
        option.setStorage()
    })
    
    return option
    
    // Languages
    .addItem({
        name: "lang",
        description: "语言",
        values: Object.entries(!function() {
            const _languages = {}
            each(LANGUAGES, (lang, {name}) => _languages[lang] = name)
            return _languages
        }),
        callback: (selected, original) => {
            document.documentElement.lang = selected
            console.debug("Option: lang -> from", original, "to", selected)
            const branches = LANGUAGES[selected].branch
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
    
    // Theme color
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
    
    // Others
    .addItem({
        name: "liteModel",
        description: "简洁模式，手机用户建议开启",
        values: [ [true, "开启（覆盖 listWithImage，不显示列表项图片）"], [false] ],
        callback: (selected, original) => {
            console.debug("Option: liteModel -> from", original, "to", selected)
            if (selected) document.body.classList.add("lite")
            else document.body.classList.remove("lite")
            window._LITE_MODELL = selected
        },
        defaultValue: false
    })
    .addItem({
        name: "listWithImage",
        description: "列表项是否带有图片（如果有）",
        values: [ [true, "是"], [false, "否"] ],
        callback: (selected, original) => {
            console.debug("Option: listWithImage -> from", original, "to", selected)
        },
        defaultValue: false
    })
    .addItem({
        name: "customURL",
        callback: (selected, original) => {
            document.querySelector("#customURL").value = selected.join("\n")
            console.debug("Option: customURL -> from", original, "to", selected)
        },
        // handler: value => value.split("\n"),
        defaultValue: []
    })
    .addItem({
        name: "inputing",
        callback: selected => {
            if (selected) app.config.$input.value = selected
        },
        defaultValue: ""
    })
}

class __Option__ extends WebOption {
    constructor(namespace, handler) {
        super(namespace)
        this._handler = handler
    }
    setItem(key, value) {
        if (
            isAprilFools() &&
            (key === "themePrimaryColor" || key === "themeAccentColor")
        ) return "Happy April Fools!"
        this.setItemVal(key, value, (_, __, res) => this._handler(res))
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
