import { VirtualScroll } from "@/core/lib/VirtualScroll.class.js"
import { each } from "@/util/index.js"
import { snackbar, confirm } from "@/util/mdui.js"

import dialogs from "../dialogs.js"

const ITEM_HEIGHT = 40

export class VirtualList {
    constructor({
        id,
        $list,
        renderer = rendererTmpl(),
        callback,
        itemHeight
    }) {
        this.id = id
        this.$ = $list
        this.vs = new VirtualScroll({
            rootEle: $list.parentNode,
            data: [],
            render: renderer.bind(this),
            callback,
            
            _getter: {
                get bench() {
                    return core.plugin.get(/^(.+):option$/).getItemVal("listBench")
                },
                get height() {
                    return $list.parentNode.offsetHeight
                }
            },
            itemHeight: itemHeight ?? ITEM_HEIGHT
        })
        dialogs[id].$element.on("open.mdui.dialog", () => {
            this.load()
            this.vs.onEvent({ forceload: true })
        })
    }
    load({ reloadToolbar } = {}) {
        const data = [...core._userData.getItemVal(this.id)].map((cont, i) => ({ cont, i })).reverse()
        this.vs.resetData(data).scrollToTop()
        if (reloadToolbar) app.gui.toolbar.reload()
    }
    clear() {
        const mainDialog = app.gui.dialogs[this.id]
        mainDialog.close()
        confirm({
            message: "确认全部删除？",
            onConfirm: () => {
                core._userData.clearStoreData(this.id).done().then(() => snackbar("已全部删除"))
                mainDialog.open()
                this.load({ reloadToolbar: true })
            },
            onCancel: () => {
                mainDialog.open()
            }
        })
    }
    remove(cont) {
        const mainDialog = app.gui.dialogs[this.id]
        mainDialog.close()
        confirm({
            message: "确认删除？",
            onConfirm: () => {
                core._userData.deleteStoreData(this.id, cont).done().then(() => snackbar("已删除"))
                mainDialog.open()
                this.load({ reloadToolbar: true })
            },
            onCancel: () => {
                mainDialog.open()
            }
        })
    }
}

export function rendererTmpl(btn = () => "") {
    return function(items) {
        return items.map(({ cont, i }) => {
            return `
                <div class="mdui-list-item mdui-ripple" id="${i}" style="height: ${ITEM_HEIGHT}px;">
                    <div class="mdui-list-item-content" style="overflow-x: scroll; white-space: nowrap;">${i} - ${cont}</div>
                    ${btn(cont, i)}
                    <button class="mdui-btn mdui-btn-icon mdui-list-item-things-display-when-hover" onclick="app.gui.vlists.${this.id}.remove('${cont}')">
                        <i class="mdui-icon material-icons mdui-text-color-theme-icon">delete</i>
                    </button>
                </div>
            `
        })
    }
}
