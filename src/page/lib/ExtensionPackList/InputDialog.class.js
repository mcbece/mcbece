import { each, importDefault, stringToNode, nodeToString } from "@/util/index.js"

export class InputDialog {
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
        if (!updateMode) {
            // TODO -> ./Updater.class.js
            // addNoteToUrlItem("提示：使用 URL 加载会在页面刷新且网络允许时自动检查更新")
            urlItem.classList.add("mdui-panel-item-open")
            content.append(urlItem, fileItem)
        } else {
            // TODO -> ./Updater.class.js
            // addNoteToUrlItem(
            //     `当前 URL ：${ item.__url ?? "（无）" }`,
            //     `你可以重新输入以替换原有链接，或输入 "__delete__" 删除原有链接`
            // )
            if (item.__url) urlItem.classList.add("mdui-panel-item-open")
            else fileItem.classList.add("mdui-panel-item-open")
            content.append(urlItem, fileItem)
        }
        this.dialog = mdui.dialog({
            title,
            destroyOnClosed: false,
            modal: true,
            closeOnEsc: false,
            content: nodeToString(content),
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
                            else {
                                this.close()
                                mdui.alert("请输入文件链接或上传文件", () => this.open())
                            }
                        }).catch(console.error)
                    }
                }
            ]
        })
        const panel = new mdui.Panel(this.dialog.$element[0].querySelector(".mdui-panel"), { accordion: true })
    }
    open() {
        this.dialog.open()
        return this
    }
    close() {
        this.dialog.close()
        return this
    }
    alert(message) {
        this.close()
        mdui.alert(message, () => this.open())
    }
    destroy({ thenOpen: dialogToOpen }) {
        dialogToOpen.$element.one("opened.mdui.dialog", () => {
            this.dialog.destroy()
        })
        dialogToOpen.open()
    }
    async getData() {
        const { url, file } = this.values
        if (url) {
            const data = await importDefault(url)
            const fileString = await (await fetch(url)).text()
            data.__url = url
            data.__file = new File([ fileString ], url.split("/").at(-1), { type: "text/javascript" })
            return data
        } else if (file) {
            const objURL = URL.createObjectURL(file)
            const data = await importDefault(objURL)
            data.__file = file
            return data
        }
    }
    get values() {
        const output = {}
        each(this.dialog.$element[0].querySelectorAll("input"), input => {
            if (input.type === "file") output.file = input.files[0]
            else output.url = input.value
        })
        return output
    }
}
