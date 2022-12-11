import { each } from "@/util/index.js"
import { setBodyPaddingTop } from "@/util/page.js"

const collapses = {}
each(document.querySelectorAll(".mdui-collapse"), $collapse => {
    const id = $collapse.id
    const arrow = $collapse.querySelector(".mdui-collapse-item-arrow")
    const collapse = new mdui.Collapse($collapse)
    // FIXME: 简洁模式下，打开和关闭 #header 的 collapse，展开的部分出现明显跳动
    $collapse.querySelectorAll(".mdui-collapse-item-header").forEach((item, i) => {
        item.addEventListener("click", () => collapse.toggle(i))
    })
    collapses[id] = collapse
})

export default collapses

window.addEventListener("open.mdui.collapse", evt => {
    if (evt._detail.inst.$element[0].id = "header") setTimeout(() => setBodyPaddingTop(), 0)
})
window.addEventListener("close.mdui.collapse", evt => {
    if (evt._detail.inst.$element[0].id = "header") {
        setTimeout(() => {
            setBodyPaddingTop()
            app.list.__vs.onEvent({ forceload: true })
        }, 0)
    }
})
