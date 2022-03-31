import { LANGUAGES, THEME_COLOR } from "../../../../data.js"
import { WebOption } from "../../lib/WebOption.class.js"
import { addValueChangedListener } from "../../_core/util/common.js"

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
        values: Object.keys(LANGUAGES),
        callback: (selected, original) => {
            document.documentElement.lang = selected
            console.debug("Option: lang -> from", original, "to", selected)
            option.addItem({
                name: "branch",
                values: Object.keys(LANGUAGES[selected].branch),
                callback:(_selected, _original) => {
                    console.debug("Option: branch -> from", _original, "to", _selected)
                }
            })
        },
        defaultValue: DEFAULT_LANGUAGE
    })
    
    // Theme color
    .addItem({
        name: "themePrimaryColor",
        values: Object.keys(THEME_COLOR.primary),
        callback: (selected, original) => {
            document.body.classList.remove(`mdui-theme-primary-${original}`)
            document.body.classList.add(`mdui-theme-primary-${selected}`)
            document.head.querySelector('meta[name="theme-color"]').content = THEME_COLOR.primary[selected]
            console.debug("Option: themePrimaryColor -> from", original, "to", selected)
        },
        defaultValue: DEFAULT_THEME_COLOR.primary
    })
    .addItem({
        name: "themeAccentColor",
        values: Object.keys(THEME_COLOR.accent),
        callback: (selected, original) => {
            document.body.classList.remove(`mdui-theme-accent-${original}`)
            document.body.classList.add(`mdui-theme-accent-${selected}`)
            console.debug("Option: themeAccentColor -> from", original, "to", selected)
        },
        defaultValue: DEFAULT_THEME_COLOR.accent
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
    .addItem({
        name: "listWithImage",
        values: [ true, false ],
        callback: (selected, original) => {
            console.debug("Option: listWithImage -> from", original, "to", selected)
        },
        defaultValue: false
    })
    .addItem({
        name: "inputing",
        callback: selected => {
            if (selected) app.config.$input.value = selected
        },
        defaultValue: ""
    })
    .addItem({
        name: "liteModel",
        values: [ true, false ],
        callback: (selected, original) => {
            console.debug("Option: liteModel -> from", original, "to", selected)
            if (selected) document.body.classList.add("lite")
            else document.body.classList.remove("lite")
            window._LITE_MODELL = selected
        },
        defaultValue: false
    })
}

class __Option__ extends WebOption {
    constructor(namespace, handler) {
        super(namespace)
        this._handler = handler
    }
    setItem(key, value) {
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
