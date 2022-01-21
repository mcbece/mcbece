import { replaceString, getJsonData } from "./util/common.js"
import __data__ from "./src/data/index.js"
import __input__ from "./src/input/index.js"
import __list__ from "./src/list/index.js"
import __grammar__ from "./src/grammar/index.js"

export default class {
    constructor(config) {
        this.config = config
        this.data = new __data__(this)
        this.input = new __input__(this)
        this.list = new __list__(this)
        this.grammar = new __grammar__(this)
        
        this.initialize = this.initialize.bind(this)
        this.change = this.change.bind(this)
    }
    initialize({ lang, branch }) {
        getJsonData(replaceString(this.config.data.url, {lang, branch})).then(data => {
            this.data[lang] = data
            if (lang !== this.config.DEFAULT_LANGUAGE) return getJsonData(replaceString(this.config.data.url, { lang: this.config.DEFAULT_LANGUAGE, branch })).then(dataDef => {
                this.data[this.config.DEFAULT_LANGUAGE] = dataDef
            })
        }).then(() => {
            
            // TODO i18n
            loadText.call(this)
            
            // TODO 这里不是很合理的样子，等再改改
            if (screen.height < 800) {
                // document.body.classList.add("lite")
                // this.thin_model = true
            }
            
            if (this.LANG === "en") this.config.$grammar.classList.add("minecraft-font")
            this.config.$input.oninput = () => {
                this.change()
                this.list.search()
            }
            this.change()
        })
        
        // TODO i18n
        function loadText() {
            let getText = this.data.getText
            document.title = getText("title")
            this.config.$input.placeholder = getText("input")
        }
    }
    change() {
        document.querySelector("#wiki").href = this.data.getText("url.command_page") + this.config.$input.value.split(" ")[0]  // FIXME
        this.editEnd = false
        this.input.copy("display")
        if (this.config.$input.value.split(" ").length === 1) {
            this.list.load("command")
            this.config.$grammar.innerHTML = ""
            this.config.$note.innerHTML = this.data.getText("edit.begin")
            return
        }
        let result = this.grammar.load(this.input.catchName())
        if (result.finish) {
            this.config.$list.innerHTML = ""
            this.config.$grammar.innerHTML = ""
            this.config.$note.innerHTML = this.data.getText("edit.end")
            this.editEnd = true
            this.list.names = {}
            this.input.copy("display")
        } else if (result.undefined) {
            this.config.$list.innerHTML = ""
            this.list.names = {}
            this.config.$note.innerHTML = "未知的命令"
        }
        else this.list.load(result.list)
    }
}