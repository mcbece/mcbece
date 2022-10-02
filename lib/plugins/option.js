import { setThemeColor } from "@/util/mdui.js"
import { THEME_COLOR } from "@/src/data.js"

export default async function(app, option) {
    return option
    
    // Theme Color
    .addItem({
        name: "themePrimaryColor",
        description: "主题色 - 主色",
        values: Object.entries(THEME_COLOR.primary),
        callback: (selected, original) => {
            setThemeColor({ primary: [original, selected] })
            console.debug("Option: themePrimaryColor -> from", original, "to", selected)
        },
        defaultValue: THEME_COLOR.DEFAULT.primary
    })
    .addItem({
        name: "themeAccentColor",
        description: "主题色 - 强调色",
        values: Object.entries(THEME_COLOR.accent),
        callback: (selected, original) => {
            setThemeColor({ accent: [original, selected] })
            console.debug("Option: themeAccentColor -> from", original, "to", selected)
        },
        defaultValue: THEME_COLOR.DEFAULT.accent
    })
    
    // Lite Model
    .addItem({
        name: "liteModel",
        description: "简洁模式（手机用户建议开启）",
        values: [ [true, "开启"], [false] ],
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
            console.debug("Option: customURL -> from", original, "to", selected)
            document.querySelector("#customURL").value = selected.join("\n")
        },
        // handler: value => value.split("\n"),
        defaultValue: []
    })
}
