import { each, importDefault, stringToNode } from "@/util/index.js"
import { Dialog } from "@/util/mdui.js"

export class InputDialog extends Dialog {
    constructor({
        title,
        item = {},
        onConfirmWithData = e => e,
        dialogOpenOnCancel,
        updateMode = false
    }) {
        const urlItem = stringToNode(`
            <div class="mdui-panel-item">
                <div class="mdui-panel-item-header">
                    <div class="mdui-panel-item-title" style="width: auto;">通过 URL 加载</div>
                    <i class="mdui-panel-item-arrow mdui-icon material-icons">keyboard_arrow_down</i>
                </div>
                <div class="mdui-panel-item-body">
                    <div class="mdui-textfield mdui-textfield-floating-label mdui-textfield-black-theme mdui-p-t-0">
                        <label class="mdui-textfield-label">URL</label>
                        <input class="mdui-textfield-input" type="url" />
                    </div>
                </div>
            </div>
        `)
        const addNoteToUrlItem = (...notes) => {
            const urlItemBody = urlItem.querySelector(".mdui-panel-item-body")
            each(notes.reverse(), note => {
                const p = document.createElement("p")
                p.innerText = note
                urlItemBody.insertBefore(p, urlItemBody.firstChild)
            })
        }
        const fileItem = stringToNode(`
            <div class="mdui-panel-item">
                <div class="mdui-panel-item-header">
                    <div class="mdui-panel-item-title" style="width: auto;">上传文件</div>
                    <i class="mdui-panel-item-arrow mdui-icon material-icons">keyboard_arrow_down</i>
                </div>
                <div class="mdui-panel-item-body">
                    <input type="file" />
                </div>
            </div>
        `)
        const content = stringToNode(`<div class="mdui-panel mdui-panel-gapless"></div>`)
        if (updateMode) {
            // TODO -> ./Updater.class.js
            // addNoteToUrlItem(
            //     `当前 URL ：${ item.__url ?? "（无）" }`,
            //     `你可以重新输入以替换原有链接，或输入 "__delete__" 删除原有链接`
            // )
            if (item.__url) urlItem.classList.add("mdui-panel-item-open")
            else fileItem.classList.add("mdui-panel-item-open")
            content.append(urlItem, fileItem)
        } else {
            // TODO -> ./Updater.class.js
            // addNoteToUrlItem("提示：使用 URL 加载会在页面刷新且网络允许时自动检查更新")
            urlItem.classList.add("mdui-panel-item-open")
            content.append(urlItem, fileItem)
        }
        super({
            title,
            content,
            buttons: [
                {
                    text: "取消",
                    onClick: () => {
                        this.close().destroy({ thenOpen: dialogOpenOnCancel })
                    }
                },
                {
                    text: "确认",
                    close: false,
                    onClick: () => {
                        this.getData().then(data => {
                            if (data) onConfirmWithData(data)
                            else if (data !== 0) this.alert("请输入文件链接或上传文件")
                        }).catch(console.error)
                    }
                }
            ]
        })
        const panel = new mdui.Panel(this.dialog.$content.querySelector(".mdui-panel"), { accordion: true })
    }
    static async initData(value, _data = {}) {
        const { file, url } = value
        if (file.type === "application/json") {
            const fileString = await file.text()
            return await getData(() => JSON.parse(fileString), file, url)
        } else if (file.type === "text/javascript") {
            if (core.option.getItemVal("jsExtensions")) {
                const objURL = URL.createObjectURL(file)
                return await getData(async () => await importDefault(objURL), file, url, _data)
            } else {
                const error = {
                    __error: "DISABLE_JS_EXTENSION_PACKS",
                    __errMsg: "当前设置不允许加载使用 JavaScript 编写的第三方扩展包",
                }
                return Object.assign(_data, error)
            }
        }
    }
    async getData() {
        const value = await this.value()
        if (value) {
            const data = await InputDialog.initData(value)
            if (data.__error) {
                this.alert(data.__errMsg)
                return 0
            } else return data
        }
    }
    async value() {
        for (const input of this.dialog.$element[0].querySelectorAll("input")) {
            if (input.type === "file") {
                const file = input.files[0]
                if (file) return {
                    file,
                    url: null
                }
                else continue
            } else {
                if (input.value) {
                    const res = await fetch(url)
                    const type = res.headers.get("Content-Type")
                    const fileString = await res.text()
                    return {
                        file: new File([ fileString ], url.split("/").at(-1), { type }),
                        url
                    }
                }
                else continue
            }
        }
    }
}

async function getData(fn, file, url, _data = {}) {
    let data
    try {
        data = await fn()
        data.__file = file
        if (url) data.__url = url
    } catch (err) {
        data = {
            __error: err,
            __errMsg: err
        }
    }
    return Object.assign(_data, data)
}
