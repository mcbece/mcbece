import { each, addValueChangedListener, objectGet, mapObject } from "./util/common.js"
import __Data__ from "./src/data/index.js"
import __Input__ from "./src/input/index.js"
import __List__ from "./src/list/index.js"
import __Grammar__ from "./src/grammar/index.js"
import __Event__ from "./src/event/index.js"

export default class {
    constructor(config) {
        this.config = config
        this.data = new __Data__(this)
        this.input = new __Input__(this)
        this.list = new __List__(this)
        this.grammar = new __Grammar__(this)
        this.event = new __Event__(this)
        
        if (this.config.plugin) Promise.all(Object.values(mapObject(this.config.plugin.plugins ?? {}, (key, plugin) => {
            const result = plugin(this)
            this.event.emit("app.plugin.load", key, result)
            return [ key, result ]
        }))).then(result => {
            const init = (this.config.plugin.init ?? new Function()).bind(this.config.plugin)
            init(result, this)
            this.event.emit("app.plugin.init", result)
            addValueChangedListener(this.config.$input, () => {
                this.event.emit("app.input", this.config.$input.value)
                this.change()
            }, true)
        }).catch(console.error)
    }
    initialize(args) {
        const { lang, branch, customURL, listWithImage, _inputing } = args
        this.data.init(lang, branch, objectGet(this.config, "data.url", { _return: "" }), customURL).then(() => {
            this.list.withImage = listWithImage
            this.clear()
            this.event.emit("app.init", args, this.config)
            this.i18n()
            this.config.$input.value = _inputing
        }).catch(console.error)
    }
    i18n() {
        const getText = this.data.get.bind(this, "text")
        document.title = getText("title")
        each(document.querySelectorAll("[data-i18n]"), ele => ele.innerHTML = getText(ele.getAttribute("data-i18n")))
        this.event.emit("app.i18n", getText, this.config)
    }
    clear(clearInput) {
        const { $list, $grammar, $note, $input } = this.config
        this.event.emit("app.clear", clearInput)
        if (clearInput) $input.value = ""
        if (this.list._useVirtualScroll) this.list.__vs?.destroy()
        $list.innerHTML = ""
        this.list.names = {}
        this.list.lists = {}
        this.list.searchCache.clear()
        $grammar.innerHTML = ""
        $note.innerHTML = ""
    }
    change() {
        const { $list, $grammar, $note } = this.config
        this.event.emit("app.change")
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
            $note.innerHTML = result.note ?? this.data.get("text", "edit.end")
            this.list.names = {}
        } else if (result._undefined) {
            $list.innerHTML = ""
            $note.innerHTML = "未知的命令"
            this.list.names = {}
        }
        else this.list.load(result.list ?? "")
        this.list.search()
    }
}
