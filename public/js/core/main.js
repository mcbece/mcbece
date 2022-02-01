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
    }
    get useVirtualScroll() {
        return !!(document.querySelector(".virtual-scroll"))
    }
    initialize({ lang, branch, customURL }) {
        this.data.init(this.config.data.url, lang, branch, customURL).then(() => {
            this.config.i18n(this.data.get.bind(this, "text"))
            this.config.init(this)
            this.config.$input.oninput = () => {
                this.change()
                this.list.search()
            }
            this.change()
            document.body.classList.remove("loading")
        }).catch(console.error)
    }
    change() {
        this.toggleFunIcon(false, this.data.get("text", "url.command_page") + this.input.catchName())
        if (this.input.catchInput().length === 1) {
            this.list.load("command")
            this.config.$grammar.innerHTML = ""
            this.config.$note.innerHTML = this.data.get("text", "edit.begin")
            return
        }
        const result = this.grammar.load(this.input.catchName())
        if (result.finish) {
            this.config.$list.innerHTML = ""
            this.config.$grammar.innerHTML = ""
            this.config.$note.innerHTML = this.data.get("text", "edit.end")
            this.list.names = {}
            this.toggleFunIcon(true)
        } else if (result.undefined) {
            this.config.$list.innerHTML = ""
            this.config.$note.innerHTML = "未知的命令"
            this.list.names = {}
        }
        else this.list.load(result.list ?? "")
        this.list.search()
    }
    clear() {
        console.log(true)
        this.config.$list.innerHTML = ""
        this.config.$grammar.innerHTML = ""
        this.config.$note.innerHTML = ""
        this.config.$function.innerHTML = ""
    }
    toggleFunIcon(editEnd, url) {
        const { $function, _funIcon } = this.config
        if (editEnd) {
            $function.innerHTML = _funIcon.copy
            $function.setAttribute("mdui-tooltip", `{content: "COPY"}`)
            $function.onclick = this.input.copy
        } else {
            $function.innerHTML = _funIcon.wiki
            $function.setAttribute("mdui-tooltip", `{content: "WIKI"}`)
            $function.onclick = () => window.open(url, "_blank")
        }
    }
}