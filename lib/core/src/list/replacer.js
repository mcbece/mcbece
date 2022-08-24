/*
 * TODO
 * {\s*(This:|Header:|Global:|Ignore:)?(.+)(\|(.+))?\s*} 即 { <namespace>:<thing>[|<returnedThingIfNotFound>] }
 *     会被替换为该列表项中的对应内容**的字符串形式**
 *     若在该列表项中没有找到，则使用列表头中的对应内容
 *     若也没有，则会在 app.data.global 中查找并替换
 *     否则会输出为 "" (空字符串)
 *     namespace 为:
 *       - This 强制匹配该列表项中的内容
 *       - Header 强制匹配列表头中的内容
 *       - Global 强制匹配全局内容
 *       - Ignore 忽略
 */

import { replaceString, getReturn, objectGet } from "@util/index.js"

export class ListItemReplacer {
    constructor(app) {
        this.names = this.list.names
        this.getGlobalData = () => {
            return app.data.get("text", name)
        }
    }
    setListItem(listItem) {
        this.listItem = listItem
        this.listHeader = this.names[listItem.__listName]
        return this
    }
    getThisData(name) {
        return objectGet(this.listItem, name)
    }
    getHeaderData(name) {
        return objectGet(this.listHeader, name)
    }
    get(name) {
        
    }
    raw(name) {
        
    }
}

const config = [
    {
        namespace: "This:",
        directReturn(name, replacer) {
            
        },
        indirectReturn(name) {
            
        }
    }
]