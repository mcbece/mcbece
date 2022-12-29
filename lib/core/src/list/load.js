import { each } from "@/util/index.js"

export const _load = core => function({ names, lists }) {
    const container = core.config.$list
    const data = []
    let i = 0
    each(lists, (list, name) => {
        each(list, (item, id) => {
            data.push(
                Object.assign({}, item, {
                    __listName: name,
                    _id: id,
                    _i: i
                })
            )
            i++
        })
    })
    
    core.input.keyboardContral.clear()
    
    this.__vs.resetData(data).scrollToTop()
}
