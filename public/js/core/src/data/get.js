import { each, mapObject, replaceString, importDefault, objectGet } from "../../util/common.js"
import { parse } from "../../util/JSONWithFun.js"
import { ListData } from "../../lib/ListData.class.js"
import { GrammarData } from "../../lib/GrammarData.class.js"
import { TextData } from "../../lib/TextData.class.js"

export async function getFromURL(url) {
    const { LANG: lang, BRANCH: branch } = this
    const data = parse(await importDefault(replaceString(url, {lang, branch})))
    this.data[lang] = {
        list: new ListData(data.list),
        grammar: new GrammarData(data.grammar),
        text: new TextData(data.text)
    }
    const DEFAULT_LANGUAGE = objectGet(this.config, "DEFAULT_LANGUAGE", "langDef")
    if (lang !== DEFAULT_LANGUAGE) {
        const dataDef = await getData(replaceString(url, { lang: DEFAULT_LANGUAGE, branch }))
        this.data[DEFAULT_LANGUAGE] = {
            list: new ListData(dataDef.list),
            grammar: new GrammarData(dataDef.grammar),
            text: new TextData(dataDef.text)
        }
    }
}
