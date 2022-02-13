import express from "express"
import markdown from "../src/markdown.js"

const docs = express.Router()

docs.get("/", (req, res) => {
    res.redirect(307, `${req.baseUrl}/readme`)
})
docs.get("/readme", (req, res) => {
    markdown("./README.md", html => res.render("docs.pug", {
        title: "REAFME.md",
        body: html
    }))
})

export default docs
