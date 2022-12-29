import { VirtualList } from "./VirtualList.class.js"

export class LoveList extends VirtualList {
    // TODO: 调序功能，导出为 .mcfunction 文件功能， 连接到 WebSocket 一键执行功能
    constructor($list) {
        super({ id: "love", $list })
    }
    add(cont) {
        core._userData.setItemVal("love", cont).done().then(() => snackbar("已收藏"))
        this.load()
    }
    unlove(cont) {
        core._userData.deleteStoreData("love", cont).done().then(() => snackbar("已取消收藏"))
        this.load()
    }
}
