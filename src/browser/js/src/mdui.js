import { THEME_COLOR } from "../../../data.js"

export function snackbar(message, option) {
    mdui.snackbar({
        message,
        position: window._LITE_MODELL ? "bottom" : "left-top",
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
