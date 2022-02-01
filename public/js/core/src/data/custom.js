import { each, eachAsync, importDefault } from "../../util/common.js"
import { ListData, List } from "../../lib/ListData.class.js"
import { Grammar } from "../../lib/GrammarData.class.js"

export async function setCustom(url) {
    const { urls, data: dataFun } = this.config.data.custom
    if (url) handle.call(this, await importDefault(url))
    if (urls) await eachAsync(urls, async _url => handle.call(this, await importDefault(_url)))
    if (dataFun) handle.call(this, dataFun())
}

function handle(data) {
    const { data: appData, LANG, config: { DEFAULT_LANGUAGE } } = this
    if (data[LANG]) parseAll(LANG, data[LANG])
    if (LANG !== DEFAULT_LANGUAGE && data[DEFAULT_LANGUAGE]) parseAll(DEFAULT_LANGUAGE, data[DEFAULT_LANGUAGE])
    
    function parseAll(lang, _data) {
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