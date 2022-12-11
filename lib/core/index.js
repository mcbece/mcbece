import { addValueChangeListener, each } from "@/util/index.js"
import { defAppInitConfig } from "./defConfig.js"
import Config from "./src/config/index.js"
import newEvent from "./src/event/index.js"
import newData from "./src/data/index.js"
import newList from "./src/list/index.js"
import newInput from "./src/input/index.js"
import newGrammar from "./src/grammar/index.js"
import newPlugin from "./src/plugin/index.js"

export default class {
    constructor(config) {
        this.config = new Config(config)
        this.event = newEvent(this)
        this.data = newData(this)
        this.list = newList(this)
        this.input = newInput(this)
        this.grammar = newGrammar(this)
        this.plugin = newPlugin(this)
        
        this.plugin.init().then(() => {
            this.config.init()
            this._inputListenerConfig = addValueChangeListener(this.config.$input, () => {
                this.event.emit("app.input", this.config.$input.value)
                if (this.inited) this.change()
            }, {
                debounce: this.plugin.has(/^(.+):option$/)
                    ? this.plugin.get(/^(.+):option$/).getItem("inputDebounce")
                    : false 
            })
        }).then(() => {
            this.event.emit("app.construct.end")
            if (this.plugin.has(/^(.+):option$/)) this.event.emit("app.reoption")
        }).catch(console.error)
    }
    init(args = defAppInitConfig) {
        const { lang, branch } = args
        this.inited = false
        this.data.init(lang, branch).then(() => {
            this.clear(args)
            this.event.emit("app.init", args, this.config)
            this.i18n()
        }).then(() => {
            this.event.emit("app.init.end", args, this.config)
            this.inited = true
            this.change()
        }).catch(console.error)
    }
    i18n() {
        const getText = (...args) => this.data.get("text", ...args)
        document.title = getText("title")
        each(document.querySelectorAll("[data-i18n]"), ele => ele.innerHTML = getText(ele.getAttribute("data-i18n")))
        this.event.emit("app.i18n", getText, this.config)
    }
    clear(args = {}) {
        const { $list, $grammar, $note, $input } = this.config
        this.event.emit("app.clear", args)
        if (args.clearInput) $input.value = ""
        this.input.keyboardContral.clear()
        this.list.clear()
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
