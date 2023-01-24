import deepCopy from "fast-copy"
import { each, stringToNode, getReturn } from "@/util/index.js"
import { Dialog, snackbar } from "@/util/mdui.js"

export class DetailDialog extends Dialog {
    constructor(data, extensionPackList) {
        super({
            title: "详细信息",
            content: genContent(data),
            buttons: [
                {
                    text: "更新",
                    onClick: () => extensionPackList.updater.dialog(data, this)
                },
                {
                    text: "删除",
                    onClick: () => this.remove()
                },
                {
                    text: data.__enable ? "禁用" : "启用",
                    onClick: () => this.toggleEnable()
                },
                {
                    text: "关闭",
                    onClick: () => this.close().destroy({ thenOpen: extensionPackList.dialog })
                }
            ]
        })
        const $dialog = this.dialog.$dialog
        $dialog.classList.add("mdui-dialog-full-screen")
        this.dialog.$content.classList.add("mdui-typo")
        if (data.__internal) {
            const btns = $dialog.querySelectorAll(".mdui-dialog-actions > *")
            btns[0].setAttribute("disabled", true)
            btns[1].setAttribute("disabled", true)
        }
        
        this.__extensionPackList = extensionPackList
        this.data = data
    }
    remove() {
        this.confirm({
            message: "确认删除？",
            onConfirm: () => {
                core._userData.deleteStoreData(this.__extensionPackList.id, this.data).done().then(() => snackbar("已删除"))  // TODO 可撤回
                this.__extensionPackList.reload()
            },
            thenOpen: this.__extensionPackList.dialog
        })
    }
    toggleEnable() {
        const keyword = this.data.__enable ? "禁用" : "启用"
        this.confirm({
            message: `确认${keyword}？`,
            onConfirm: () => {
                const newData = deepCopy(this.data)
                newData.__enable = !this.data.__enable
                this.__extensionPackList.updater.update({ newData, message: `已${keyword}`, extendEnableState: false })
                this.__extensionPackList.reload()
            },
            thenOpen: this.__extensionPackList.dialog
        })
    }
}

function genContent(item) {
    const renderMap = {
        name: `<p>名称：${ item.name }${ item.__internal ? "（内部）" : "" }</p>`,
        author: `<p>作者：${ item.author }</p>`,
        version: `<p>版本：${ item.version.join(".") }</p>`,
        description: `<p>描述：${ item.description }</p>`,
        id: `<p>ID：${ item.id }</p>`,
        homepage: `<p>主页：<a class="mdui-text-color-theme-accent-revise-primary" href="${ item.homepage }">${ item.homepage }</a></p>`,
        bugs: `<p>反馈：<a class="mdui-text-color-theme-accent-revise-primary" href="${ item.bugs }" class="mdui-text-truncate">${ item.bugs }</a></p>`,
        content: ``,
        __enable: `<p>已启用：${ item.__enable ? "是" : "否" }</p>`,
        __internal: `<p>内部包：${ item.__internal ? "是" : "否" }</p>`,
        __error: `<h5 class="mdui-text-color-red">加载这个扩展包时发生了错误，这很可能导致该扩展包不能生效</h5>`,
        __errMsg: () => {
            const err = item.__errMsg
            const node = stringToNode(`<p class="mdui-text-color-red">错误：${ err }${ err instanceof Error ? `（点击 <u>此处</u> 将错误打印至控制台）` : "" }</p>`)
            const btn =  node.querySelector("u")
            if (btn) btn.addEventListener("click", () => console.error(err))
            return node
        },
        __url: ``,
        __file: ``
    }
    const content = new DocumentFragment()
    each(item, (value, key) => {
        const render = getReturn(renderMap[key] ?? `<p>${key}：${value}</p>`)
        const node = stringToNode(render)
        if (node) content.appendChild(node)
    })
    return content
}
