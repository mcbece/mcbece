import { each, asyncEach, importDefault, objectHas } from "@util/index.js"
import { ListData, List } from "../../lib/ListData.class.js"
import { Grammar } from "../../lib/GrammarData.class.js"

export async function setCustom(urlsInput) {
    const _custom = this.config.get("data.custom")
    if (_custom) await asyncEach(_custom, async item => {
        if (item) setFrom.call(this, await _get(item))
    })
    if (urlsInput) await asyncEach(urlsInput, async url => {
        if (url) setFrom.call(this, await _get(url))
    })
}

function setFrom(data) {
    const { data: appData, LANG, BRANCH } = this
    const DEFAULT_LANGUAGE = this.config.get("DEFAULT_LANGUAGE", "langDef")
    if (objectHas(data, LANG) && objectHas(data[LANG], BRANCH)) parse(LANG, data[LANG][BRANCH] || {})
    if (LANG !== DEFAULT_LANGUAGE && objectHas(data, DEFAULT_LANGUAGE) && objectHas(data[DEFAULT_LANGUAGE], BRANCH)) parse(DEFAULT_LANGUAGE, data[DEFAULT_LANGUAGE][BRANCH] || {})
    
    function parse(lang, _data) {
        if (_data.list) parseList(_data.list)
        if (_data.grammar) parseGrammar(_data.grammar)
        if (_data.text) parseList(_data.text)
        
        function parseList(_list) {
            each(_list, (list, indexName) => {
                const appDataList = appData[lang].list
                if (appDataList.has(indexName)) appDataList.get(indexName).addItem(...list)
                else appDataList.set(indexName, list)
            })
        }
        function parseGrammar(_grammar) {
            each(_grammar, grammar => appData[lang].grammar.add(new Grammar(grammar)))
        }
        function parseText(_text) {
            each(_text, (key, value) => appData[lang].text.set(key, value))
        }
    }
}

async function _get(sth) {
    if (typeof sth === "function") return sth()
    else if (typeof sth === "string") return await importDefault(sth)
    else if (typeof sth === "object" && sth.type && sth.url) {
        if (sth.type === "esm") return await importDefault(sth.url)
        else if (sth.type === "json") return await (await fetch(sth.url)).json()
    } else return sth
}
