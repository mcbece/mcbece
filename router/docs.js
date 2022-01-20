const express = require("express")
const axios = require("axios")
const fs = require("fs")
const app = express.Router()

app.get("/", (req, res) => {
    res.redirect(307, `${req.baseUrl}/readme`)
})
app.get("/readme", (req, res) => {
    let readme = fs.readFileSync("./README.md").toString()
    axios.post("https://api.github.com/markdown", {
        text: readme
    }).then(({ data }) => res.render("docs", {
        title: "REAFME.md",
        body: data
    })).catch(console.error)
})

module.exports = app