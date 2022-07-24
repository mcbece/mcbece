import { VirtualScroll } from "../../../core/lib/VirtualScroll.class.js"
import { each } from "../../../core/util/common.js"
import { snackbar, confirm } from "../../mdui.js"

const ITEM_HEIGHT = 40

export class VirtualList {
    constructor(id, $list, renderer = rendererTmpl()) {
        this.id = id
        this.$ = $list
        this.vs = new VirtualScroll({
            rootEle: $list.parentNode,
            app: {
                get height() {
                    return $list.parentNode.offsetHeight
                },
                get itemHeight() {
                    return ITEM_HEIGHT
                }
            },
            data: [],
            render: renderer.bind(this),
            bench: 5,
            callback: (container, _items) => {
                const items = document.createDocumentFragment()
                each(_items, item => items.appendChild(item))
                container.innerHTML = ""
                container.appendChild(items)
            }
        })
        window.addEventListener("open.mdui.dialog", evt => {
            if (evt._detail.inst.$element[0].id.replace(/-dialog$/, "") === this.id) {
                this.load()
                this.vs.rootEle.dispatchEvent(new Event('scroll'))
            }
        })
    }
    load() {
        const data = app._userData.getItemVal(this.id).map((cont, i) => { return { cont, i } }).reverse()
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
    remove(index) {
        const dialog = _page.dialogs[this.id]
        dialog.close()
        confirm({
            message: "确认删除？",
            onConfirm: () => {
                app._userData.removeStoreData(this.id, index).done().then(() => snackbar("已删除"))
                dialog.open()
                this.load()
            }
        })
    }
}

export class HistoryList extends VirtualList {
    constructor(id, $list) {
        super(id, $list, rendererTmpl((cont, i) => `
            <button class="mdui-btn mdui-btn-icon mdui-list-item-things-display-when-hover" onclick="_page.vlists.${this.id}.love(${i}, '${cont}')">
                <i class="mdui-icon material-icons mdui-text-color-black-icon">${ hasLoved(cont) ? "favorite" : "favorite_border" }</i>
            </button>
        `))
    }
    love(index, cont) {
        app._userData.setItemVal("love", cont).done().then(() => snackbar("已收藏"))
        this.load()
    }
}

export class LoveList extends VirtualList {
    // TODO: 调序功能，导出为 .mcfunction 稳健功能， 连接到 WebSocket 一键执行功能
}

function rendererTmpl(btn = () => "") {
    return function(items) {
        return items.map(({ cont, i }) => {
            return `
                    <div class="mdui-list-item mdui-ripple" id="${i}" style="height: ${ITEM_HEIGHT}px;">
                        <div class="mdui-list-item-content" style="overflow-x: scroll; white-space: nowrap;">${i} - ${cont}</div>
                        ${btn(cont, i)}
                        <button class="mdui-btn mdui-btn-icon mdui-list-item-things-display-when-hover" onclick="_page.vlists.${this.id}.remove(${i})">
                            <i class="mdui-icon material-icons mdui-text-color-black-icon">delete</i>
                        </button>
                    </div>
                `
        })
    }
}

function hasLoved(cont) {
    return app._userData._getItem("love").hasData(cont)
}
