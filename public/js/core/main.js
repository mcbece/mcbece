import { each, addValueChangedListener } from "./util/common.js"
import __Data__ from "./src/data/index.js"
import __Input__ from "./src/input/index.js"
import __List__ from "./src/list/index.js"
import __Grammar__ from "./src/grammar/index.js"

export default class {
    constructor(config) {
        this.config = config
        this.data = new __Data__(this)
        this.input = new __Input__(this)
        this.list = new __List__(this)
        this.grammar = new __Grammar__(this)
        
        this.initialize = this.initialize.bind(this)
        this.change = this.change.bind(this)
        
        if (this.config.plugin) Promise.all(this.config.plugin.plugins.map(e => e(this)))
            .then(result => this.config.plugin.handler(result, this))
            .catch(console.error)
    }
    initialize({ lang, branch, customURL, listWithImage }) {
        this.data.init(lang, branch, this.config.data.url, customURL).then(() => {
            this.list.withImage = listWithImage
            this.config.onI18n(this.data.get.bind(this, "text"))
            this.config.onInit()
            addValueChangedListener(this.config.$input, () => {
                this.change()
                this.list.search()
                each(this.config.onInput || [], listener => listener())
            }, true)
            this.change()
        }).catch(console.error)
    }
    clear() {
        const { $list, $grammar, $note, $funBtn } = this.config
        if (this._useVirtualScroll) {
            document.querySelector(".virtual-scroll").removeEventListener("scroll", this._onScroll)
            window.removeEventListener("resize", this._onScroll)
        }
        this.config.$list.innerHTML = ""
        this.list.names = {}
        $grammar.innerHTML = ""
        $note.innerHTML = ""
        $funBtn.innerHTML = ""
    }
    change() {
        const { $list, $grammar, $note } = this.config
        this.toggleFunIcon(false, this.data.get("text", "url.command_page") + this.input.catchName())
        if (this.input.catchInput().length === 1) {
            this.list.load("command")
            $grammar.innerHTML = ""
            $note.innerHTML = this.data.get("text", "edit.begin")
            this.list.search()
            return
        }
        const result = this.grammar.load(this.input.catchName())
        if (result._finish) {
            $list.innerHTML = ""
            $grammar.innerHTML = ""
            $note.innerHTML = result.note || this.data.get("text", "edit.end")
            this.list.names = {}
            this.toggleFunIcon(true)
        } else if (result._undefined) {
            $list.innerHTML = ""
            $note.innerHTML = "未知的命令"
            this.list.names = {}
        }
        else this.list.load(result.list ?? "")
        this.list.search()
    }
    toggleFunIcon(editEnd, url) {
        const { $funBtn, _funIcon } = this.config
        if (editEnd) {
            $funBtn.innerHTML = _funIcon.copy
            $funBtn.setAttribute("mdui-tooltip", `{content: "COPY"}`)
            $funBtn.onclick = this.input.copy
        } else {
            $funBtn.innerHTML = _funIcon.wiki
            $funBtn.setAttribute("mdui-tooltip", `{content: "WIKI"}`)
            $funBtn.onclick = () => window.open(url, "_blank")
        }
    }
}