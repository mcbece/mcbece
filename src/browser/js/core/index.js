import { each, addValueChangedListener, objectGet, mapObject } from "./util/common.js"
import __Data__ from "./src/data/index.js"
import __Input__ from "./src/input/index.js"
import __List__ from "./src/list/index.js"
import __Grammar__ from "./src/grammar/index.js"
import __Event__ from "./src/event/index.js"

export default class {
    constructor(config) {
        this.config = config ?? {}
        this.data = new __Data__(this)
        this.input = new __Input__(this)
        this.list = new __List__(this)
        this.grammar = new __Grammar__(this)
        this.event = new __Event__(this)
        
        Promise.all(
            objectGet(this.config, "plugin.plugins", { _return: [] }).map(plugin => {
                const result = plugin(this)
                this.event.emit("app.plugin.load", result)
                return result
            })
        ).then(result => {
            const init = objectGet(this.config, "plugin.init", { _return: new Function() }).bind(this.config.plugin)
            this.event.emit("app.plugin.init", result)
            init(result, this)
        }).then(() => {
            addValueChangedListener(this.config.$input, () => {
                this.event.emit("app.input", this.config.$input.value)
                this.change()
            }, true)
        }).catch(console.error)
    }
    initialize(args = defInitConfig) {
        const { lang, branch, customURL, listWithImage } = args
        this.data.init(lang, branch, objectGet(this.config, "data.url", { _return: "" }), customURL).then(() => {
            this.list.withImage = listWithImage
            this.clear({ clearInput: false, ...args })
            this.event.emit("app.init", args, this.config)
            this.i18n()
        }).then(() => {
            this.event.emit("app.init.end", args, this.config)
            this.change()
        }).catch(console.error)
    }
    i18n() {
        const getText = this.data.get.bind(this, "text")
        document.title = getText("title")
        each(document.querySelectorAll("[data-i18n]"), ele => ele.innerHTML = getText(ele.getAttribute("data-i18n")))
        this.event.emit("app.i18n", getText, this.config)
    }
    clear(args) {
        const { $list, $grammar, $note, $input } = this.config
        this.event.emit("app.clear", args)
        if (args.clearInput) $input.value = ""
        if (this.list._useVirtualScroll) this.list.__vs?.destroy()
        $list.innerHTML = ""
        this.list.names = {}
        this.list.lists = {}
        $grammar.innerHTML = ""
        $note.innerHTML = ""
    }
    change() {
        const { $list, $grammar, $note } = this.config
        this.event.emit("app.change")
        if (this.input.catchInput().length === 1) {
            this.list.load("command")
            this.grammar._list = [ "command" ]
            $grammar.innerHTML = ""
            $note.innerHTML = this.data.get("text", "edit.begin")
            this.list.search()
        } else {
            const result = this.grammar.load(this.input.catchName())
            if (result._finish) {
                this.event.emit("app.grammar.finish")
                $list.innerHTML = ""
                $grammar.innerHTML = ""
                $note.innerHTML = result.note ?? this.data.get("text", "edit.end")
                this.list.names = {}
                this.list.lists = {}
                if (this.list._useVirtualScroll) this.list.__vs?.destroy()
            } else if (result._undefined) {
                this.event.emit("app.grammar.undefined")
                $list.innerHTML = ""
                $note.innerHTML = "未知的命令"
                this.list.names = {}
                this.list.lists = {}
                if (this.list._useVirtualScroll) this.list.__vs?.destroy()
            } else if (result._load) {
                this.list.load(result.list ?? "")
                this.list.search()
            } else if (result._search) {
                this.list.search()
            }
        }
        this.event.emit("app.change.end")
    }
}

const defInitConfig = {
    lang: "zh-CN",
    branch: "vanilla"
}
