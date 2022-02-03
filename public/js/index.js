import App from "./core/main.js"
import createWebOptionManager from "./src/plugins/option.js"
import createPWAManager from "./src/plugins/pwa.js"

// App
window.app = new App({
    DEFAULT_LANGUAGE: "zh-CN",
    DEFAULT_THEME_COLOR: {
        primary: "indigo",
        accent: "pink"
    },
    
    $input: document.querySelector("#edit"),
    $function: document.querySelector("#function"),
    $grammar: document.querySelector("#grammar"),
    $note: document.querySelector("#note"),
    $list: document.querySelector("#list"),
    _funIcon: {
        wiki: `<i class="mdui-icon material-icons mdui-text-color-theme-icon">send</i>`,
        copy: `<i class="mdui-icon material-icons mdui-text-color-theme-icon">content_copy</i>`
    },
    
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
    
    list: {
        template: {
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
        custom: {
            urls: [
                "/js/src/custom/dev.js"
            ]
        }
    }
})

// Plugins
Promise.all([
    createWebOptionManager(app),
    createPWAManager(app)
]).then(([webOption, pwa]) => {
    if (webOption) app.option = webOption.init(app.initialize)
    if (pwa && !pwa._noServiceWorker) app.pwa = pwa
}).catch(console.error)

// Scripts
function handler(getter, item) {
    const fixReg = /^(?<name>.+)\.(?<subname>.+)$/
    const { groups: { name, subname, option } } = item.match(fixReg)
    const result = getter.searchFrom(name, getter.catchInput(-2), i => `${name}{${i}}.${subname}`)
    return result
}