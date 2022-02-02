import { WebOption } from "./lib/WebOption.class.js"
import { importDefault } from "./core/util/common.js"

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
    values(key) {
        return [...this._getItem(key).values]
    }
}

export default async function (app) {
    const {
        DEFAULT_LANGUAGE,
        DEFAULT_THEME_COLOR
    } = app.config
    const option = new __Option__("option", res => {
        app.clear()
        document.body.classList.add("loading")
        app.initialize(res)
    })
    
    // Languages
    const languages = await importDefault("/api/data.LANGUAGES")
    option.addItem("lang", Object.keys(languages), (selected, original) => {
        app.LANG = selected
        document.documentElement.lang = selected
        console.log("lang -> from", original, "to", selected)
        option.addItem("branch", Object.keys(languages[selected].branch), (_selected, _original) => {
            app.BRANCH = selected
            console.log("branch -> from", _original, "to", _selected)
        })
    }, DEFAULT_LANGUAGE)
    
    // Theme color
    const themeColor = await importDefault("/api/data.THEME_COLOR")
    option.addItem("themePrimaryColor", Object.keys(themeColor.primary), (selected, original) => {
        document.body.classList.remove(`mdui-theme-primary-${original}`)
        document.body.classList.add(`mdui-theme-primary-${selected}`)
        document.head.querySelector('meta[name="theme-color"]').content = themeColor.primary[selected]
        console.log("themePrimaryColor -> from", original, "to", selected)
    }, DEFAULT_THEME_COLOR.primary)
    .addItem("themeAccentColor", Object.keys(themeColor.accent), (selected, original) => {
        document.body.classList.remove(`mdui-theme-accent-${original}`)
        document.body.classList.add(`mdui-theme-accent-${selected}`)
        console.log("themeAccentColor -> from", original, "to", selected)
    }, DEFAULT_THEME_COLOR.accent)
    
    // Others
    .addItem("customURL", [], (selected, original) => {
        document.querySelector("#customURL").value = selected
        console.log("customURL -> from", original, "to", selected)
    }, document.querySelector("#customURL").value || "/js/custom.example.js")
    .addItem("listWithImage", [true, false], (selected, original) => {
        app.list.withImage = selected
        console.log("listWithImage -> from", original, "to", selected)
    })
    
    return option
}