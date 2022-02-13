import { toString, stringToNode, nodeToString } from "./core/util/common.js"
import App from "./core/main.js"
import createWebOptionManager from "./src/plugins/option.js"
import createPWAManager from "./src/plugins/pwa.js"

import { typeFrom } from "./core/src/input/type.js"

window.app = new App({
    DEFAULT_LANGUAGE: "zh-CN",
    DEFAULT_THEME_COLOR: {
        primary: "indigo",
        accent: "pink"
    },
    
    $input: document.querySelector("#edit"),
    $funBtn: document.querySelector("#function"),
    $grammar: document.querySelector("#grammar"),
    $note: document.querySelector("#note"),
    $list: document.querySelector("#list"),
    _funIcon: {
        wiki: `<i class="mdui-icon material-icons mdui-text-color-theme-icon">send</i>`,
        copy: `<i class="mdui-icon material-icons mdui-text-color-theme-icon">content_copy</i>`
    },
    
    onInput: [
        // () => console.log("typeFrom: ", app.input.typeFrom())
    ],
    onInit() {
        // TODO 这里不是很合理的样子，等再改改
        if (screen.height < 800) {
            document.body.classList.add("lite")
            window._LITE_MODELL = true
        }
        if (app.LANG === "en") this.$grammar.classList.add("minecraft-font")
        document.body.classList.remove("loading")
    },
    onI18n(getText) {
        this.$input.placeholder = getText("input")
    },
    
    list: {
        get _use_virtual_scroll() {
            return true
        },
        get _use_divider() {
            return !window._LITE_MODELL
        },
        get _height() {
            const _fix = window._LITE_MODELL ? 85 : 120
            return document.documentElement.clientHeight - _fix
        },
        get _itemHeight() {
            if (window._LITE_MODELL) {
                const height = window.innerHeight / 16
                if (height > 36) return 36
                else if (height < 24) return 24
                else return Math.round(height)
            } else return 72
        },
        template: {
            item(_id, _name, renderer) {
                const item = stringToNode(`
                    <li class="mdui-list-item mdui-ripple" id="${_id}" data-list-name="${_name}">
                        ${ window._LITE_MODELL ? renderer.get("image") : "" }
                        <div class="mdui-list-item-content">
                            <div class="mdui-list-item-title minecraft-font" id="name">${renderer.get("name")}</div>
                            <div class="mdui-list-item-text mdui-list-item-one-line" id="info">${renderer.get("info")}</div>
                        </div>
                        ${ window._LITE_MODELL ? renderer.get("url") : "" }
                    </li>
                `)
                item.setAttribute("onclick", renderer.get("input") || "")
                return nodeToString(item)
            },
            divider(name, _name) {
                return `<li class="mdui-subheader" data-list-name="${_name}">${name}</li>`
            },
            highlight(_, $1) {
                return `<span class="mdui-text-color-theme-accent">${$1}</span>`
            }
        },
        renderer: {
            image: {
                callbackFun(url) {
                    return `<div class="mdui-list-item-avatar" id="image"><img src="${url}" /></div>`
                }
            },
            input: {
                callbackFun(input) {
                    return `app.input.input(${toString(input)})`
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
    
    data: {
        url: "/api/mcbelist.{lang}.{branch}",
        custom: [
            "/js/src/custom/example.js"
        ]
    },
    
    plugin: {
        plugins: [
            createWebOptionManager,
            createPWAManager
        ],
        handler([ webOption, pwa ]) {
            if (webOption) app.option = webOption.init(res => app.initialize(res))
            if (pwa && !pwa._noServiceWorker) app.pwa = pwa
        }
    },
    
    _components: {
        snackbar(message, option) {
            mdui.snackbar({
                message,
                position: window._LITE_MODELL ? "bottom" : "left-top",
                timeout: 2000,
                ...option
            })
        }
    }
})
