import "./app.js"
import page from "./src/page/index.js"
import { testRegExp } from "./_core/util/common.js"

window._page = page

if (testRegExp("!/Chrome/", navigator.userAgent)) mdui.confirm(
    "建议使用 Google Chrome 浏览器以获得更好的体验",
    () => window.open("https://www.google.com/chrome/", "_blank"),
    () => {},
    {
        confirmText: "download"
    }
)
