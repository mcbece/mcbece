const express = require("express")
const markdown = require("../src/markdown.js")
const { lib } = require("../src/util.js")
const app = express.Router()

app.get("/", (req, res) => {
    res.redirect(307, `${req.baseUrl}/readme`)
})
app.get("/readme", (req, res) => {
    markdown("./README.md", html => res.render("docs.pug", {lib,
        title: "REAFME.md",
        body: html
    }))
})

module.exports = app