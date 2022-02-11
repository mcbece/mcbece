import { each, addValueChangedListener, objectGet } from "./util/common.js"
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
        
        if (objectGet(this.config, "plugin")) Promise.all(objectGet(this.config, "plugin.plugins", []).map(e => e(this)))
            .then(result => objectGet(this.config, "plugin.handler", () => {})(result, this))
            .catch(console.error)
    }
    initialize({ lang, branch, customURL, listWithImage }) {
        this.clear()
        this.data.init(lang, branch, objectGet(this.config, "data.url", ""), customURL).then(() => {
            this.list.withImage = listWithImage
            this.i18n()
            objectGet(this.config, "onInit", () => {})()
            addValueChangedListener(this.config.$input, () => {
                this.change()
                each(objectGet(this.config, "onInput", []), listener => listener())
            }, true)
            this.change()
        }).catch(console.error)
    }
    i18n() {
        const getText = this.data.get.bind(this, "text")
        document.title = getText("title")
        each(document.querySelectorAll("[data-i18n]"), item => item.innerHTML = getText(item.getAttribute("data-i18n")))
        const onI18n = objectGet(this.config, "onI18n") ?? new Function()
        onI18n.call(this.config, getText)
    }
    clear(clearInput) {
        const { $list, $grammar, $note, $funBtn, $input } = this.config
        if (clearInput) $input.value = ""
        if (this.list._useVirtualScroll()) this.list._vs?.destroy()
        $list.innerHTML = ""
        this.list = new __List__(this)
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