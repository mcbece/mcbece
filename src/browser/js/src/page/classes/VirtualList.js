import { VirtualScroll } from "../../../core/lib/VirtualScroll.class.js"
import { each } from "../../../core/util/common.js"
import { snackbar, confirm } from "../../mdui.js"
import { hasLoved } from "../../util.js"

const ITEM_HEIGHT = 40

export class VirtualList {
    constructor(id, $list, renderer = rendererTmpl()) {
        this.id = id
        this.$ = $list
        this.vs = new VirtualScroll({
            rootEle: $list.parentNode,
            app: {
                get _height() {
                    return $list.parentNode.offsetHeight
                },
                get _itemHeight() {
                    return ITEM_HEIGHT
                }
            },
            data: [],
            render: renderer.bind(this),
            bench: 5
        })
        window.addEventListener("open.mdui.dialog", evt => {
            if (evt._detail.inst.$element[0].id.replace(/-dialog$/, "") === this.id) {
                this.load()
                this.vs.onEvent(true)
            }
        })
    }
    load() {
        const data = [...app._userData.getItemVal(this.id)].map((cont, i) => { return { cont, i } }).reverse()
        this.vs.resetData(data).scrollToTop()
    }
    clear() {
        const dialog = _page.dialogs[this.id]
        dialog.close()
        confirm({
            message: "确认全部删除？",
            onConfirm: () => {
                app._userData.clearStoreData(this.id).done().then(() => snackbar("已全部删除"))
                dialog.open()
                this.load()
            }
        })
    }
    remove(cont) {
        const dialog = _page.dialogs[this.id]
        dialog.close()
        confirm({
            message: "确认删除？",
            onConfirm: () => {
                app._userData.deleteStoreData(this.id, cont).done().then(() => snackbar("已删除"))
                dialog.open()
                this.load()
            }
        })
    }
}

export class HistoryList extends VirtualList {
    constructor($list) {
        super("history", $list, rendererTmpl((cont, i) => `
            <button class="mdui-btn mdui-btn-icon mdui-list-item-things-display-when-hover" onclick="_page.history.toogleLoveState('${cont}')">
                <i class="mdui-icon material-icons mdui-text-color-black-icon">${ hasLoved(cont) ? "favorite" : "favorite_border" }</i>
            </button>
        `))
    }
    add(cont) {
        app._userData.setItemVal("history", cont).done()
        this.load()
    }
    toogleLoveState(cont) {
        if (hasLoved(cont)) {
            _page.love.unlove(cont)
            return false
        } else {
            _page.love.add(cont)
            return true
        }
    }
    // TODO: loveAll()
}

export class LoveList extends VirtualList {
    // TODO: 调序功能，导出为 .mcfunction 稳健功能， 连接到 WebSocket 一键执行功能
    constructor($list) {
        super("love", $list)
    }
    add(cont) {
        app._userData.setItemVal("love", cont).done().then(() => snackbar("已收藏"))
        this.load()
    }
    unlove(cont) {
        app._userData.deleteStoreData("love", cont).done().then(() => snackbar("已取消收藏"))
        this.load()
    }
}

function rendererTmpl(btn = () => "") {
    return function(items) {
        return items.map(({ cont, i }) => {
            return `
                    <div class="mdui-list-item mdui-ripple" id="${i}" style="height: ${ITEM_HEIGHT}px;">
                        <div class="mdui-list-item-content" style="overflow-x: scroll; white-space: nowrap;">${i} - ${cont}</div>
                        ${btn(cont, i)}
                        <button class="mdui-btn mdui-btn-icon mdui-list-item-things-display-when-hover" onclick="_page.vlists.${this.id}.remove('${cont}')">
                            <i class="mdui-icon material-icons mdui-text-color-black-icon">delete</i>
                        </button>
                    </div>
                `
        })
    }
}
