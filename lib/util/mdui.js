import { festivals } from "./date.js"

export const THEME_COLOR = {
    DEFAULT: {
        primary: "indigo",
        accent: "pink"
    },
    primary: {
        "red": "#F44336",
        "pink": "#E91E63",
        "purple": "#9C27B0",
        "deep-purple": "#673AB7",
        "indigo": "#3F51B5",
        "blue": "#2196F3",
        "light-blue": "#03A9F4",
        "cyan": "#00BCD4",
        "teal": "#009688",
        "green": "#4CAF50",
        "light-green": "#8BC34A",
        "lime": "#CDDC39",
        "yellow": "#FFEB3B",
        "amber": "#FFC107",
        "orange": "#FF9800",
        "deep-orange": "#FF5722",
        "brown": "#795548",
        "grey": "#9E9E9E",
        "blue-grey": "#607D8B"
    },
    accent: {
        "red": "#FF5252",
        "pink": "#FF4081",
        "purple": "#E040FB",
        "deep-purple": "#7C4DFF",
        "indigo": "#536DFE",
        "blue": "#448AFF",
        "light-blue": "#40C4FF",
        "cyan": "#18FFFF",
        "teal": "#64FFDA",
        "green": "#69F0AE",
        "light-green": "#B2FF59",
        "lime": "#EEFF41",
        "yellow": "#FFFF00",
        "amber": "#FFD740",
        "orange": "#FFAB40",
        "deep-orange": "#FF6E40"
    }
}

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
    } else if (festivals.Halloween) {
        setThemeColor({
            primary: [option._getItem("themePrimaryColor").selected, "deep-orange"],
            accent: [option._getItem("themeAccentColor").selected, "deep-orange"]
        })
        setDarkMode(true)
    }
}
