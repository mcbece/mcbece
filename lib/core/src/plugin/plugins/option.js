import merge from "merge-options"
import { each, removeValueChangeListener, addValueChangeListener } from "@/util/index.js"
import { WebOption } from "@/core/lib/WebOption.class.js"

import { LANGUAGES } from "@/src/data.js"

export default async function(core) {
    const { DEFAULT_LANGUAGE } = core.config
    
    const option = new WebOption("option")
    
    core.option = option
    
    return option
    
    // Languages, Branches
    .addItem({
        name: "lang",
        description: "语言",
        values: Object.entries((function() {
            const _languages = {}
            each(LANGUAGES, ({ name }, lang) => _languages[lang] = name)
            return _languages
        })()),
        defaultValue: DEFAULT_LANGUAGE,
        events: {
            changed: (selected, original) => {
                document.documentElement.lang = selected
                console.debug("Option: lang -> from", original, "to", selected)
                const branches = LANGUAGES[selected].branches
                option.addItem({
                    name: "branch",
                    description: "分支",
                    values: Object.entries(branches),
                    defaultValue: branches[0],
                    events: {
                        changed: (_selected, _original) => {
                            console.debug("Option: branch -> from", _original, "to", _selected)
                        }
                    }
                })
            }
        }
    })
    
    // Debounce
    .addItem({
        name: "inputDebounce",
        description: "是否开启输入栏防抖（低配用户建议开启）",
        values: [
            [false, "关闭（默认）"],
            [50, "开启，延时 50ms"],
            [100, "开启，延时 100ms"],
            [200, "开启，延时 200ms"],
            [400, "开启，延时 400ms"],
            [1000, "开启，延时 1000ms (1s)"]
        ],
        defaultValue: false,
        events: {
            changed: (selected, original) => {
                console.debug("Option: inputDebounce -> from", original, "to", selected)
                if (core._inputListenerConfig) {
                    const [ inputEle, listener, setting ] = core._inputListenerConfig
                    removeValueChangeListener(inputEle, listener, setting)
                    core._inputListenerConfig = addValueChangeListener(inputEle, listener, merge(setting, { debounce: !!selected, delay: selected }))
                }
            }
        }
    })
    
    // Bench of Virtual Scroll
    .addItem({
        name: "listBench",
        description: "虚拟滚动预加载的列表项数目",
        values: [
            [0, "不预加载"],
            [5, "上下各 5 个"],
            [10, "上下各 10 个（默认）"],
            [15, "上下各 15 个"],
            [25, "上下各 25 个（建议电脑用户使用）"],
            [50, "上下各 50 个"],
            [100, "上下各 100 个（非常不建议选用）"]
        ],
        defaultValue: 10,
        events: {
            changed: (selected, original) => {
                console.debug("Option: inputDebounce -> from", original, "to", selected)
            }
        }
    })
}
