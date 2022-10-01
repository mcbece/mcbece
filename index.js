import App from "@/core/index.js"
import appConfig from "./app.config.js"
import page from "@/src/page/index.js"
import { isChrome } from "@/util/browser.js"

window.app = new App(appConfig)
window._page = page

if (isChrome()) mdui.confirm(
    "建议使用 Google Chrome 浏览器以获得更好的体验",
    () => window.open("https://www.google.com/chrome/", "_blank"),
    () => {},
    {
        confirmText: "download"
    }
)
