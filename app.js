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
app.use(express.static(__dirname + "/node_modules"))

let availableLanguages = {
    zh: "中文（简体）",
    en: "English"
}

app.get("/", (req, res) => {
    res.redirect("/zh")
})
Object.keys(availableLanguages).forEach(lang => {
    app.get(`/${lang}`, (req, res) => {
        res.render("index", {
            availableLanguages,
            lang
        })
    })
})

const server = app.listen(8080, () => {
    console.log("Web server at 127.0.0.1:8080")
})