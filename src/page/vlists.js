import { each } from "@/util/index.js"
import { VirtualList } from "./lib/VirtualList.class.js"
import { HistoryList } from "./lib/HistoryList.class.js"
import { LoveList } from "./lib/LoveList.class.js"
import { ExtensionPackList } from "./lib/ExtensionPackList/index.class.js"

const vlists = {}
each(document.querySelectorAll("[id$='-vlist']"), $vlist => {
    const id = $vlist.id.replace(/-vlist$/, "")
    if (id === "history") vlists[id] = new HistoryList($vlist)
    else if (id === "love") vlists[id] = new LoveList($vlist)
    else if (id === "extensions") vlists[id] = new ExtensionPackList($vlist)
    else vlists[id] = new VirtualList({ id, $list: $vlist })
})

export default vlists
