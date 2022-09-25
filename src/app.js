import App from "@/core/index.js"
import { stringToNode, getReturn } from "@/util/index.js"
import { setThemeColor, snackbar } from "@/util/mdui.js"
import { isAprilFools } from "@/util/date.js"
import { playAudio_v1 } from "@/lib/playAudio.js"

window.app = new App({
    DEFAULT_LANGUAGE: "zh_cn",
    
    $input: document.querySelector("#edit"),
    $grammar: document.querySelector("#grammar"),
    $note: document.querySelector("#note"),
    $list: document.querySelector("#list"),
    
    list: {
        _height() {
            const _fix1 = window._LITE_MODEL ? 85 : 120
            const _fix2 = _page.collapses.header.$element[0].querySelector(".mdui-collapse-item-open")
                ? window._LITE_MODEL ? 45 : 90
                : 0
            return document.documentElement.clientHeight - _fix1 - _fix2
        },
        _itemHeight() {
            if (window._LITE_MODEL) {
                const height = window.innerHeight / 16
                if (height > 36) return 36
                else if (height < 24) return 24
                else return Math.round(height)
            } else return 72
        },
        template: {
            item(_id, _name, i, renderer) {
                const item = stringToNode(`
                    <li class="mdui-list-item mdui-ripple" data-id="${_id}" data-list-name="${_name}" id="${i}">
                        <div class="mdui-list-item-content">
                            <div class="mdui-list-item-title minecraft-font" id="name" style="display: inline-block; margin-right: 8px;">${renderer.get("sprite", { style: "margin-right: 8px;" })}${renderer.get("name")}</div>
                            <div class="mdui-list-item-text mdui-list-item-one-line" id="description">${renderer.get("description")}</div>
                        </div>
                        ${ window._LITE_MODEL ? "" : renderer.get("url") }
                    </li>
                `)
                item.onclick = () => {
                    getReturn(renderer.get("input"))
                    getReturn(renderer.get("onclick"))
                }
                if (renderer.get("active")) item.classList.add("mdui-list-item-active")
                const media = renderer.get("media")
                if (!window._LITE_MODEL && media) {
                    item.insertBefore(media, item.firstChild)
                }
                return item
            },
            highlight(_, $1) {
                return `{Highlight: ${$1}}`
            }
        },
        renderer: {
            media: {
                callbackFun({ type, src, ...setting }) {
                    if (type === "image") {
                        return stringToNode(`
                            <div class="mdui-list-item-avatar" style="border-radius: 10%; border: 1px solid #757575;">
                                <img style="border-radius: inherit;" src="${src}" />
                            </div>
                        `)
                    } else if (type === "audio") {
                        const node = stringToNode(`<i class="mdui-list-item-avatar mdui-icon material-icons mdui-text-color-theme-icon mdui-color-white" style="border-radius: 10%; border: 1px solid #757575;">play_arrow</i>`)
                        const srcArr = Array.isArray(src) ? src : [src]
                        node.addEventListener("click", () => playAudio_v1(srcArr))
                        return node
                    } else {
                        return stringToNode(`<span>${src}</span>`)
                    }
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
        },
        replacer: {
            "Highlight:": {
                directReturn(name) {
                    return `<span class="mdui-text-color-theme-accent">${name}</span>`
                },
                indirectReturn(name) {
                    return name
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
            () => {
                document.body.classList.remove("loading")
            }
        ],
        "app.i18n": [
            getText => app.config.$input.placeholder = getText("input")
        ],
        "app.clear": [
            () => {
                _page.toolbar.clear()
            }
        ],
        "app.change": [
            () => {
                _page.toolbar.load("wiki")
            }
        ],
        "app.grammar.finish": [
            () => {
                _page.toolbar.load("love", "wiki", "__", "copy")
            }
        ],
        "app.input": [
            () => {
                // console.log("input event")
            }
        ],
        "app.input.love": [
            () => snackbar("已收藏")
        ],
        "app.input.copy": [
            () => snackbar("已复制")
        ],
        "app.reoption": [
            () => {
                document.body.classList.add("loading")
                
                document.body.style.paddingTop = _page.collapses.header.$element[0].querySelector(".mdui-collapse-item-open")
                    ? window._LITE_MODEL ? "90px" : "180px"
                    : window._LITE_MODEL ? "45px" : "120px"
                
                app.init({
                    ...app.option.getItemValMap(),
                    userData: app._userData.getItemValMap()
                })
            }
        ],
        "app.list.load": [
            result => {
                console.debug({ listLoadResult: result })
            }
        ],
        "app.list.search": [
            result => {
                //@dev console.debug({ listSearchResult: result })
            }
        ],
        "app.plugin.load": [
            name => {
                console.debug(`Loading plugin: '${name}'.`)
            }
        ]
    },
    
    plugins: {
        allStorage: true,
        colorReplacer: true,
        pwa: true,
        spriteRenderer: true,
        mediaRenderer: true
    }
})
