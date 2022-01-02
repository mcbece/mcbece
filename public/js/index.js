const inputEle = document.querySelector("#edit")
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

function forEachObject(obj, callback, thisArg = this) {
    Object.keys(obj).forEach((key, i) => {
        let value = obj[key]
        callback.call(thisArg, key, value, i, obj)
    })
}

const page = {
    data: {
        async getJsonData(url) {
            try {
                let _data = await fetch(url)
                let data = await _data.json()
                return data
            } catch (err) {
                console.error(err)
            }
        },
        getList(name, _return, lang = LANG) {
            try {
                let result = eval(`page.data["${lang}"].list.${name}`)
                return result ?? _return
            } catch {
                if (lang !== "zh-CN") return this.getList(name, _return, "zh-CN")
                return _return
            }
        },
        getGrammar(name, lang = LANG) {
            try {
                return page.data[lang].grammar.find(item => {
                    return eval(`${item[0].command.name}.test(name)`)
                })
            } catch {
                if (lang !== "zh-CN") return this.getGrammar(name, "zh-CN")
                return undefined
            }
        },
        getGlobal(name, lang = LANG) {
            try {
                let result = eval(`page.data["${lang}"].text.${name}`)
                return result ?? ""
            } catch {
                if (lang !== "zh-CN") return this.getGlobal(name, "zh-CN")
                return ""
            }
        },
        custom: {
            /** 
             * TODO
             * 这个模块还需要改改，使其加载方式更合合理
             */
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
                    script.onload = () => this.load()
                }
                else if (url.endsWith(".json")) page.data.getJsonData(url).then(json => this.load(json))
            },
            setURLFromStorage() {
                a = this.getURL()
                this.setURL(false)
            },
            load(json) {
                if (customJson !== undefined) json = JSON.parse(JSON.stringify(customJson))
                forEachObject(json, (lang, things) => {
                    if (things.list !== undefined && things.list.constructor === Object) {
                        let list = things.list
                        forEachObject(list, (listName, value) => {
                            if (page.data.list[listName] === undefined || !page.data.list[listName].length) page.data.list[listName] = [...value]
                            else page.data.list[listName].push(...value)
                        })
                    }
                    if (things.grammar !== undefined && things.grammar.constructor === Array) page.data.grammar.push(...things.grammar)
                })
            }
        }
    },
    initialize({ lang = LANG, branch = BRANCH } = {}) {
        this.data.getJsonData(`/api/mcbelist/${lang}.${branch}.json`).then(data => {
            page.data[lang] = data
            if (lang !== "zh-CN") return page.data.getJsonData(`/api/mcbelist/zh.${branch}.json`).then(dataZh => {
                page.data.zh = dataZh
            })
        }).then(() => {
            
            // TODO i18n
            loadText()
            
            // TODO 这里不是很合理的样子，等再改改
            if (screen.height < 800) {
                document.body.classList.add("thin-model")
                page.thin_model = true
            }
            
            if (LANG === "en") grammarEle.classList.add("minecraft-font")
            inputEle.oninput = () => {
                page.change()
                page.list.search()
            }
            page.change()
        })
        
        // TODO i18n
        function loadText() {
            let getText = page.data.getGlobal
            document.title = getText("title")
            inputEle.placeholder = getText("input")
        }
    },
    change() {
        document.querySelector("#wiki").href = page.data.getGlobal("url.command_page") + inputEle.value.split(" ")[0]  // FIXME
        page.editEnd = false
        page.input.copy("display")
        if (inputEle.value.split(" ").length === 1) {
            page.list.load("command")
            grammarEle.innerHTML = ""
            noteEle.innerHTML = page.data.getGlobal("edit.begin")
            return
        }
        let result = this.grammar.load()
        if (result.finish) {
            listEle.innerHTML = ""
            grammarEle.innerHTML = ""
            noteEle.innerHTML = page.data.getGlobal("edit.end")
            page.editEnd = true
            page.list.names = {}
            page.input.copy("display")
        } else if (result.undefined) {
            listEle.innerHTML = ""
            page.list.names = {}
            noteEle.innerHTML = "未知的命令"
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
            if (length === -1) return inputEle.value.split(" ")[inputEle.value.split(" ").length - 1]
            else if (length === "the_latest_selector_variable") {
                let all = this.getByLength(-1).split("[")[1].split(",")
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
            let latest = this.getByLength(-1)
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
        names: {},
        lists: {},
        complete: false,
        load(listGroup) {
            let { names, lists } = this._module.getFromJson(listGroup)
            // console.log({ names, lists })
            if (Object.keys(JSON.parse(JSON.stringify(this.names))).sort().toString() !== Object.keys(JSON.parse(JSON.stringify(names))).sort().toString()) {
                console.log({ names, lists })
                this.names = names
                this.lists = lists
                this._module.renderToHTML(list => this._module.loadToPage(list))
            }
        },
        _module: {
            rename(listName) {
                if (listName === "selector") {
                    let selector = page.input.getByLength(-1)
                    if (selector.length < 2) {
                        return "selector.parameter"
                    } else if (selector.length === 2 && selector.startsWith("@")) {
                        return "selector.next; selector.parameter"
                    } else if (selector.length > 2 && selector.split("")[2] === "[") {
                        let variable_item = selector.split("[")[1].split("]")[0].split(",")[selector.split("[")[1].split("]")[0].split(",").length - 1]
                        let key = variable_item.split("=")[0]
                        let value = variable_item.split("=")[1]
                        let index = page.data.getList("selector.variable", [{}]).findIndex(_item => _item.name === key)
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
                    let coordinate = page.input.getByLength(-1)
                    if (coordinate.length < 1) return listName
                    else if (coordinate === "~" || coordinate === "^") return `${listName}[0].value`
                    else return "next"
                } else if (/^rotation.(x|y)$/.test(listName)) {
                    let rotation = page.input.getByLength(-1)
                    if (rotation.length < 1) return listName
                    else if (rotation === "~") return `${listName}[0].value`
                    else return "next"
                } else if (listName === "enchantment.level") {
                    let enchantment = page.input.getByLength(inputEle.value.split(" ").length - 2)
                    let index = page.data.getList("enchantment", [{}]).findIndex(_item => _item.name === enchantment)
                    if (index !== -1) return `enchantment[${index}].level`
                    else return "enchantment[0].level"
                } else if (listName === "entity.event") {
                    let entity = page.input.getByLength(inputEle.value.split(" ").length - 2)
                    let index = page.data.getList("entity", [{}]).findIndex(_item => _item.name === entity)
                    if (index !== -1) return `entity[${index}].event`
                    else return "entity[0].event"
                } else if (listName === "block.data") {
                    let block = page.input.getByLength(inputEle.value.split(" ").length - 2)
                    let index = page.data.getList("block", [{}]).findIndex(_item => _item.name === block)
                    if (index !== -1) return `block[${index}].data`
                    else return "block[0].data"
                } else if (listName === "item.data") {
                    let item = page.input.getByLength(inputEle.value.split(" ").length - 2)
                    let index = page.data.getList("item", [{}]).findIndex(_item => _item.name === item)
                    if (index !== -1) return `item[${index}].data`
                    else return "item[0].data"
                } else return listName
            },
            getFromJson(listGroup) {
                if (listGroup === undefined) return {}
                listGroup = [...new Set(listGroup.replace(/\s?;\s?/g, ";").split(";"))]
                let output = {
                    names: {},
                    lists: {}
                }
                for (let i = 0; i < listGroup.length; i++) {
                    let part = listGroup[i].match(/^([.A-Za-z0-9\[\]\(\)_@#$&*%=^~]+)({.*})?$/) ?? []
                    let _name = this.rename(part[1])
                    let option = part[2] ?? ""
                    let name = _name + option
                    let item = page.data.getList(_name)
                    if (/\s*;\s*/.test(_name)) {
                        let result = this.getFromJson(_name)
                        Object.assign(output.lists, result.lists)
                        Object.assign(output.names, result.names)
                        continue
                    }
                    if (item === undefined) {
                        output.lists[name] = [
                            {
                                "info": "未知的列表"
                            }
                        ]
                        output.names[name] = {}
                        continue
                    } else if (!item.length || (item.length === 1 && !("extend" in item[0]))) {
                        output.lists[name] = [
                            {
                                "info": "空列表"
                            }
                        ]
                        output.names[name] = {}
                        continue
                    } else if ("extend" in item[0]) {
                        let result = this.getFromJson(item[0].extend)
                        Object.assign(output.lists, result.lists)
                        Object.assign(output.names, result.names)
                        if (item.length === 1) continue
                    }
                    let { length: { max: maxLength = item.length - 1, min: minLength = 1 } = {}, input: { replace, text } = {} } = option && JSON.parse(option)
                    item = JSON.parse(JSON.stringify(item))
                    ~~maxLength
                    ~~minLength
                    if (maxLength > item.length - 1) maxLength = item.length - 1
                    if (minLength < 1) minLength = 1
                    if (maxLength < 1) maxLength = 1
                    if (minLength > maxLength) minLength = maxLength - 1
                    let header = item[0]
                    let { input = {}, url } = header.template ?? {}
                    if (replace !== undefined) input.replace = replace
                    if (text !== undefined) input.text = text
                    let list = {
                        header: reeditHeader(header, name),
                        body: []
                    }
                    for (let i = minLength; i < maxLength + 1; i++) {
                        if (item[i].input === undefined) item[i].input = input
                        if (item[i].url === undefined) item[i].url = url
                        list.body.push(item[i])
                    }
                    output.lists[name] = list.body
                    output.names[name] = list.header
                }
                return output
                
                function reeditHeader(header, name) {
                    return {
                        name: header.name || name,
                        minecraft_version: header.minecraft_version || page.data?.MINECRAFT_VERSION,
                        option: Object.assign({
                            searchable: false
                        }, header.option)
                    }
                }
            },
            renderToHTML(callback, _names = page.list.names, _lists = page.list.lists) {
                let names = Object.keys(_names)
                let lists = Object.values(_lists)
                let output = []
                lists.forEach((item, i) => {
                    let name = names[i]
                    if (!page.thin_model) output.push(
                        `<li id="list_name" data-list-name="${name}">
                            <div class="mdui-list-item-text">---------- ${_names[name].name} ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</div>
                        </li>`
                    )
                    item.forEach((listItem, id) => {
                        if (listItem.name === undefined) listItem.name = ""
                        if (listItem.info === undefined) listItem.info = ""
                        output.push(
                            `<li class="mdui-list-item mdui-ripple" id="${id}" data-list-name="${name}">
                                ${_getImage(listItem)}
                                <div class="mdui-list-item-content"${_getOnclick(listItem)}>
                                    <div class="mdui-list-item-title minecraft-font" id="name">${_getName(listItem)}</div>
                                    <div class="mdui-list-item-text mdui-list-item-one-line" id="info">${_getInfo(listItem)}</div>
                                </div>
                                ${_getURL(listItem)}
                            </li>`
                        )
                    })
                })
                callback(output)
                /**
                 * TODO
                 * {\s*(This:|Header:|Global:)?(.+)(\|(.+))?\s*}
                 *     即 { <namespace>:<thing>[|<returnedThingIfNotFound>] }
                 *     会被替换为该列表项中的对应内容**的字符串形式**
                 *     若在该列表项中没有找到，则使用列表头中的对应内容
                 *     若也没有，则会在 page.data.global 中查找并替换
                 *     否则会输出为 "" (空字符串)
                 *     namespace 为:
                 *       - This 强制匹配该列表项中的内容
                 *       - Header 强制匹配列表头中的内容
                 *       - Global 强制匹配全局内容
                 * ^{\$\s*(.+)\s*\$}$ 即 {$...$}
                 *     执行 js 代码
                 *     可以与 {...} 嵌套使用，会先将 {...} 替换为它的返回内容
                 *     若只需成功，则会被替换为其返回值**的字符串形式**
                 *     若执行失败，会以 console.warn 报错，并输出 "" (空字符串)
                 *     若该段 js 代码没有输出，则输出为 "" (空字符串)
                 */
                function _getImage(listItem) {
                    if (page.thin_model || !this.withImage) return ""
                    let image = listItem.image
                    if (image) return `<div class="mdui-list-item-avatar" id="image"><img src="${image}" /></div>`
                    else return ""
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
                    let regex = /{color:\s?(#[0-9A-Za-z]{6}|rgb\([.0-9]+,\s?[.0-9]+,\s?[.0-9]+\)|rgba\([.0-9]+,\s?[.0-9]+,\s?[.0-9]+,\s?[.0-9]+\)|[a-z]+)}/g
                    return info.replace(regex, '<span style="background-color: $1; margin: 0 4px; border: 1px inset black">&emsp;</span>')
                }
                function _getURL(listItem) {
                    if (page.thin_model) { return "" }
                    let url = listItem.url
                    if (url === undefined || url === "") return ""
                    else {
                        let output = url.replace(/{name}/g, listItem.name).replace(/{info}/g, listItem.info.replace(/{color:\s?.+}/g, "").replace(/\[.*\]/g, "")).replace(/{command_page}/g, page.data.getGlobal("url.command_page")).replace(/{normal_page}/g, page.data.getGlobal("url.normal_page")).replace(/{search_page}/g, page.data.getGlobal("url.search_page"))
                        return `<a class="mdui-btn mdui-btn-icon mdui-list-item-things-display-when-hover" href="${output}" target="_blank" id="url"><i class="mdui-icon material-icons mdui-text-color-black-icon">send</i></a>`
                    }
                }
            },
            loadToPage(data, container = listEle) {
                container.innerHTML = ""
                page.list.complete = false
                if (window.IntersectionObserver) this.loadByIntersectionObserver(data, container)
                else {
                    let items = document.createDocumentFragment()
                    data.forEach(item => items.appendChild(document.createRange().createContextualFragment(item)))
                    container.appendChild(items)
                    page.list.complete = true
                }
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "smooth"
                })
            },
            loadByIntersectionObserver(data, container = listEle) {
                // https://www.xiabingbao.com/post/scroll/longlist-optimization.html
                let observerEle = document.createElement("div")
                observerEle.id = "observer"
                container.appendChild(observerEle)
                let start = 0
                let count = 20
                loadList(start, count)
                let observer = new IntersectionObserver(entries => {
                    let entry = entries[0]
                    if (entry.intersectionRatio <= 0 || !entry.isIntersecting) return false
                    start += count
                    loadList(start, count, () => {
                        observer.unobserve(entry.target)
                        container.removeChild(entry.target)
                        page.list.complete = true
                    })
                }, {
                    rootMargin: "400px 0px"
                })
                observer.observe(container.querySelector("#observer"))
                function loadList(start, count, handler = () => {}) {
                    let div = document.createDocumentFragment()
                    for (let i = start, len = start + count; i < len && i < data.length; i++) {
                        let item = document.createRange().createContextualFragment(data[i])
                        div.appendChild(item)
                        if (i === data.length - 1) handler()
                    }
                    container.insertBefore(div, container.querySelector(`#observer`))
                }
            }
        },
        search() {
            let result = {
                lists: {},
                names: {}
            }
            Object.keys(this.names).forEach(listName => {
                let list = {
                    body: this.lists[listName],
                    header: this.names[listName]
                }
                let query = page.input.getByLength(-1)
                if (listName === "command") query = query.replace("/", "")
                else if (listName === "selector.variable") query = page.input.getByLength("the_latest_selector_variable")
                if (!list.header.option.searchable || !query) {
                    // TODO     ^^^^^^^^^^^^^^^^^^    这里会报错，以后再修
                    result.lists[listName] = list.body
                    result.names[listName] = list.header
                    return
                }
                let _lists = list.body.filter(item => (new RegExp(query.replace("?", "\\?"))).test(item.name))
                if (!_lists.length) _lists = list.body.filter(item => (new RegExp(query.replace("?", "\\?"))).test(item.info))
                if (_lists.length) {
                    result.lists[listName] = _lists
                    result.names[listName] = list.header
                }
            })
            this._module.renderToHTML(list => this._module.loadToPage(list), result.names, result.lists)
        }
    },
    grammar: {
        load(commandName = page.input.getCommandName()) {
            grammarEle.innerHTML = ""
            noteEle.innerHTML = ""
            let grammarGroup = page.data.getGrammar(commandName)
            grammarEle.innerHTML = `<span>${commandName} </span>`
            if (grammarGroup !== undefined) {
                noteEle.innerHTML = `<span>${grammarGroup[0].command.info}</span>`
                let result = this._module.getFromJson(grammarGroup)
                if (result.info.length < inputEle.value.split(" ").length - 1) return {
                    finish: true
                }
                else {
                    grammarEle.innerHTML += `<span>${result.grammar.replace(/\</g, "<&lrm;").replace(/\>/g, "&lrm;>").replace(/x y z/g, "x&ensp;<span>y&ensp;</span><span>z</span>").replace(/(>|]|[a-z])\s(<|\[|[a-z])/g, "$1 </span><span>$2")}</span>`
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
                    let output = []
                    for (let i = 1; i < grammarGroup.length; i++) {
                        let result = []
                        for (let e = 0; e < commandLength && e < grammarGroup[i].display.length; e++) {
                            let length = grammarGroup[i].display[e].length
                            let rule = grammarGroup[i].display[e].rule
                            if (rule.type === "regex") {
                                if (eval(`${rule.text}.test(page.input.getByLength(length))`)) result.push(true)
                                else result.push(false)
                            } else if (rule.type === "regex-contrary") {
                                if (eval(`${rule.text}.test(page.input.getByLength(length))`)) result.push(false)
                                else result.push(true)
                            } else if (rule.type === "isSelector") {
                                if (page.input.getByLength(length) !== undefined) {
                                    if (page.input.getByLength(length).isSelector()) result.push(true)
                                    else result.push(false)
                                }
                            } else if (rule.type === "isCoordinate") {
                                if (page.input.getByLength(length) !== undefined) {
                                    if (page.input.getByLength(length).isCoordinate()) result.push(true)
                                    else result.push(false)
                                }
                            }
                        }
                        if (!result.includes(false)) output.push(i)
                    }
                    //console.log({output})
                    if (output[0] !== undefined) return grammarGroup[output[0]]
                    else return grammarGroup[1]
                }
                else return grammarGroup[1]
            }
        }
    }
}