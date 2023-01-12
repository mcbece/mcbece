import { deepEqual } from "fast-equals"
import { each, getReturn, stringToNode } from "@/util/index.js"
import { hasLoved } from "@/util/page.js"

const $funBtn = document.querySelector("#function")
const $toolbar = document.querySelector("#toolbar")
const $arrow = document.querySelector("#header .mdui-collapse-item-header")
const ALL_TOOLS = {
    copy: {
        icon: "content_copy",
        onclick: () => {
            const cont = core.config.$input.value
            core.input.copy()
            app.gui.history.add(cont)
        }
    },
    wiki: {
        icon: "import_contacts",
        onclick: () => window.open(core.data.get("text", "url.command_page") + core.input.catchName(), "_blank")
    },
    love: {
        icon() {
            const cont = core.config.$input.value
            return hasLoved(cont) ? "favorite" : "favorite_border"
        },
        onclick() {
            const cont = core.config.$input.value
            app.gui.history.add(cont)
            app.gui.history.toogleLoveState(cont)
            this.querySelector("i").innerText = getReturn(ALL_TOOLS.love.icon)
        }
    },
    run: {
        icon: "send",
        onclick: () => alert("开发中")
    }
}

export default {
    load(...toolNames) {
        if (!toolNames.length || core.input.catchName().startsWith("@")) return this.clear()
        if (deepEqual(this._names, toolNames)) return
        this.clear()
        this._names = toolNames
        if (toolNames.length === 1) {
            const tool = ALL_TOOLS[toolNames[0]]
            $funBtn.innerHTML = tmpl(tool, { onlyIcon: true })
            $funBtn.onclick = tool.onclick.bind($funBtn)
            $funBtn.style.display = ""
        } else {
            each(toolNames, name => {
                const tool = ALL_TOOLS[name]
                const ele = name === "__" ? stringToNode(`<div class="mdui-toolbar-spacer"></div>`) : tmpl(tool)
                $toolbar.appendChild(ele)
            })
            this._openCollapse()
        }
    },
    reload() {
        const toolNames = this._names
        if (toolNames.length === 1) {
            const tool = ALL_TOOLS[toolNames[0]]
            $funBtn.innerHTML = tmpl(tool, { onlyIcon: true })
            $funBtn.onclick = tool.onclick.bind($funBtn)
            $funBtn.style.display = ""
        } else {
            $toolbar.innerHTML = ""
            each(toolNames, name => {
                const tool = ALL_TOOLS[name]
                const ele = name === "__" ? stringToNode(`<div class="mdui-toolbar-spacer"></div>`) : tmpl(tool)
                $toolbar.appendChild(ele)
            })
        }
    },
    clear() {
        this._names = []
        $funBtn.innerHTML = ""
        $funBtn.onclick = ""
        $funBtn.style.display = "none"
        $toolbar.innerHTML = ""
        this._closeCollapse()
    },
    _closeCollapse() {
        $arrow.style.display = "none"
        app.gui.collapses.header.close(0)
    },
    _openCollapse() {
        $arrow.style.display = ""
        app.gui.collapses.header.open(0)
    }
}

function tmpl(tool, { onlyIcon }) {
    const icon = getReturn(tool.icon)
    if (onlyIcon) return `<i class="mdui-icon material-icons mdui-text-color-theme-icon">${icon}</i>`
    const btn = stringToNode(`
        <button class="mdui-btn mdui-btn-icon mdui-ripple">
            <i class="mdui-icon material-icons mdui-text-color-theme-icon">${icon}</i>
        </button>
    `)
    btn.onclick = tool.onclick.bind(btn)
    return btn
}
