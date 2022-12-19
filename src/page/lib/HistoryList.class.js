import { VirtualList, rendererTmpl } from "./VirtualList.class.js"
import { hasLoved } from "@/util/page.js"

export class HistoryList extends VirtualList {
    constructor($list) {
        super({
            id: "history",
            $list,
            renderer: rendererTmpl((cont, i) => `
                <button class="mdui-btn mdui-btn-icon mdui-list-item-things-display-when-hover" onclick="_page.history.toogleLoveState('${cont}')">
                    <i class="mdui-icon material-icons mdui-text-color-theme-icon">${ hasLoved(cont) ? "favorite" : "favorite_border" }</i>
                </button>
            `)
        })
    }
    add(cont) {
        app._userData.setItemVal("history", cont).done()
        this.load()
    }
    toogleLoveState(cont) {
        if (hasLoved(cont)) _page.love.unlove(cont)
        else _page.love.add(cont)
        this.load({ reloadToolbar: true })
    }
    // TODO: loveAll()
}
