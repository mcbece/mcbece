import App from "./_core/index.js"
import { toString, stringToNode, nodeToString } from "./_core/util/common.js"
import createWebOptionManager from "./src/plugins/option.js"
import createPWAManager from "./src/plugins/pwa.js"

const $funBtn = document.querySelector("#function")
const funBtnCont = {
    wiki: `<i class="mdui-icon material-icons mdui-text-color-theme-icon">send</i>`,
    copy: `<i class="mdui-icon material-icons mdui-text-color-theme-icon">content_copy</i>`
}

window.app = new App({
    DEFAULT_LANGUAGE: "zh-CN",
    
    $input: document.querySelector("#edit"),
    $grammar: document.querySelector("#grammar"),
    $note: document.querySelector("#note"),
    $list: document.querySelector("#list"),
    
    list: {
        _useVirtualScroll: true,
        _useDivider: !window._LITE_MODELL,
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
                `.trim())
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
            "/js/lib/custom/example.min.js"
        ]
    },
    
    event: {
        "app.init": [
            (_, config) => {
                if (app.LANG === "en") config.$grammar.classList.add("minecraft-font")
                document.body.classList.remove("loading")
            }
        ],
        "app.i18n": [
            (config, getText) => config.$input.placeholder = getText("input")
        ],
        "app.clear": [
            () => $funBtn.innerHTML = ""
        ],
        "app.change": [
            () => {
                $funBtn.innerHTML = funBtnCont.wiki
                $funBtn.setAttribute("mdui-tooltip", `{content: "WIKI"}`)
                $funBtn.onclick = () => window.open(app.data.get("text", "url.command_page") + app.input.catchName(), "_blank")
            }
        ],
        "app.grammar.finish": [
            () => {
                $funBtn.innerHTML = funBtnCont.copy
                $funBtn.setAttribute("mdui-tooltip", `{content: "COPY"}`)
                $funBtn.onclick = app.input.copy
            }
        ],
        "app.input.copy": [
            () => mdui.snackbar({
                message: "已复制",
                position: window._LITE_MODELL ? "bottom" : "left-top",
                timeout: 2000
            })
        ]
    },
    
    plugin: {
        plugins: {
            option: createWebOptionManager,
            pwa: createPWAManager
        },
        init([ webOption, pwa ]) {
            if (webOption) app.option = webOption.init(res => app.initialize(res))
            if (pwa && !pwa._noServiceWorker) app.pwa = pwa
        }
    }
})
