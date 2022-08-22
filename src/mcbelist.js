import serialize from "serialize-javascript"
import { importDefault } from "../lib/util/index.js"
import { resolvePath } from "./util.js"

export async function getMcbelist(lang, branch) {
    /*
       TODO
       等 `mcbelist-api` 项目基本写完，
       会直接调用该项目的 api
     */
    if (lang && branch) {
        const data = await importDefault(resolvePath(`./data/${lang}/${branch}/index.js`, import.meta))
        const text = await importDefault(resolvePath(`./languages/${lang}.json.js`, import.meta))
        Object.assign(data.text, text)
        return serialize(data)
    }
}
