import { objectGet, importDefault } from "../src/browser/js/_core/util/common.js"
import { stringify } from "../src/browser/js/_core/util/betterJSON.js"
import GLOBAL_DATA from "../src/data.js"
import express from "express"

const api = express.Router()

api.get("/processEnv.:name", (req, res) => {
    const result = process.env[req.params.name]
    if (result) res.status(200).type(".js").send("export default " + stringify(result))
    else res.status(404).end()
})
api.get("/mcbelist.:lang.:branch", (req, res) => {
    const lang = req.params.lang
    const branch = req.params.branch
    /*
       TODO
       等 `mcbelist-api` 项目基本写完，
       会直接调用该项目的 api
     */
    Promise.all([
        import(`../src/data/${lang}/${branch}/index.js`),
        import(`../src/languages/${lang}.json.js`)
    ]).then(([{default: data}, {default: text}]) => {
        Object.assign(data.text, text)
        res.status(200).type(".js").send("export default " + stringify(data))
    }).catch(err => {
        console.warn("Could not find content by incoming language and branch, sending `{}` with 404.")
        res.status(404).type(".js").send("export default {}")
    })
})

export default api
