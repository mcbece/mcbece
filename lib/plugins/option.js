import { setThemeColor, setDarkMode, snackbar, setFestivalTheme } from "@/util/mdui.js"
import { setLiteMode, setBodyPaddingTop } from "@/util/page.js"
import { festivals } from "@/util/date.js"
import { THEME_COLOR } from "@/src/data.js"

const darkScheme = window.matchMedia("(prefers-color-scheme: dark)")
const darkModeListener = queryList => setDarkMode(queryList.matches)

const maxWidth = window.matchMedia("(max-width: 1023.9px)")
const liteModeListener = queryList => setLiteMode(queryList.matches)

export default async function(app, option) {
    return option
    
    // Theme Color
    .addItem({
        name: "themePrimaryColor",
        description: "主题色 - 主色",
        values: Object.entries(THEME_COLOR.primary),
        defaultValue: THEME_COLOR.DEFAULT.primary,
        callback: (selected, original) => {
            setThemeColor({ primary: [original, selected] })
            console.debug("Option: themePrimaryColor -> from", original, "to", selected)
        },
        interceptor: () => setFestivalTheme(option)
    })
    .addItem({
        name: "themeAccentColor",
        description: "主题色 - 强调色",
        values: Object.entries(THEME_COLOR.accent),
        defaultValue: THEME_COLOR.DEFAULT.accent,
        callback: (selected, original) => {
            setThemeColor({ accent: [original, selected] })
            console.debug("Option: themeAccentColor -> from", original, "to", selected)
        },
        interceptor: () => setFestivalTheme(option)
    })
    
    // Dark Mode
    .addItem({
        name: "darkMode",
        description: "深色模式",
        values: [ ["auto", "自动检测（prefers-color-scheme: dark）"], [true], [false] ],
        defaultValue: "auto",
        callback: (selected, original) => {
            console.debug("Option: darkMode -> from", original, "to", selected)
            if (selected === "auto") {
                darkScheme.addListener(darkModeListener)
                darkModeListener(darkScheme)
            } else {
                darkScheme.removeListener(darkModeListener)
                setDarkMode(selected)
            }
        }
    })
    
    // Lite Mode
    .addItem({
        name: "liteMode",
        description: "简洁模式（手机用户建议开启）",
        values: [ ["auto", "自动检测（max-width: 1023.9px）"], [true], [false] ],
        defaultValue: "auto",
        callback: (selected, original) => {
            console.debug("Option: liteMode -> from", original, "to", selected)
            if (selected === "auto") {
                maxWidth.addListener(liteModeListener)
                liteModeListener(maxWidth)
            } else {
                maxWidth.removeListener(liteModeListener)
                setLiteMode(selected)
            }
        }
    })
    
    // Others
    .addItem({
        name: "customURL",
        defaultValue: [],
        callback: (selected, original) => {
            console.debug("Option: customURL -> from", original, "to", selected)
            document.querySelector("#customURL").value = selected.join("\n")
        },
        // handler: value => value.split("\n")
    })
}
