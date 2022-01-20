import App from "./core/main.js"
const app = new App({
    DEFAULT_LANGUAGE: "zh-CN",
    DEFAULT_THEME_COLOR: {
        primary: "indigo",
        accent: "pink"
    },
    
    $input: document.querySelector("#edit"),
    $grammar: document.querySelector("#grammar"),
    $note: document.querySelector("#note"),
    $list: document.querySelector("#list"),
    
    data: {
        url: "/api/mcbelist.{lang}.{branch}"
    },
    
    list: {
        template(_id, name, getter) {
            return `
                <li class="mdui-list-item mdui-ripple" id="${_id}" data-list-name="${name}">
                    ${getter.get("image")}
                    <div class="mdui-list-item-content"${(() => { if (getter.get("onclick")) return ` onclick="${getter.get("onclick")}"` })()}>
                        <div class="mdui-list-item-title minecraft-font" id="name">${getter.get("name")}</div>
                        <div class="mdui-list-item-text mdui-list-item-one-line" id="info">${getter.get("info")}</div>
                    </div>
                    ${getter.get("url")}
                </li>
            `
        },
        getter: {
            image: {
                callbackFun(url) {
                    return `<div class="mdui-list-item-avatar" id="image"><img src="${url}" /></div>`
                }
            },
            url: {
                callbackFun(url) {
                    return `<a class="mdui-btn mdui-btn-icon mdui-list-item-things-display-when-hover" href="${url}" target="_blank" id="url"><i class="mdui-icon material-icons mdui-text-color-black-icon">send</i></a>`
                }
            }
        }
    },
    
    grammar: {
        control: {
            shortcut: {
                isCoordinate: /^[-~^.0-9]+/,
                isSelector: /(^@[a-z]?(\[[-~^=,\.\w]*\]?)?|[\w]+)/
            }
        }
    },
    
    custom: {
        data(config) {
            config.$input.classList.remove("minecraft-font")
            return {
                "zh-CN": {
                    list: {
                        player: [
                            {
                                template: {
                                    input: {
                                        text: "{name} "
                                    }
                                }
                            },
                            {
                                name: "PFiS1737",
                                info: "作者名称 :-)"
                            }
                        ]
                    }
                }
            }
        }
    }
})

window.app = app










            /** 
             * TODO
             * 这个模块还需要改改，使其加载方式更合合理
             *
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
                if (customJson !== undefined) json = copyObject(customJson)
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
            }*/