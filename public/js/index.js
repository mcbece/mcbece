import { toString, stringToNode, nodeToString } from "./core/util/common.js"
import App from "./core/main.js"
import createWebOptionManager from "./src/plugins/option.js"
import createPWAManager from "./src/plugins/pwa.js"

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
    
    onInput: [],
    onInit() {
        // TODO 这里不是很合理的样子，等再改改
        if (screen.height < 800) {
            document.body.classList.add("lite")
            window._LITE_MODEL = true
        }
        if (app.LANG === "en") this.$grammar.classList.add("minecraft-font")
        document.body.classList.remove("loading")
    },
    onI18n(getText) {
        document.title = getText("title")
        this.$input.placeholder = getText("input")
    },
    
    list: {
        get _use_virtual_scroll() {
            return true
        },
        get _use_divider() {
            return !_LITE_MODEL
        },
        get _height() {
            const _fix = _LITE_MODEL ? 85 : 120
            return document.documentElement.clientHeight - _fix
        },
        get _itemHeight() {
            if (_LITE_MODEL) {
                const height = window.innerHeight / 16
                if (height > 36) return 36
                else if (height < 24) return 24
                else return Math.round(height)
            } else return 72
        },
        template: {
            item(_id, name, renderer) {
                const item = stringToNode(`
                    <li class="mdui-list-item mdui-ripple" id="${_id}" data-list-name="${name}">
                        ${ _LITE_MODEL ? renderer.get("image") : "" }
                        <div class="mdui-list-item-content">
                            <div class="mdui-list-item-title minecraft-font" id="name">${renderer.get("name")}</div>
                            <div class="mdui-list-item-text mdui-list-item-one-line" id="info">${renderer.get("info")}</div>
                        </div>
                        ${ _LITE_MODEL ? renderer.get("url") : "" }
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
        },
        shortcut: {
            "enchantment.level": handler,
            "entity.event": handler,
            "block.data": handler,
            "item.data": handler,
            "entity.family": "entity_family"
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
            if (webOption) app.option = webOption.init(app.initialize)
            if (pwa && !pwa._noServiceWorker) app.pwa = pwa
        }
    },
    
    _components: {
        snackbar(message, option) {
            mdui.snackbar({
                message,
                position: _LITE_MODEL ? "bottom" : "left-top",
                timeout: 2000,
                ...option
            })
        }
    }
})

function handler(getter, item) {
    const fixReg = /^(?<name>.+)\.(?<subname>.+)$/
    const { groups: { name, subname, option } } = item.match(fixReg)
    return getter.searchFrom(name, getter.catchInput(-2), i => `${name}{${i}}.${subname}`)
}