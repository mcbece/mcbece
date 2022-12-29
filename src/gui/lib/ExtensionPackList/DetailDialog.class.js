import { each } from "@/util/index.js"

export class DetailDialog {
    constructor(item, extensionPackList) {
        this.dialog = mdui.dialog({
            title: "详细信息",
            content: genContent(item),
            destroyOnClosed: false,
            modal: true,
            closeOnEsc: false,
            buttons: [
                {
                    text: "更新",
                    onClick: () => {
                        extensionPackList.updater.dialog(item, this)
                    }
                },
                {
                    text: "删除",
                    onClick: () => {
                        extensionPackList.remove(item, this)
                    }
                },
                {
                    text: item.__enable ? "禁用" : "启用",
                    onClick: () => {
                         extensionPackList.toggleEnable(item, this)
                    }
                },
                {
                    text: "关闭",
                    onClick: () => {
                        const mainDialog = app.gui.dialogs[extensionPackList.id]
                        this.close().destroy({ thenOpen: mainDialog })
                    }
                }
            ]
        })
        const $dialog = this.dialog.$element[0]
        $dialog.classList.add("mdui-dialog-full-screen")
        $dialog.querySelector(".mdui-dialog-content").classList.add("mdui-typo")
        if (item.__internal) {
            const btns = $dialog.querySelectorAll(".mdui-dialog-actions > *")
            btns[0].setAttribute("disabled", true)
            btns[1].setAttribute("disabled", true)
        }
    }
    open() {
        this.dialog.open()
        return this
    }
    close() {
        this.dialog.close()
        return this
    }
    destroy({ thenOpen: dialogToOpen }) {
        dialogToOpen.$element.one("opened.mdui.dialog", () => {
            this.dialog.destroy()
        })
        dialogToOpen.open()
    }
}

function genContent(item) {
    const renderMap = {
        name: () => `<p>名称：${item.name + ( item.__internal ? "（内部）" : "" )}</p>`,
        author: () => `<p>作者：${item.author}</p>`,
        version: () => `<p>版本：${item.version.join(".")}</p>`,
        description: () => `<p>描述：${item.description}</p>`,
        id: () => `<p>ID：${item.id}</p>`,
        homepage: () => `<p>主页：<a class="mdui-text-color-theme-accent-revise-primary" href="${item.homepage}">${item.homepage}</a></p>`,
        bugs: () => `<p>反馈：<a class="mdui-text-color-theme-accent-revise-primary" href="${item.bugs}" class="mdui-text-truncate">${item.bugs}</a></p>`,
    }
    const content = []
    each(item, (value, key) => {
        const render = renderMap[key] ?? (() => `<p>${key}：${value}</p>`)
        content.push(render())
    })
    return content.join("")
}
