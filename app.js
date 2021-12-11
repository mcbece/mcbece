const process = require("process")
const express = require("express")
const logger = require("morgan")
const cookieParser = require("cookie-parser")
const app = express()

app.set("view engine", "ejs")
app.set("views", __dirname + "/views")

app.use(logger("dev"))
app.use(express.json())
app.use(cookieParser())
app.use(express.static(__dirname + "/public"))

let USE_CDN = false
if (process.argv.includes("--use-cdn")) USE_CDN = true
else app.use(express.static(__dirname + "/node_modules"))

let MOBILE_DEV_MODEL = false
if (process.argv.includes("--mobile-dev")) MOBILE_DEV_MODEL = true

let AVAILABLE_LANGUAGES = {
    zh: "中文（简体）",
    en: "English"
}

app.get("/", (req, res) => {
    res.redirect("/zh")
})
Object.keys(AVAILABLE_LANGUAGES).forEach(LANG => {
    app.get(`/${LANG}`, (req, res) => {
        res.render("index", {
            USE_CDN,
            MOBILE_DEV_MODEL, 
            AVAILABLE_LANGUAGES,
            LANG
        })
    })
})

const server = app.listen(8080, () => {
    console.log("====================\nWeb server is running at 127.0.0.1:8080\n====================")
})