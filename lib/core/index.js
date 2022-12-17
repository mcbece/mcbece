import { addValueChangeListener, each } from "@/util/index.js"
import Config from "./src/config/index.js"
import Event from "./src/event/index.js"
import Data from "./src/data/index.js"
import List from "./src/list/index.js"
import Input from "./src/input/index.js"
import Grammar from "./src/grammar/index.js"
import Plugin from "./src/plugin/index.js"

export default class {
    constructor(config) {
        this.config = new (Config(this))(config)
        this.event = new (Event(this))()
        this.data = new (Data(this))()
        this.list = new (List(this))()
        this.input = new (Input(this))()
        this.grammar = new (Grammar(this))()
        this.plugin = new (Plugin(this))()
        
        this.plugin.init().then(() => {
            this.config.init()
            this._inputListenerConfig = addValueChangeListener(this.config.$input, () => {
                this.event.emit("app.input", this.config.$input.value)
                if (this.inited) this.change()
            }, {
                debounce: this.plugin.get(/^(.+):option$/).getItemVal("inputDebounce")
            })
        }).then(() => {
            this.event.emit("app.construct.end")
        }).catch(console.error)
    }
    init(args = {}) {
        this.inited = false
        this.data.init().then(() => {
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
