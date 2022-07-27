import { each } from "../../core/util/common.js"
import { HistoryList, LoveList, VirtualList } from "./classes/VirtualList.js"

const vlists = {}
each(document.querySelectorAll("[id$='-vlist']"), $vlist => {
    const id = $vlist.id.replace(/-vlist$/, "")
    if (id === "history") vlists[id] = new HistoryList($vlist)
    else if (id === "love") vlists[id] = new LoveList($vlist)
    else vlists[id] = new VirtualList(id, $vlist)
})

export default vlists
