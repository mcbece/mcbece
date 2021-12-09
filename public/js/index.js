const inputEle = document.querySelector('#edit')
const grammarEle = document.querySelector("#grammar")
const noteEle = document.querySelector("#note")
const listEle = document.querySelector("#list")

let customJson

String.prototype.isCoordinate = function (model) {
    let matchRegex = /^[-~^.0-9]+/
    let testRegex = /^(~|\^)?(-?[.0-9])*$/
    if (model === `test`) {
        return testRegex.test(this)
    } else {
        return matchRegex.test(this)
    }
}

String.prototype.isSelector = function (model) {
    let matchRegex = /(^@[a-z]?(\[[-~^=,\.\w]*\]?)?|[\w]+)/
    let testRegex = /^(@[a-z])?(\[[-~^=,\.\w]*\])?$/
    if (model === `test`) {
        return testRegex.test(this)
    } else {
        return matchRegex.test(this)
    }
}

Object.prototype.forEach = function (callback) {
    Object.keys(JSON.parse(JSON.stringify(this))).forEach(key => {
        let value = this[key]
        callback(key, value)
    })
}

const page = {
    json: {
        getList(name, _return,  lang = LANG) {
            try {
                let result = eval(`page.json.${lang}.list.${name}`)
                return result === undefined ? _return : result
            } catch (err) {
                if (lang !== "zh") return this.getList(name, _return, "zh")
                return _return
            }
        },
        getGrammar(name, lang = LANG) {
            try {
                return page.json[LANG].grammar.find(item => {
                    return eval(`${item[0].command.name}.test(name)`)
                })
            } catch (err) {
                if (lang !== "zh") return this.getGrammar(name, "zh")
                return undefined
            }
        },
        getGlobal(name, lang = LANG) {
            try {
                let result = eval(`page.json.${lang}.text.${name}`)
                return result === undefined ? "" : result
            } catch (err) {
                if (lang !== "zh") return this.getGlobal(name, "zh")
                return ""
            }
        }
    },
    initialization() {
        inputEle.placeholder = page.json.getGlobal("inputText")
        if (screen.height < 800) {
            document.body.classList.add("thin-model")
            document.querySelectorAll(".mdui-dialog").forEach(ele => {
                ele.classList.add("mdui-dialog-full-screen")
            })
            page.thin_model = true
        }
        if (LANG === "en") grammarEle.classList.add("minecraft-font")
        page.custom.setURLFromStorage()
        inputEle.oninput = () => {
            page.change()
            page.list.search()
        }
        this.change()
    },
    change() {
        document.querySelector("#wiki").href = page.json.getGlobal("url.command_page") + inputEle.value.split(" ")[0]  // FIXME
        page.editEnd = false
        page.input.copy("display")
        if (inputEle.value.split(" ").length === 1) {
            page.list.load("command")
            grammarEle.innerHTML = ""
            noteEle.innerHTML = page.json.getGlobal("beginText")
            return
        }
        let result = this.grammar.load()
        if (result.finish) {
            listEle.innerHTML = ""
            grammarEle.innerHTML = ""
            noteEle.innerHTML = page.json.getGlobal("endText")
            page.editEnd = true
            page.list.name = []
            page.input.copy("display")
        } else if (result.undefined) {
            listEle.innerHTML = ""
            page.list.name = []
            noteEle.innerHTML = "未知的命令"
            console.warn(`您需要在 page.json.${LANG}.grammar 中添加该命令的语法`)
        }
        else this.list.load(result.list)
    },
    input: {
        input(text, replace) {
            if (replace === "all") inputEle.value = ""
            else if (replace === "the_latest_selector_variable") {
                let selector_variable = inputEle.value.split("[")[inputEle.value.split("[").length - 1]
                if (/,/.test(selector_variable)) inputEle.value = inputEle.value.split(",", inputEle.value.split(",").length - 1).join(",") + ","
                else inputEle.value = inputEle.value.split("[", inputEle.value.split("[").length - 1).join("[") + "["
            } else if (replace !== "none") {
                if (inputEle.value.split(" ").length === 1 && page.list.name.length === 1 && page.list.name.includes("command")) inputEle.value = "/"
                else {
                    let value = inputEle.value.split(" ")
                    value.pop()
                    if (inputEle.value === "") inputEle.value = value.join(" ")
                    else inputEle.value = value.join(" ") + " "
                }
            }
            inputEle.value += text
        },
        copy(model) {
            if (model === "copy") {
                inputEle.select()
                inputEle.setSelectionRange(0, inputEle.value.length)
                document.execCommand('copy')
                mdui.snackbar({
                    message: "已复制",
                    position: "left-top",
                    timeout: 2000,
                    closeOnOutsideClick: false
                })
            } else if (model === "display") {
                if (page.editEnd === true) {
                    document.querySelector("#wiki").style.display = "none"
                    document.querySelector("#copy").style.display = ""
                } else {
                    document.querySelector("#wiki").style.display = ""
                    document.querySelector("#copy").style.display = "none"
                }
            }
        },
        getCommandName() {
            let commandName = inputEle.value.split(" ")[0]
            if (commandName === "") return undefined
            else return commandName
        },
        getByLength(length) {
            if (length === "the_latest_command_parameter") return inputEle.value.split(" ")[inputEle.value.split(" ").length - 1]
            else if (length === "the_latest_selector_variable") {
                let all = this.getByLength("the_latest_command_parameter").split("[")[1].split(",")
                return all[all.length - 1]
            } else return inputEle.value.split(" ")[length]
        },
        getInputType() {
            /** TODO
             * 判断正在输入的类型
             * return {
             *     type,
             *     keyword
             * }
             */
            let type = [
                    "selector_variable_value_coordinate",
                    "selector_variable_value_coordinate_value",
                    "selector_variable_value_scores",
                    "selector_variable_value_scores_value",
                ]
            let input = inputEle.value
            let latest = this.getByLength("the_latest_command_parameter")
            if (latest.startsWith("@")) {
                let selector = latest
                if (selector.length < 2) return "selector_parameter"
                else if (selector.length === 2) return "selector_next"
                else if (selector.length > 2 && selector.split("")[2] === "[") {
                    let variable_item = selector.split("[")[1].split("]")[0].split(",")[selector.split("[")[1].split("]")[0].split(",").length - 1]
                    let key = variable_item.split("=")[0]
                    let value = variable_item.split("=")[1]
                    if (key !== undefined && key !== "" && value !== undefined && value !== "" && !selector.endsWith("]")) return "selector_variable_next"
                    else if (key !== undefined && key !== "" && value !== undefined && value !== "" && selector.endsWith("]")) return "next"
                    else if (key !== undefined && key !== "" && value === "") {
                        if (key === "coordinate") {
                            // TODO
                        } else if (key === "scores") {
                            // TODO
                        }
                    }
                    else if ((key === "" && value === undefined) || (key !== undefined && key !== "" && value === undefined)) return "selector_variable"
                }
            }
            else if (latest.length >= 1) return "next"
            else return "command_parameter"
        }
    },
    list: {
        name: [],
        //_name: "",
        load(listGroup) {
            let result = this._module.getFromJson(listGroup)
            //console.log({result})
            if (JSON.parse(JSON.stringify(this.name)).sort().toString() !== JSON.parse(JSON.stringify(result.name)).sort().toString()) {
                //this._name = listGroup
                this.name = result.name
                this._module.loadToPage(result.list, list => {
                    listEle.innerHTML = ""
                    this._module.loadByIntersectionObserver(list, listEle)
                })
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "smooth"
                })
                console.log(this.name)
            }
        },
        _module: {
            rename(listName) {
                if (listName === "selector") {
                    let selector = page.input.getByLength("the_latest_command_parameter")
                    if (selector.length < 2) {
                        return "selector.parameter"
                    } else if (selector.length === 2 && selector.startsWith("@")) {
                        return "selector.next; selector.parameter"
                    } else if (selector.length > 2 && selector.split("")[2] === "[") {
                        let variable_item = selector.split("[")[1].split("]")[0].split(",")[selector.split("[")[1].split("]")[0].split(",").length - 1]
                        let key = variable_item.split("=")[0]
                        let value = variable_item.split("=")[1]
                        let index = page.json.getList("selector.variable", [{}]).findIndex(_item => {
                            return _item.name === key
                        })
                        if (key !== undefined && key !== "" && value !== undefined && value !== "" && !selector.endsWith("]")) {
                            
                            // TODO
                            /*if (/^coordinate.(x|y|z)$/.test(page.list.name)) {
                                return `selector.next_variable; coordinate.${key}[0].value`
                            } else {
                                return `selector.next_variable; selector.variable[${index}].value`
                            }*/
                            
                            return "selector.next_variable"
                        } else if (key !== undefined && key !== "" && value !== undefined && value !== "" && selector.endsWith("]")) {
                            return "next"
                        } else if (key !== undefined && key !== "" && value === "") {
                            return `selector.variable[${index}].value`
                        } else if ((key === "" && value === undefined) || (key !== undefined && key !== "" && value === undefined)) {
                            return "selector.variable"
                        }
                    }
                } else if (/^coordinate.(x|y|z)$/.test(listName)) {
                    let coordinate = page.input.getByLength("the_latest_command_parameter")
                    if (coordinate.length < 1) return listName
                    else if (coordinate === "~" || coordinate === "^") return `${listName}[0].value`
                    else return "next"
                } else if (/^rotation.(x|y)$/.test(listName)) {
                    let rotation = page.input.getByLength("the_latest_command_parameter")
                    if (rotation.length < 1) return listName
                    else if (rotation === "~") return `${listName}[0].value`
                    else return "next"
                } else if (listName === "enchantment.level") {
                    let enchantment = page.input.getByLength(inputEle.value.split(" ").length - 2)
                    let index = page.json.getList("enchantment", [{}]).findIndex(_item => {
                        return _item.name === enchantment
                    })
                    if (index !== -1) return `enchantment[${index}].level`
                    else return "enchantment[0].level"
                } else if (listName === "entity.event") {
                    let entity = page.input.getByLength(inputEle.value.split(" ").length - 2)
                    let index = page.json.getList("entity", [{}]).findIndex(_item => {
                        return _item.name === entity
                    })
                    if (index !== -1) return `entity[${index}].event`
                    else return "entity[0].event"
                } else if (listName === "block.data") {
                    let block = page.input.getByLength(inputEle.value.split(" ").length - 2)
                    let index = page.json.getList("block", [{}]).findIndex(_item => {
                        return _item.name === block
                    })
                    if (index !== -1) return `block[${index}].data`
                    else return "block[0].data"
                } else if (listName === "item.data") {
                    let item = page.input.getByLength(inputEle.value.split(" ").length - 2)
                    let index = page.json.getList("item", [{}]).findIndex(_item => {
                        return _item.name === item
                    })
                    if (index !== -1) return `item[${index}].data`
                    else return "item[0].data"
                } else return listName
            },
            getFromJson(listGroup) {
                if (listGroup === undefined) return {}
                listGroup = [...new Set(listGroup.replace(/(\s)?;(\s)?/g, ";").split(";"))]
                let allList = []
                let allName = []
                let extend = {
                    list: [],
                    name: []
                }
                for (let i = 0; i < listGroup.length; i++) {
                    let part = listGroup[i].match(/(^[.a-z\[\]0-9_]+)({.*}$)?/)
                    let listName = this.rename(part[1])
                    if (/\s*;\s*/.test(listName)) {
                        let callback = this.getFromJson(listName)
                        allList.push(...callback.list)
                        allName.push(...callback.name)
                        continue
                    }
                    let option = part[2] === undefined ? {} : JSON.parse(part[2])
                    let { length: { max: maxLength, min: minLength = 1 } = {}, input: { replace, text } = {} } = option
                    let item = page.json.getList(listName)
                    if (item === undefined) {
                        allList.push([
                            {
                                "info": "未知的列表"
                            }
                        ])
                        allName.push(listName)
                        continue
                    } else if (item.length === 0 || (item.length === 1 && !("extend" in item[0]))) {
                        allList.push([
                            {
                                "info": "空列表"
                            }
                        ])
                        allName.push(listName)
                        continue
                    } else if ("extend" in item[0]) {
                        extend = this.getFromJson(item[0].extend)
                        allList.push(...extend.list)
                        allName.push(...extend.name)
                        if (item.length === 1) continue
                    }
                    item = JSON.parse(JSON.stringify(item))
                    if (maxLength === undefined || maxLength > item.length - 1) maxLength = item.length - 1
                    if (minLength < 2) minLength = 1
                    if (maxLength < 2) maxLength = 1
                    if (minLength > maxLength) minLength = maxLength - 1
                    let header = item[0]
                    let { input = {}, url } = header.template || {}
                    if (replace !== undefined) input.replace = replace
                    if (text !== undefined) input.text = text
                    let result = []
                    for (let i = minLength; i < maxLength + 1; i++) {
                        if (item[i].input === undefined) item[i].input = input
                        if (item[i].url === undefined) item[i].url = url
                        result.push(item[i])
                    }
                    allList.push(result)
                    allName.push(listName)
                }
                return {
                    list: allList,
                    
                    // TODO : name返回header中有意义的部分
                    /* name: {
                        name: String,
                        minecraft_version: String,
                        option: {
                            searchable: Boolean,
                            longList: Boolean
                        }
                    } */
                    name: allName
                }
            },
            loadToPage(list, callback, config = []) {
                //console.log({list})
                let name = page.list.name
                let output = {}
                for (let i = 0; i < list.length; i++) {
                    let item = list[i]
                    let newListEle = []
                    if (!page.thin_model) newListEle.push(`<li id="listName"><div class="mdui-list-item-text">---------- ${name[i]} ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</div></li>`)
                    let [ minLength = 0, maxLength = item.length - 1] = config
                    for (let id = minLength; id < maxLength + 1; id++) {
                        let listItem = item[id]
                        if (listItem.name === undefined) listItem.name = ""
                        if (listItem.info === undefined) listItem.info = ""
                        newListEle.push(
                            `<li class="mdui-list-item mdui-ripple" id="${id}">
                                ${_getImage(listItem)}
                                <div class="mdui-list-item-content"${_getOnclick(listItem)}>
                                    <div class="mdui-list-item-title minecraft-font" id="name">${_getName(listItem)}</div>
                                    <div class="mdui-list-item-text mdui-list-item-one-line" id="info">${_getInfo(listItem)}</div>
                                </div>
                                ${_getURL(listItem)}
                            </li>`
                        )
                    }
                    output[name[i]] = newListEle
                }
                callback(output)
                /** TODO
                 * {\s*(This:|Header:|Global:)?(\w+)\s*} 即 {...}
                 *     会被替换为该列表项中的对应内容**的字符串形式**
                 *     若在该列表项中没有找到，则使用列表头的对应内容
                 *     若也没有，则会在 page.json.global 中查找并替换
                 *     否则会输出为 "" (空字符串)
                 *     使用 {This ...} 强制匹配该列表项中的内容
                 *     使用 {Header ...} 强制匹配列表头中的内容
                 *     使用 {Global ...} 强制匹配全局内容
                 * ^{{\s*(This:|Header:|Global:)?(\w+)\s*}}$ 即 {{...}}
                 *     具有与 {...} 基本相同的规则
                 *     不同的是，这个花括号外不能有其他字符，否则会按照 {...} 进行匹配
                 *     而且这会使该项对应的键的值变成所找到的内容
                 *     否则输出 {} (空对象)
                 */
                function _getImage(listItem) {
                    if (page.thin_model || this.withImage) return ""
                    let image = listItem.image
                    if (image === undefined || image === "") return ""
                    else return `<div class="mdui-list-item-avatar" id="image"><img src="${image}"/></div>`
                }
                function _getOnclick(listItem) {
                    let input = listItem.input
                    let auto_next_list = listItem.auto_next_list
                    if (input !== undefined || auto_next_list !== undefined) {
                        let output = {
                            input: {
                                replace: "",
                                text: ""
                            },
                            auto_next_list: ""
                        }
                        if (input !== undefined) {
                            let replace = input.replace
                            let text = input.text
                            if (replace !== undefined) output.input.replace = `, '${replace}'`
                            if (text !== undefined) output.input.text = text.replace(/{name}/g, listItem.name).replace(/{info}/g, listItem.info.replace(/{color:\s?.+}/g, ""))
                            output.input = `page.input.input('${output.input.text}'${output.input.replace})`
                        } else output.input = ""
                        if (auto_next_list !== undefined) output.auto_next_list = `; page.list.load('${auto_next_list}')`
                        else output.auto_next_list = "; page.change()"
                        return ` onclick="${output.input}${output.auto_next_list}"`
                    } else return ""
                }
                function _getName(listItem) {
                    let name = listItem.name
                    return name
                }
                function _getInfo(listItem) {
                    let info = listItem.info
                    let regex = /{color:\s?(#[0-9A-Z]{6}|rgb\([.0-9]+,\s?[.0-9]+,\s?[.0-9]+\)|rgba\([.0-9]+,\s?[.0-9]+,\s?[.0-9]+,\s?[.0-9]\)|black|white)}/g
                    return info.replace(regex, '<span style="background-color: $1; margin: 0 4px; border: 1px inset black">&emsp;</span>')
                }
                function _getURL(listItem) {
                    if (page.thin_model) { return "" }
                    let url = listItem.url
                    if (url === undefined || url === "") return ""
                    else {
                        let output = url.replace(/{name}/g, listItem.name).replace(/{info}/g, listItem.info.replace(/{color:\s?.+}/g, "").replace(/\[.*\]/g, "")).replace(/{command_page}/g, page.json.getGlobal("url.command_page")).replace(/{normal_page}/g, page.json.getGlobal("url.normal_page")).replace(/{search_page}/g, page.json.getGlobal("url.search_page"))
                        return `<a class="mdui-btn mdui-btn-icon mdui-list-item-things-display-when-hover" href="${output}" target="_blank" id="url"><i class="mdui-icon material-icons mdui-text-color-black-icon">send</i></a>`
                    }
                }
            },
            /** 
             * FIXME
             * 以下两种加载列表的方法依然有重大问题
             * 同时加载多个列表时，会出现无法正常显示的问题
             * 正在寻找解决方法
             */
            loadByIntersectionObserver(data, container) {
                // https://www.xiabingbao.com/post/scroll/longlist-optimization.html
                if (!window.IntersectionObserver) return container.innerHTML = '<p style="color: #f00; text-align: center; font-size: 18px;">当前环境不支持IntersecionObserver</p>'
                if (typeof data === "object" && !Array.isArray(data)) return Object.keys(data).forEach(name => {
                    let list = data[name]
                    container.innerHTML += `<div id="${name}"><div id="observer"></div></div>`
                    this.loadByIntersectionObserver(list, container.querySelector(`[id="${name}"]`))
                })
                let start = 0
                let count = 20
                loadList(start, count)
                let io = new IntersectionObserver(entries => {
                    let entry = entries[0]
                    if (entry.intersectionRatio <= 0 || !entry.isIntersecting) return false
                    start += count
                    loadList(start, count)
                }, {
                    rootMargin: "400px 0px"
                })
                io.observe(container.querySelector(`#observer`))
                function loadList(start, count) {
                    let div = document.createDocumentFragment()
                    for (let i = start, len = start + count; i < len && i < data.length; i++) {
                        let item = document.createRange().createContextualFragment(data[i])
                        div.appendChild(item)
                    }
                    container.insertBefore(div, container.querySelector(`#observer`))
                }
            },
            loadByVirtualScroll(data, container) {
                // https://www.xiabingbao.com/post/scroll/longlist-optimization.html
                if (typeof data === "object" && !Array.isArray(data)) return Object.keys(data).forEach(name => {
                    let list = data[name]
                    container.innerHTML += `<div id="${name}"></div>`
                    this.loadByVirtualScroll(list, container.querySelector(`[id="${name}"]`))
                })
                let start = 0
                let count = 20
                createListItem(start, count)
                window.addEventListener("scroll", handleScroller())
                function createListItem(start, count, height) {
                    let div = document.createDocumentFragment()
                    if (height) {
                        let p = document.createElement("p")
                        p.style.height = height + "px"
                        div.appendChild(p)
                    }
                    for (let i = start, len = start + count; i < len && i < data.length; i++) {
                        let item = document.createRange().createContextualFragment(data[i])
                        div.appendChild(item)
                    }
                    container.innerHTML = ""
                    container.appendChild(div)
                }
                function handleScroller() {
                    let lastStart = 0
                    let item = container.querySelector(".mdui-list-item")
                    let itemStyle = getComputedStyle(item)
                    let itemHeight = item.offsetHeight + parseInt(itemStyle["marginTop"]) + parseInt(itemStyle["marginBottom"])
                    return () => {
                        let currentScrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop)
                        let fixedScrollTop = currentScrollTop - currentScrollTop % itemHeight
                        let start = Math.floor(currentScrollTop / itemHeight)
                        if (lastStart !== start) {
                            lastStart = start
                            createListItem(start, count, fixedScrollTop)
                        }
                    }
                }
            },
            /** 
             * TODO
             * 新的搜索方式，
             * 需为将来穷举助手保留接口
             */
            searchByDisplay() {},
            searchByReload() {}
        },
        search() {
            listEle.querySelectorAll("div:not([class])").forEach(list => {
                list.style.display = ""
                let query = page.input.getByLength("the_latest_command_parameter")
                let listItem = list.querySelectorAll('.mdui-list-item')
                if (/next/g.test(list.id) || /selector\.variable\[[0-9]+\]\.value/.test(list.id)) return
                else if (list.id === "command") query = query.replace("/", "")
                else if (list.id === "selector.variable") query = page.input.getByLength("the_latest_selector_variable")
                if (query === "") {
                    listItem.forEach(item => {
                        item.style.display = ""
                    })
                    return
                }
                let e = 0
                for (let i = 0; i < listItem.length; i++) {
                    listItem[i].style.display = "none"
                    if (eval(`/${query.replace("?", "\\?")}/g.test(list.querySelectorAll('#name')[i].innerHTML)`)) {
                        listItem[i].style.display = ""
                        e++
                    }
                }
                if (e === 0) {
                    for (let i = 0; i < listItem.length; i++) {
                        listItem[i].style.display = "none"
                        if (eval(`/${query.replace("?", "\\?")}/g.test(list.querySelectorAll('#info')[i].innerHTML)`)) {
                            listItem[i].style.display = ""
                            e++
                        }
                    }
                }
                if (e === 0) list.style.display = "none"
            })
        }
    },
    grammar: {
        load(commandName = page.input.getCommandName()) {
            grammarEle.innerHTML = ""
            noteEle.innerHTML = ""
            let grammarGroup = page.json.getGrammar(commandName)
            grammarEle.innerHTML = `<span>${commandName} </span>`
            if (grammarGroup !== undefined) {
                noteEle.innerHTML = `<span>${grammarGroup[0].command.info}</span>`
                let result = this._module.getFromJson(grammarGroup)
                if (result.info.length < inputEle.value.split(" ").length - 1) {
                    return {
                        finish: true
                    }
    
                    // FIXME: 英文下会将英文的语法项加载为html标签
                    // 可暂时使用零宽字符（这里建议使用"\u200E" 或其实体 "&lrm;"）将 "<" 与其后的文本隔开，不能用 "&lt;" 代替 "<"
                    // 可以参考 “fog” 命令的语法部分
    
                } else {
                    grammarEle.innerHTML += `<span>${result.grammar.replace(/x y z/g, "x&ensp;<span>y&ensp;</span><span>z</span>").replace(/(>|]|[a-z])\s(<|\[|[a-z])/g, "$1 </span><span>$2")}</span>`
                    grammarEle.querySelectorAll("span")[inputEle.value.split(" ").length - 1].style.fontWeight = "bold"
                    noteEle.innerHTML = result.info[inputEle.value.split(" ").length - 2].note
                    return {
                        list: result.info[inputEle.value.split(" ").length - 2].list
                    }
                }
            }
            else return {
                undefined: true
            }
        },
        _module: {
            getFromJson(grammarGroup) {
                let commandLength = inputEle.value.split(" ").length - 1
                if (grammarGroup.length > 2) {
                    let output = new Array
                    for (let i = 1; i < grammarGroup.length; i++) {
                        let result = new Array
                        for (let e = 0; e < commandLength && e < grammarGroup[i].display.length; e++) {
                            let length = grammarGroup[i].display[e].length
                            let rule = grammarGroup[i].display[e].rule
                            if (rule.type === "regex") {
                                if (eval(`${rule.text}.test(page.input.getByLength(length))`)) {
                                    result.push(true)
                                } else {
                                    result.push(false)
                                }
                            } else if (rule.type === "regex-contrary") {
                                if (eval(`${rule.text}.test(page.input.getByLength(length))`)) {
                                    result.push(false)
                                } else {
                                    result.push(true)
                                }
                            } else if (rule.type === "isSelector") {
                                if (page.input.getByLength(length) !== undefined) {
                                    if (page.input.getByLength(length).isSelector()) {
                                        result.push(true)
                                    } else {
                                        result.push(false)
                                    }
                                }
                            } else if (rule.type === "isCoordinate") {
                                if (page.input.getByLength(length) !== undefined) {
                                    if (page.input.getByLength(length).isCoordinate()) {
                                        result.push(true)
                                    } else {
                                        result.push(false)
                                    }
                                }
                            }
                        }
                        if (result.includes(false) === false) {
                            output.push(i)
                        }
                    }
                    //console.log({output})
                    if (output[0] !== undefined) {
                        return grammarGroup[output[0]]
                    } else {
                        return grammarGroup[1]
                    }
                } else {
                    return grammarGroup[1]
                }
            }
        }
    },
    option: {
        developer: {
            devTool: {
                set(value) {
                    if (value === "true" || value === "false") {
                        localStorage.setItem("devTool", value)
                    }
                    location.reload()
                },
                get() {
                    return localStorage.getItem("devTool")
                }
            }
        },
        language: {
            set(lang) {
                localStorage.setItem("language", lang)
                location.reload()
            },
            get() {
                return localStorage.getItem("language")
            }
        },
        mduiThemeColor: {
            origin: {
                primary: "indigo",
                accent: "pink"
            },
            set(primary, accent) {
                document.body.classList.remove(`mdui-theme-primary-${this.origin.primary}`)
                document.body.classList.remove(`mdui-theme-accent-${this.origin.accent}`)
                this.origin = {
                    primary: primary,
                    accent: accent
                }
                localStorage.setItem("mduiThemeColor", `{primary: "${primary}", accent: "${accent}"}`)
                document.body.classList.add(`mdui-theme-primary-${primary}`)
                document.body.classList.add(`mdui-theme-accent-${accent}`)
            },
            setFromStorage() {
                let storage = eval(`(${localStorage.getItem("mduiThemeColor")})`)
                this.set(storage.primary, storage.accent)
            },
            get() {
                return {
                    primary: this.origin.primary,
                    accent: this.origin.accent
                }
            }
        },
        withImage: {
            set(boolean) {
                localStorage.setItem("withImage", boolean)
                location.reload()
            },
            get() {
                return localStorage.getItem("withImage")
            }
        }
    },
    custom: {
        setURL(isReload = true) {
            let url = document.querySelector("#customURL").value
            localStorage.setItem("customURL", url)
            if (isReload) return location.reload()
            if (url.endsWith(".js")) {
                let comment = document.createComment("Custom URL")
                document.body.appendChild(comment)
                let script = document.createElement("script")
                script.src = url
                script.id = "cutom-url"
                document.body.appendChild(script)
                script.onload = () => {
                    this.load()
                }
            } else if (url.endsWith(".json")) {
                fetch(url).then(response => {
                    return response.json()
                }).then(json => {
                    this.load(json)
                }).catch(err => {
                    console.error(err)
                })
            }
        },
        setURLFromStorage() {
            document.querySelector("#customURL").value = localStorage.getItem("customURL")
            this.setURL(false)
        },
        getURL() {
            return localStorage.getItem("extendURL")
        },
        load(json) {
            if (customJson !== undefined) json = JSON.parse(JSON.stringify(customJson))
            json.forEach((lang, init) => {
                if (init.list !== undefined && init.list.constructor === Object) {
                    let list = init.list
                    list.forEach((listName, value) => {
                        if (page.json[lang].list[listName] === undefined || page.json[lang].list[listName].length === 0) {
                            page.json[lang].list[listName] = [...value]
                        } else {
                            page.json[lang].list[listName].push(...value)
                        }
                    })
                }
                if (init.grammar !== undefined && init.grammar.constructor === Array) {
                    page.json[lang].grammar.push(...init.grammar)
                }
            })
        }
    }
}