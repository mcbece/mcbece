import { WebOption } from "../../lib/WebOption.class.js"
import { importDefault, addValueChangedListener } from "../../lib/util.min.js"

export default async function (app) {
    const {
        DEFAULT_LANGUAGE,
        DEFAULT_THEME_COLOR
    } = app.config
    const option = new __Option__("option", res => {
        document.body.classList.add("loading")
        app.initialize(res)
    })
    
    // Languages
    const languages = await importDefault("/api/data.LANGUAGES")
    option.addItem({
        name: "lang",
        values: Object.keys(languages),
        callback: (selected, original) => {
            document.documentElement.lang = selected
            console.log("Option: lang -> from", original, "to", selected)
            option.addItem({
                name: "branch",
                values: Object.keys(languages[selected].branch),
                callback:(_selected, _original) => {
                    console.log("Option: branch -> from", _original, "to", _selected)
                }
            })
        },
        defaultValue: DEFAULT_LANGUAGE
    })
    
    // Theme color
    const themeColor = await importDefault("/api/data.THEME_COLOR")
    option.addItem({
        name: "themePrimaryColor",
        values: Object.keys(themeColor.primary),
        callback: (selected, original) => {
            document.body.classList.remove(`mdui-theme-primary-${original}`)
            document.body.classList.add(`mdui-theme-primary-${selected}`)
            document.head.querySelector('meta[name="theme-color"]').content = themeColor.primary[selected]
            console.log("Option: themePrimaryColor -> from", original, "to", selected)
        },
        defaultValue: DEFAULT_THEME_COLOR.primary
    })
    .addItem({
        name: "themeAccentColor",
        values: Object.keys(themeColor.accent),
        callback: (selected, original) => {
            document.body.classList.remove(`mdui-theme-accent-${original}`)
            document.body.classList.add(`mdui-theme-accent-${selected}`)
            console.log("Option: themeAccentColor -> from", original, "to", selected)
        },
        defaultValue: DEFAULT_THEME_COLOR.accent
    })
    
    // Others
    .addItem({
        name: "customURL",
        callback: (selected, original) => {
            document.querySelector("#customURL").value = selected.join("\n")
            console.log("Option: customURL -> from", original, "to", selected)
        },
        handler: value => value.split("\n"),
        defaultValue: []
    })
    .addItem({
        name: "listWithImage",
        values: [ true, false ],
        callback: (selected, original) => {
            console.log("Option: listWithImage -> from", original, "to", selected)
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
            console.log("Option: liteModel -> from", original, "to", selected)
            if (selected) {
                document.body.classList.add("lite")
                window._LITE_MODELL = selected
            }
        },
        defaultValue: false
    })
    
    // Listeners
    app.config.onInput.push(() => {
        option._getItem("inputing").select(app.config.$input.value, true)
        option.setStorage()
    })
    
    return option
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
