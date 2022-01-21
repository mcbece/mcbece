const express = require("express")
const app = express()

// Routers
const docsRouter = require("./router/docs.js")
app.use("/docs", docsRouter)

// Settings
app.set("view engine", "ejs")
app.set("views", __dirname + "/views")

// Middlewares
const logger = require("morgan")
app.use(logger("dev"))
app.use(express.static(__dirname + "/public"))

// Params
let USE_CDN = false
if (process.argv.includes("--use-cdn")) USE_CDN = true
else app.use(express.static(__dirname + "/node_modules"))

let MOBILE_DEV_MODEL = false
if (process.argv.includes("--mobile-dev")) MOBILE_DEV_MODEL = true

const AVAILABLE_LANGUAGES = {
    "zh-CN": "中文（简体）",
    "en": "English"
}

const BRANCHS = {
    "vanilla": "原版",
    "experiment": "实验性玩法",
    "education": "教育版"
}

const THEME_COLOR = {
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

// SASS -> CSS
const sass = require("sass")
app.get("/css/index.css", (req, res) => {
    sass.compileAsync("./src/scss/index.scss", {
        style: "compressed"
    }).then(({ css }) => {
        res.type("css")
        res.send(css)
    }).catch(console.error)
})

// Main
app.get("/", (req, res) => {
    res.render("index", {
        USE_CDN,
        MOBILE_DEV_MODEL,
        AVAILABLE_LANGUAGES,
        THEME_COLOR,
        BRANCHS,
    })
})

// APIs
app.get("/api/theme.color.:color", (req, res) => {
    let color = req.params.color
    res.type(".txt")
    res.status(200).send(THEME_COLOR.primary[color])
})
app.get("/api/mcbelist.:lang.:branch", (req, res) => {
    let lang = req.params.lang
    let branch = req.params.branch
    /*
       TODO
       等 `mcbelist-api` 项目基本写完，
       会直接调用该项目的 api
     */
    try {
        let data = require(`./src/data/${lang}/${branch}/index.js`)
        let text = require(`./src/languages/${lang}.json`)
        Object.assign(data.text, text)
        res.status(200).send(data)
    } catch (err) {
        res.status(404).send({})
        console.log(err)
    }
})

// 404 Not Found
app.use((req, res) => {
    res.status(404).send("Page not found!")
})

// Create server
app.listen(8080, () => {
    console.log("====================\nWeb server is running at 127.0.0.1:8080\n====================")
})