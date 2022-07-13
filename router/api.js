import express from "express"
import { objectGet, importDefault } from "../src/browser/js/core/util/common.js"
import { stringify } from "../src/browser/js/core/util/betterJSON.js"
import { mcbelist } from "../src/mcbelist.js"

const api = express.Router()

api.get("/processEnv.:name", (req, res) => {
    const result = process.env[req.params.name]
    if (result) res.status(200).type(".js").send("export default " + stringify(result))
    else res.status(404).end()
})
api.get("/mcbelist.:lang.:branch.min.js", (req, res) => {
    mcbelist(req.params.lang, req.params.branch).then(data => {
        res.status(200)
            .set("Access-Control-Allow-Origin", "*")
            .type(".js")
            .send("export default " + data)
    }).catch(err => {
        console.warn("Could not find content by incoming language and branch, sending `{}` with 404.")
        res.status(404)
            .set("Access-Control-Allow-Origin", "*")
            .type(".js")
            .send("export default {}")
    })
})

export default api
