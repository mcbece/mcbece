import serialize from "serialize-javascript"
import { asyncEach } from "./browser/js/core/util/common.js"

export async function mcbelist(lang, branch) {
    /*
       TODO
       等 `mcbelist-api` 项目基本写完，
       会直接调用该项目的 api
     */
    if (lang && branch) {
        const data = await importDefault(`./data/${lang}/${branch}/index.js`)
        const text = await importDefault(`./languages/${lang}.json.js`)
        Object.assign(data.text, text)
        return serialize(data)
    }
}

// 因为相对链接的问题，不能直接引用 common.js 里的 importDefault，所以这里再写一遍，以后再改（大概吧
async function importDefault(url) {
    try {
        const data = await import(url)
        return data.default
    } catch (err) {
        throw err
    }
}
