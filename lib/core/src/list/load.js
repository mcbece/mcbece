import { each } from "@/util/index.js"

export const _load = core => function({ names, lists }) {
    const data = []
    let i = 0
    each(lists, (list, name) => {
        each(list, (item, id) => {
            data.push(
                Object.assign({}, item, {
                    __id: id,
                    __listName: name,
                    _i: i
                })
            )
            i++
        })
    })
    
    core.input.keyboardContral.clear()
    
    this.__vs.resetData(data).scrollToTop()
}
