import { replaceString, importDefault } from "@/util/index.js"
import { ListData } from "../../lib/ListData.class.js"
import { GrammarData } from "../../lib/GrammarData.class.js"
import { TextData } from "../../lib/TextData.class.js"

export const importData = core => async function() {
    const { lang, branch } = this
    const url = core.config.get("data.url")
    if (url) {
        try {
            const data = await importDefault(replaceString(url, { lang, branch }))
            this._data[lang] = {
                list: new ListData(data.list),
                grammar: new GrammarData(data.grammar),
                text: new TextData(data.text)
            }
        } catch (err) {
            this._data[lang] = {
                list: new ListData(),
                grammar: new GrammarData(),
                text: new TextData()
            }
        }
    }
}
