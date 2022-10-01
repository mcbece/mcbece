import { replaceString, importDefault } from "@/util/index.js"
import { ListData } from "../../lib/ListData.class.js"
import { GrammarData } from "../../lib/GrammarData.class.js"
import { TextData } from "../../lib/TextData.class.js"

export const importData = app => async function(url) {
    const { LANG: lang, BRANCH: branch } = app
    const data = await importDefault(replaceString(url, { lang, branch }))
    this[lang] = {
        list: new ListData(data.list),
        grammar: new GrammarData(data.grammar),
        text: new TextData(data.text)
    }
    const DEFAULT_LANGUAGE = app.config.get("DEFAULT_LANGUAGE", "langDef")
    if (lang !== DEFAULT_LANGUAGE) {
        const dataDef = await importDefault(replaceString(url, { lang: DEFAULT_LANGUAGE, branch }))
        this[DEFAULT_LANGUAGE] = {
            list: new ListData(dataDef.list),
            grammar: new GrammarData(dataDef.grammar),
            text: new TextData(dataDef.text)
        }
    }
}
