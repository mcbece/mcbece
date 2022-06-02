import "./app.js"
import page from "./src/page/index.js"
import { isChrome } from "./src/util.js"

window._page = page

if (isChrome()) mdui.confirm(
    "建议使用 Google Chrome 浏览器以获得更好的体验",
    () => window.open("https://www.google.com/chrome/", "_blank"),
    () => {},
    {
        confirmText: "download"
    }
)
