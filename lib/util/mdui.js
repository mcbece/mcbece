import { THEME_COLOR } from "@/src/data.js"
import { festivals } from "./date.js"

export function snackbar(message, option) {
    return mdui.snackbar({
        message,
        position: window._LITE_MODE ? "bottom" : "left-top",
        timeout: 2000,
        ...option
    })
}

export async function confirm({ message, onConfirm = () => {}, onCancel = () => {}, ...option}) {
    return new Promise((resolve, reject) => {
        mdui.confirm(
            message,
            () => resolve([
                true,
                onConfirm()
            ]),
            () => resolve([
                false,
                onCancel()
            ]),
            option
        )
    })
}

export function dialog(option) {
    const dialog = mdui.dialog(option)
    dialog.$content = dialog.$element[0].querySelector(".mdui-dialog-content")
    return dialog
}

export function setThemeColor({ primary, accent }) {
    if (primary) {
        document.body.classList.remove(`mdui-theme-primary-${primary[0]}`)
        document.body.classList.add(`mdui-theme-primary-${primary[1]}`)
        document.head.querySelector('meta[name="theme-color"]').content = THEME_COLOR.primary[primary[1]]
    }
    if (accent) {
        document.body.classList.remove(`mdui-theme-accent-${accent[0]}`)
        document.body.classList.add(`mdui-theme-accent-${accent[1]}`)
    }
}

export function setDarkMode(bool) {
    if (bool) document.body.classList.add("mdui-theme-layout-dark")
    else document.body.classList.remove("mdui-theme-layout-dark")
    window._DARK_MODE = bool
}

export function setFestivalTheme(option) {
    if (festivals.AprilFools) {
        setThemeColor({
            primary: [option._getItem("themePrimaryColor").selected, "green"],
            accent: [option._getItem("themeAccentColor").selected, "red"]
        })
        snackbar("Happy April Fools!")
        return true
    }
    if (festivals.Halloween) {
        setThemeColor({
            primary: [option._getItem("themePrimaryColor").selected, "deep-orange"],
            accent: [option._getItem("themeAccentColor").selected, "deep-orange"]
        })
        setDarkMode(true)
        snackbar("Happy Halloween!")
        return true
    }
}
