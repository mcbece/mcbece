import App from "./core/index.js"
import { toString, stringToNode, getReturn } from "./core/util/common.js"
import { setThemeColor, snackbar } from "./src/mdui.js"
import { isAprilFools } from "./src/util.js"
import { WebOption } from "./lib/WebOption.class.js"

// Plugins
import createWebOptionManager from "./src/plugins/option.js"
import createUserDataManager from "./src/plugins/user.js"
import createPWAManager from "./src/plugins/pwa.js"

window.app = new App({
    DEFAULT_LANGUAGE: "zh-CN",
    DEFAULT_BRANCH: "vanilla",
    
    $input: document.querySelector("#edit"),
    $grammar: document.querySelector("#grammar"),
    $note: document.querySelector("#note"),
    $list: document.querySelector("#list"),
    
    list: {
        _useVirtualScroll: true,
        _useDivider: !window._LITE_MODEL,
        get _height() {
            const _fix1 = window._LITE_MODEL ? 85 : 120
            const _fix2 = _page.collapses.header.$element[0].querySelector(".mdui-collapse-item-open")
                ? window._LITE_MODEL ? 45 : 90
                : 0
            return document.documentElement.clientHeight - _fix1 - _fix2
        },
        get _itemHeight() {
            if (window._LITE_MODEL) {
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
                        ${ window._LITE_MODEL ? "" : renderer.get("image") }
                        <div class="mdui-list-item-content">
                            <div class="mdui-list-item-title minecraft-font" id="name">${renderer.get("name")}</div>
                            <div class="mdui-list-item-text mdui-list-item-one-line" id="info">${renderer.get("info")}</div>
                        </div>
                        ${ window._LITE_MODEL ? "" : renderer.get("url") }
                    </li>
                `.trim())
                item.onclick = () => {
                    eval(renderer.get("input") || "")
                    getReturn(renderer.get("onclick"))
                }
                return item
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
                    return `
                        <div class="mdui-list-item-avatar" id="image">
                            <img src="${url}" />
                        </div>
                    `
                }
            },
            input: {
                callbackFun(input) {
                    return `app.input.input(${toString(input)})`
                }
            },
            url: {
                callbackFun(url) {
                    return `
                        <a class="mdui-btn mdui-btn-icon mdui-list-item-things-display-when-hover" href="${url}" target="_blank">
                            <i class="mdui-icon material-icons mdui-text-color-black-icon">import_contacts</i>
                        </a>
                    `
                }
            }
        }
    },
    
    data: {
        url: "/api/mcbelist.{lang}.{branch}.min.js",
        custom: [
            "/js/custom/example.min.js"
        ]
    },
    
    event: {
        "app.init": [
            () => {
                if (app.LANG === "en") app.config.$grammar.classList.add("minecraft-font")
                if (isAprilFools()) setThemeColor({
                    primary: [app.option._getItem("themePrimaryColor").selected, "green"],
                    accent: [app.option._getItem("themeAccentColor").selected, "red"]
                })
            }
        ],
        "app.init.end": [
            args => {
                app.config.$input.value = args.userData.inputting
                app.event.emit("app._history.add")
                document.body.classList.remove("loading")
            }
        ],
        "app.i18n": [
            getText => app.config.$input.placeholder = getText("input")
        ],
        "app.clear": [
            args => {
                _page.toolbar.clear()
                if (args.autoClearSearchCache) app.list.searchCache.clear()
            }
        ],
        "app.change": [
            () => {
                _page.toolbar.load("wiki")
            }
        ],
        "app.grammar.finish": [
            () => {
                _page.toolbar.load("love", "wiki", "run", "__", "copy")
            }
        ],
        "app.input.love": [
            () => snackbar("?????????")
        ],
        "app.input.copy": [
            () => snackbar("?????????")
        ],
        "app.reoption": [
            () => {
                document.body.classList.add("loading")
                
                document.body.style.paddingTop = _page.collapses.header.$element[0].querySelector(".mdui-collapse-item-open")
                    ? window._LITE_MODEL ? "90px" : "180px"
                    : window._LITE_MODEL ? "45px" : "120px"
                
                app.initialize({
                    ...app.option.getItemValMap(),
                    userData: app._userData.getItemValMap()
                })
            }
        ]
    },
    
    plugin: {
        plugins: [
            createWebOptionManager,
            createPWAManager,
            createUserDataManager
        ],
        init([ option, pwa, user]) {
            WebOption.initAll(option, user).then(() => {
                app.option = option
                app._userData = user
                app.event.emit("app.reoption")
            }).catch(console.error)
            if (pwa && !pwa._noServiceWorker) app.pwa = pwa
        }
    }
})
