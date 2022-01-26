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
    
    init(app) {
        // TODO 这里不是很合理的样子，等再改改
        if (screen.height < 800) {
            document.body.classList.add("lite")
            app.lite = true
        }
        if (app.LANG === "en") this.$grammar.classList.add("minecraft-font")
    },
    
    i18n(getText) {
        document.title = getText("title")
        this.$input.placeholder = getText("input")
    },
    
    data: {
        url: "/api/mcbelist.{lang}.{branch}"
    },
    
    list: {
        item(_id, name, renderer) {
            return `
                <li class="mdui-list-item mdui-ripple" id="${_id}" data-list-name="${name}">
                    ${renderer.get("image")}
                    <div class="mdui-list-item-content"${(() => { if (renderer.get("onclick")) return ` onclick="${renderer.get("onclick")}"` })()}>
                        <div class="mdui-list-item-title minecraft-font" id="name">${renderer.get("name")}</div>
                        <div class="mdui-list-item-text mdui-list-item-one-line" id="info">${renderer.get("info")}</div>
                    </div>
                    ${renderer.get("url")}
                </li>
            `
        },
        divider(name, _name) {
            return `
                <li id="listName" data-list-name="${_name}">
                    <div class="mdui-list-item-text">---------- ${name} ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</div>
                </li>
            `
        },
        highlight(_, $1) {
            return `<span class="mdui-text-color-theme-accent">${$1}</span>`
        },
        renderer: {
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
        data() {
            this.$input.classList.remove("minecraft-font")
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