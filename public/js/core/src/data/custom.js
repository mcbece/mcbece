import { each, eachAsync, importDefault, objectHas } from "../../util/common.js"
import { ListData, List } from "../../lib/ListData.class.js"
import { Grammar } from "../../lib/GrammarData.class.js"

export async function setCustom(urlsInput) {
    const _custom = this.config.data.custom
    if (_custom) await eachAsync(_custom, async item => {
        if (item) setFrom.call(this, await _get(item))
    })
    if (urlsInput) await eachAsync(urlsInput, async url => {
        if (url) setFrom.call(this, await _get(url))
    })
}

function setFrom(data) {
    const { data: appData, LANG, BRANCH, config: { DEFAULT_LANGUAGE } } = this
    if (objectHas(data, LANG) && objectHas(data[LANG], BRANCH)) parse(LANG, data[LANG][BRANCH] || {})
    if (LANG !== DEFAULT_LANGUAGE && objectHas(data, DEFAULT_LANGUAGE) && objectHas(data[DEFAULT_LANGUAGE], BRANCH)) parse(DEFAULT_LANGUAGE, data[DEFAULT_LANGUAGE][BRANCH] || {})
    function parse(lang, _data) {
        if (_data.list) parseList(_data.list)
        if (_data.grammar) parseGrammar(_data.grammar)
        if (_data.text) parseList(_data.text)
        
        function parseList(_list) {
            each(_list, (key, value) => {
                if (key === "__new") {
                    const newLists = new ListData(value)
                    each(newLists._data, (name, list) => {
                        if (list instanceof List) appData[lang].list.set(name, list)
                        // else {
                        //     新增列表暂时只支持一级索引，
                        //     其他将会忽略
                        // }
                    })
                } else appData[lang].list.get(key).addItem(...value)
            })
        }
        function parseGrammar(_grammar) {
            each(_grammar, (key, value) => {
                if (key === "__new") each(value, grammar => appData[lang].grammar.add(new Grammar(grammar)))
                // else {
                //    目前只支持新增语法，不能修改既有的内容
                // }
            })
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