const express = require("express")
const markdown = require("../src/markdown.js")
const app = express.Router()

app.get("/", (req, res) => {
    res.redirect(307, `${req.baseUrl}/readme`)
})
app.get("/readme", (req, res) => {
    markdown("./README.md", html => res.render("docs", {
        title: "REAFME.md",
        body: html
    }))
})

module.exports = app