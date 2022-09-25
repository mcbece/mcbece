import { each } from "@/util/index.js"

export function _load({ names, lists }) {
    const container = this.config.$list
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
    
    this.input.contral.clear()
    
    this.list.__vs.resetData(data).scrollToTop()
}
