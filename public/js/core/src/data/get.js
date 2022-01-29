import { each, replaceString, importDefault } from "../../util/common.js"
import { ListData } from "../../lib/ListData.class.js"
import { GrammarData } from "../../lib/GrammarData.class.js"
import { TextData } from "../../lib/TextData.class.js"

export async function getFromURL(url, lang, branch) {
    const data = parse(await importDefault(replaceString(url, {lang, branch})))
    this.data[lang] = {
        list: new ListData(data.list),
        grammar: new GrammarData(data.grammar),
        text: new TextData(data.text)
    }
    if (lang !== this.config.DEFAULT_LANGUAGE) {
        const dataDef = await getData(replaceString(url, { lang: this.config.DEFAULT_LANGUAGE, branch }))
        this.data[this.config.DEFAULT_LANGUAGE] = {
            list: new ListData(dataDef.list),
            grammar: new GrammarData(dataDef.grammar),
            text: new TextData(dataDef.text)
        }
    }
}

function parse(target) {
    if (Array.isArray(target)) return target.map(e => parse(e))
    else if (typeof target === "object") {
        const output = {}
        each(target, (key, value) => output[key] = parse(value))
        return output
    } else if (typeof target === "string" && target.startsWith("@function")) return eval(target.replace(/^@function /, ""))
    else return target
}