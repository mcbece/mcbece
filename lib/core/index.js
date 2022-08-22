import { each } from "@util/index.js"
import __Config__ from "./src/config/index.js"
import __Data__ from "./src/data/index.js"
import __List__ from "./src/list/index.js"
import __Input__ from "./src/input/index.js"
import __Grammar__ from "./src/grammar/index.js"
import __Event__ from "./src/event/index.js"
import __Plugin__ from "./src/plugin/index.js"

export default class {
    constructor(config) {
        this.config = new __Config__(config)
        this.data = new __Data__(this)
        this.list = new __List__(this)
        this.input = new __Input__(this)
        this.grammar = new __Grammar__(this)
        this.event = new __Event__(this)
        this.plugin = new __Plugin__(this)
    }
    initialize(args = defInitConfig) {
        const { lang, branch, customURL } = args
        this.initialized = false
        this.data.init(lang, branch, this.config.get("data.url"), customURL).then(() => {
            this.clear(args)
            this.event.emit("app.init", args, this.config)
            this.i18n()
        }).then(() => {
            this.event.emit("app.init.end", args, this.config)
            this.initialized = true
            this.change()
        }).catch(console.error)
    }
    i18n() {
        const getText = this.data.get.bind(this, "text")
        document.title = getText("title")
        each(document.querySelectorAll("[data-i18n]"), ele => ele.innerHTML = getText(ele.getAttribute("data-i18n")))
        this.event.emit("app.i18n", getText, this.config)
    }
    clear(args = {}) {
        const { $list, $grammar, $note, $input } = this.config
        this.event.emit("app.clear", args)
        if (args.clearInput) $input.value = ""
        this.input.contral.clear()
        this.list.clear(args.autoClearSearchCache)
        $grammar.innerHTML = ""
        $note.innerHTML = ""
    }
    change() {
        const { $list, $grammar, $note } = this.config
        this.event.emit("app.change")
        if (this.input.catchInput().length === 1) {
            this.state = "load"
            this.list.load("command")
            $grammar.innerHTML = ""
            $note.innerHTML = this.data.get("text", "edit.begin")
            this.list.search()
        } else {
            const result = this.grammar.load(this.input.catchName())
            if (result._finish) {
                this.state = "finish"
                this.event.emit("app.grammar.finish")
                this.list.clear()
                $grammar.innerHTML = ""
                $note.innerHTML = result.note ?? this.data.get("text", "edit.end")
            } else if (result._undefined) {
                this.state = "undefined"
                this.event.emit("app.grammar.undefined")
                this.list.clear()
                $note.innerHTML = "未知的命令"
            } else {
                this.state = "load"
                this.list.load(result.list ?? "")
                this.list.search()
            }
        }
        this.event.emit("app.change.end")
    }
}

const defInitConfig = {
    lang: "zh_cn",
    branch: "vanilla"
}
