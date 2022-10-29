import { setThemeColor, setDarkMode } from "@/util/mdui.js"
import { THEME_COLOR } from "@/src/data.js"

const darkScheme = window.matchMedia("(prefers-color-scheme: dark)")
const darkModeListener = queryList => {
    setDarkMode(queryList.matches)
}

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
    .addItem({
        name: "darkMode",
        description: "深色模式",
        values: [ ["auto", "自动检测"], [true], [false] ],
        callback: (selected, original) => {
            if (selected === "auto") {
                darkScheme.addListener(darkModeListener)
                darkModeListener(darkScheme)
            } else {
                darkScheme.removeListener(darkModeListener)
                setDarkMode(selected)
            }
        },
        defaultValue: "auto"
    })
    
    // Lite Mode
    .addItem({
        name: "liteMode",
        description: "简洁模式（手机用户建议开启）",
        values: [ [true], [false] ],
        callback: (selected, original) => {
            console.debug("Option: liteMode -> from", original, "to", selected)
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
