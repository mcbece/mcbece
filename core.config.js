import { stringToNode, getReturn, trimString } from "@/util/index.js"
import { snackbar, setFestivalTheme } from "@/util/mdui.js"
import { setBodyPaddingTop } from "@/util/page.js"
import { playAudio_v1 } from "@/lib/playAudio.js"
import pluginPackage from "@/lib/plugins/index.js"


export default {
    DEFAULT_LANGUAGE: "zh_cn",
    
    $input: document.querySelector("#edit"),
    $grammar: document.querySelector("#grammar"),
    $note: document.querySelector("#note"),
    $list: document.querySelector("#list"),
    
    list: {
        _height() {
            const _fix1 = window._LITE_MODE ? 85 : 120
            const _fix2 = app.gui.collapses.header.$element[0].querySelector(".mdui-collapse-item-open")
                ? window._LITE_MODE ? 45 : 90
                : 0
            return document.documentElement.clientHeight - _fix1 - _fix2
        },
        _itemHeight() {
            if (window._LITE_MODE) {
                if (core.plugin.get(/^(.+):option$/).getItemVal("liteModeFixedListItemHeight")) return 36
                else {
                    const height = window.innerHeight / 16
                    if (height > 36) return 36
                    else if (height < 24) return 24
                    else return Math.round(height)
                }
            } else return 72
        },
        template: {
            item(renderer, _id, _name, i) {
                const item = stringToNode(trimString(`
                    <li class="mdui-list-item mdui-ripple" data-id="${_id}" data-list-name="${_name}" id="${i}">
                        <div class="mdui-list-item-content">
                            <div class="mdui-list-item-title minecraft-font" id="name" style="display: inline-block; margin-right: 8px;">
                                ${ renderer.get("sprite", { style: "margin-right: 8px;" }) }
                                ${ renderer.get("name") }
                            </div>
                            <div class="mdui-list-item-text mdui-list-item-one-line" id="description">
                                ${ renderer.get("description") }
                            </div>
                        </div>
                        ${ window._LITE_MODE ? "" : renderer.get("url") }
                    </li>
                `))
                item.querySelector(".mdui-list-item-content").onclick = () => {
                    getReturn(renderer.get("input"))
                    getReturn(renderer.get("onclick"))
                }
                if (renderer.get("active")) item.classList.add("mdui-list-item-active")
                const media = renderer.get("media")
                if (!window._LITE_MODE && media) {
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
                            <i class="mdui-icon material-icons mdui-text-color-theme-icon">import_contacts</i>
                        </a>
                    `
                }
            }
        },
        replacer: {
            "Highlight:": {
                directReturn(name) {
                    return `<span class="mdui-text-color-theme-accent-revise-primary">${name}</span>`
                },
                indirectReturn(name) {
                    return name
                }
            }
        }
    },
    
    data: {
        url: "/api/mcbelist.{lang}.{branch}.min.js",
        extensionPacks: [
            "/js/extensions/example.min.js",
            "/js/extensions/dev.min.js",
        ]
    },
    
    event: {
        "core.construct.end": [
            () => core.event.emit("core.reoption")
        ],
        "core.init": [
            () => {
                if (core.LANG === "en") core.config.$grammar.classList.add("minecraft-font")
            }
        ],
        "core.init.end": [
            () => document.body.classList.remove("loading")
        ],
        "core.i18n": [
            getText => core.config.$input.placeholder = getText("input")
        ],
        "core.clear": [
            () => app.gui.toolbar.clear()
        ],
        "core.change": [
            () => app.gui.toolbar.load("wiki")
        ],
        "core.grammar.finish": [
            () => app.gui.toolbar.load("love", "wiki", "__", "copy")
        ],
        "core.input.love": [
            () => snackbar("已收藏")
        ],
        "core.input.copy": [
            () => snackbar("已复制")
        ],
        "core.reoption": [
            () => {
                document.body.classList.add("loading")
                
                setFestivalTheme(core.option)
                setBodyPaddingTop()
                
                core.init()
            }
        ],
        "core.list.load": [
            result => {
                console.debug({ listLoadResult: result })
            }
        ],
        "core.list.search": [
            result => {
                //@dev console.debug({ listSearchResult: result })
            }
        ],
        "core.plugin.load": [
            name => {
                console.debug(`Loading plugin: '${name}'.`)
            }
        ]
    },
    
    plugins: {
        packages: [ pluginPackage ],
        groups: {
            storage: true,  // Internal
            storage_extend: true,
            colorReplacer: true,
            pwa: true,
            spriteRenderer: true,
            mediaRenderer: true
        }
    }
}
