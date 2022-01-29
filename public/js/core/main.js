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
    initialize({ lang, branch }) {
        this.data.init(this.config.data.url, lang, branch).then(() => {
            this.config.i18n(this.data.get.bind(this, "text"))
            this.config.init(this)
            this.config.$input.oninput = () => {
                this.change()
                this.list.search()
            }
            this.change()
        }).catch(console.error)
    }
    change() {
        document.querySelector("#wiki").href = this.data.get("text", "url.command_page") + this.input.catchName()
        this.editEnd = false
        this.input.copy("display")
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
            this.editEnd = true
            this.input.copy("display")
        } else if (result.undefined) {
            this.config.$list.innerHTML = ""
            this.config.$note.innerHTML = "未知的命令"
            this.list.names = {}
        }
        else this.list.load(result.list ?? "")
        this.list.search()
    }
}