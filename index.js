import "@/src/core.js"
import gui from "@/src/gui/index.js"
import { isChrome } from "@/util/browser.js"

window.app = {
    gui,
    core: window.core
}

if (isChrome()) mdui.confirm(
    "建议使用 Google Chrome 浏览器以获得更好的体验",
    () => window.open("https://www.google.com/chrome/", "_blank"),
    () => {},
    {
        confirmText: "download"
    }
)
