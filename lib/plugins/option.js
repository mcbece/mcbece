import { each, toString } from "@/util/index.js"
import { THEME_COLOR, setThemeColor, setDarkMode, snackbar, confirm, setFestivalTheme } from "@/util/mdui.js"
import { setLiteMode } from "@/util/page.js"
import { festivalMatch } from "@/util/date.js"

import { List } from "@/core/lib/ListData.class.js"

const themeInterceptor = () => Object.values(festivalMatch).includes(true)
const interceptorListener = option => () => setFestivalTheme(option)

const darkScheme = window.matchMedia("(prefers-color-scheme: dark)")
const darkModeListener = queryList => setDarkMode(queryList.matches)

const maxWidth = window.matchMedia("(max-width: 1023.9px)")
const liteModeListener = queryList => setLiteMode(queryList.matches)

export default async function(core, option) {
    core.config.add({
        data: {
            extensionPacks: [
                {
                    id: "io.github.mcbece.plugins.option",
                    name: "@option 命令包",
                    author: "mcbece",
                    version: [ 0, 0, 1 ],
                    description: "为应用添加 @option 命令以控制页面设置",
                    homepage: "https://github.com/mcbece/mcbece",
                    bugs: "https://github.com/mcbece/mcbece/issues",
                    content: getExtensionData(option, core)
                }
            ]
        }
    })
    
    return option
    
    // Theme Color
    .addItem({
        name: "themePrimaryColor",
        description: "主题色 - 主色",
        values: Object.entries(THEME_COLOR.primary),
        defaultValue: THEME_COLOR.DEFAULT.primary,
        events: {
            changed: (selected, original) => {
                setThemeColor({ primary: [original, selected] })
                console.debug("Option: themePrimaryColor -> from", original, "to", selected)
            },
            intercepted: interceptorListener(option)
        },
        interceptor: themeInterceptor
    })
    .addItem({
        name: "themeAccentColor",
        description: "主题色 - 强调色",
        values: Object.entries(THEME_COLOR.accent),
        defaultValue: THEME_COLOR.DEFAULT.accent,
        events: {
            changed: (selected, original) => {
                setThemeColor({ accent: [original, selected] })
                console.debug("Option: themeAccentColor -> from", original, "to", selected)
            },
            intercepted: interceptorListener(option)
        },
        interceptor: themeInterceptor
    })
    
    // Dark Mode
    .addItem({
        name: "darkMode",
        description: "深色模式",
        values: [
            ["auto", "自动检测（prefers-color-scheme: dark）"],
            [true],
            [false]
        ],
        defaultValue: "auto",
        events: {
            changed: (selected, original) => {
                console.debug("Option: darkMode -> from", original, "to", selected)
                if (selected === "auto") {
                    darkScheme.addListener(darkModeListener)
                    darkModeListener(darkScheme)
                } else {
                    darkScheme.removeListener(darkModeListener)
                    setDarkMode(selected)
                }
            },
            intercepted: interceptorListener(option)
        },
        interceptor: themeInterceptor
    })
    
    // Lite Mode
    .addItem({
        name: "liteMode",
        description: "简洁模式（建议保持「自动检测」，因为页面的响应式布局也是根据这个标准判断的）",
        values: [
            ["auto", "自动检测（max-width: 1023.9px）"],
            [true],
            [false]
        ],
        defaultValue: "auto",
        events: {
            changed: (selected, original) => {
                console.debug("Option: liteMode -> from", original, "to", selected)
                if (selected === "auto") {
                    maxWidth.addListener(liteModeListener)
                    liteModeListener(maxWidth)
                } else {
                    maxWidth.removeListener(liteModeListener)
                    setLiteMode(selected)
                }
            }
        }
    })
    
    // Lite Mode Fixed List Item Height
    .addItem({
        name: "liteModeFixedListItemHeight",
        description: "简洁模式下，列表项的高度是否固定",
        values: [
            [true, "固定（默认）"],
            [false, "跟随页面高度变化"]
        ],
        defaultValue: true,
        events: {
            changed: (selected, original) => {
                console.debug("Option: liteModeFixedListItemHeight -> from", original, "to", selected)
            }
        }
    })
}

const getExtensionData = option => ({
    zh_cn: {
        "*": {
            list: {
                command: [
                    {
                        name: "@option",
                        description: "切换页面设置",
                        input: {
                            replace: "all",
                            text: "{This: name} "
                        }
                    }
                ]
            },
            grammar: [
                [
                    {
                        command: {
                            name: "/^@option$/",
                            info: "切换页面设置"
                        }
                    },
                    {
                        grammar: "<设置名> <值>",
                        info: [
                            {
                                length: 1,
                                note: "指定要切换设置的名称",
                                list() {
                                    const keys = Object.keys(option.items)
                                    const list = new List("_option.keys")
                                    list.setHeader({
                                        template: {
                                            input: {
                                                text: "{This: name} "
                                            }
                                        }
                                    })
                                    each(keys, key => {
                                        const item = option._getItem(key)
                                        if (item.values.size) list.addItem({
                                           name: key,
                                           description: item.description
                                        })
                                    })
                                    return list
                                }
                            },
                            {
                                length: 2,
                                note(getter) {
                                    const key = getter.catchInput(1)
                                    return option._getItem(key).description
                                },
                                list(getter) {
                                    const key = getter.catchInput(1)
                                    const values = [...option._getItem(key).values]
                                    const list = new List("_option.values")
                                    each(values, ([ value, description ]) => list.addItem({
                                        name: toString(value),
                                        active: value === option._getItem(key).selected,
                                        description: description + (key === "themePrimaryColor" || key === "themeAccentColor" ? ` {Color: ${description}}` : ""),
                                        onclick() {
                                            confirm({
                                                message: `你确定要将 ${key} 的值改为 ${value} 吗？`,
                                                onConfirm: () => option.setItemVal(key, value, (_, __, res) => {
                                                    snackbar("设置成功")
                                                    core.event.emit("core.reoption")
                                                }).done().catch(console.error)
                                            }).catch(console.error)
                                        }
                                    }))
                                    return list
                                }
                            }
                        ]
                    }
                ]
            ]
        }
    }
})
