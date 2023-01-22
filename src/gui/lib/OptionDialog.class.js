import { each, stringToNode, objectMap } from "@/util/index.js"

export class OptionDialog extends mdui.Dialog {
    constructor($dialog) {
        super($dialog, {
            history: false,
            modal: true
        })
        this.$content = this.$element[0].querySelector(".mdui-dialog-content")
        this.$element.on("closed.mdui.dialog", () => {
            core.event.emit("core.reoption")
        })
        
        // 保证 core 的 option 插件加载并同步完成后再加载 GUI
        core.event.once("core.reoption", () => {
            this.load()
            core.event.on("core.reoption", () => this.reload())
        })
    }
    load() {
        const stores = core.option.items
        const $fragment = new DocumentFragment()
        each(stores, storeItem => {
            $fragment.appendChild(this._genItem(storeItem))
        })
        this.$content.innerHTML = ""
        this.$content.appendChild($fragment)
        // this.$element.mutation()
    }
    _genItem(item) {
        const { name, description, values, detailDesc } = item
        const $node = stringToNode(`
            <div class="mdui-row mdui-m-y-2 mdui-valign" id="option-item-${name}">
                <div class="mdui-col-xs-8 mdui-col-md-6 mdui-text-left" id="desc">${description}</div>
                <div class="mdui-col-xs-4 mdui-col-md-6 mdui-text-right" id="values"></div>
            </div>
        `)
        if (detailDesc) $node.querySelector("#desc").setAttribute("mdui-tooltip", `{ content: '${detailDesc}' }`)
        
        const $values = $node.querySelector("#values")
        if (values.size === 2 && values.get(true) && values.get(false)) {
            const $label = stringToNode(`
                <label class="mdui-switch">
                    <input type="checkbox" />
                    <i class="mdui-switch-icon"></i>
                </label>
            `)
            const $input = $label.querySelector("input")
            $input.checked = item.selected
            $input.addEventListener("change", () => {
                core.option.setItemVal(name, $input.checked).done().then(() => this.reload()).catch(console.error)
            })
            $input.addEventListener("app.core.option.sync", () => {
                $input.checked = core.option.getItemVal(name)
            })
            $values.appendChild($label)
        } else {
            const $fragment = new DocumentFragment()
            const $select = stringToNode(`<select class="mdui-select" style="width: 100%;"></select>`)
            $fragment.appendChild($select)
            let i = 0
            const valueMap = {}
            each(values, ([valueName, valueDesc]) => {
                valueMap[i] = valueName
                $select.appendChild(stringToNode(`<option value="${i}"${ valueName === item.selected ? " selected" : "" }>${valueDesc}</option>`))
                i++
            })
            $select.addEventListener("change", () => {
                core.option.setItemVal(name, valueMap[$select.selectedIndex]).done().then(() => this.reload()).catch(console.error)
            })
            $select.addEventListener("app.core.option.sync", () => {
                const _valueMap = objectMap(valueMap, (value, key) => ({
                    value: key,
                    key: value
                }))
                $select.selectedIndex = _valueMap[core.option.getItemVal(name)]
            })
            if (!window._LITE_MODE) {
                const mduiSelect = new mdui.Select($select)
                const $mduiSelect = mduiSelect.$element[0]
                
                // mdui/src/components/select L411, L414
                // mdui 中是先触发了 closed 事件，再把 width 改为 ""
                // 所有这里用一个 MutationObserver 监听一下属性变化，
                // 等它改完了我再改
                const observer = new MutationObserver(([mutations]) => {
                    $mduiSelect.style.width = "100%"
                    observer.disconnect()
                })
                $select.addEventListener("closed.mdui.select", () => {
                    observer.observe($mduiSelect, {
                        attributes: true,
                        attributeFilter: ["style"]
                    })
                })
                
                // 防止被 dialog-content 的 overflow-y 截断
                // 另外为了防止被 dialog 的 overflow 截断，dialog 的 overflow 也设置为了 visible
                // 但有个问题，为什么只设置 overflow-y 不行，必须 x y 都设置为 visibility 才行？ :)
                mduiSelect.$menu[0].style.position = "fixed"
                this.$element[0].style.overflow = "visible"
                
                $select.addEventListener("app.core.option.sync", () => mduiSelect.handleUpdate())
                
                $fragment.appendChild($mduiSelect)
            }
            $values.appendChild($fragment)
        }
        return $node
    }
    reload() {
        each(this.$content.querySelectorAll("input, select"), e => e.dispatchEvent(new Event("app.core.option.sync")))
    }
}
