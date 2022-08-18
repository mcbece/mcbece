import { each, replaceString, toString } from "../core/util/common.js"
import { snackbar, confirm } from "../src/mdui.js"
import { isAprilFools } from "../src/util.js"

const List = app.data._forCustom.List

export default {
    zh_cn: {
        vanilla: {
            list: {
                player: [
                    {
                        template: {
                            input: {
                                text: "{name} "
                            }
                        }
                    },
                    {
                        name: "PFiS1737",
                        description: "作者名称 :-)"
                    }
                ],
                command: [
                    {
                        name: "@list",
                        description: "加载任意列表",
                        input: {
                            replace: "all",
                            text: "{name} "
                        }
                    },
                    {
                        name: "@option",
                        description: "切换页面设置",
                        input: {
                            replace: "all",
                            text: "{name} "
                        }
                    },
                    {
                        name: "@tools",
                        description: "打开对应工具",
                        input: {
                            replace: "all",
                            text: "{name} "
                        }
                    }
                ]
            },
            grammar: [
                [
                    {
                        command: {
                            name: "/^@list$/",
                            info: "加载任意列表"
                        }
                    },
                    {
                        grammar: "<列表名> [列表内容]",
                        info: [
                            {
                                length: 1,
                                note: "指定要加载的列表的名称",
                                list() {
                                    const list = new List("_list.names")
                                    list.setHeader({
                                        template: {
                                            input: {
                                                text: "{name} "
                                            }
                                        }
                                    })
                                    each(app.data.get("list")._data, (_list, indexName) => {
                                        list.addItem({
                                           name: indexName,
                                           description: _list._header.name
                                        })
                                    })
                                    return list
                                }
                            },
                            {
                                length: 2,
                                note(getter) {
                                    return `当前加载：${getter.catchInput(1)}`
                                },
                                list(getter) {
                                    return getter.catchInput(1)
                                }
                            }
                        ]
                    }
                ],
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
                                    const keys = app.option.keys()
                                    const list = new List("_option.keys")
                                    list.setHeader({
                                        template: {
                                            input: {
                                                text: "{name} "
                                            }
                                        }
                                    })
                                    each(keys, key => {
                                        const item = app.option._getItem(key)
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
                                note: "指定要设置的值",
                                list(getter) {
                                    const key = getter.catchInput(1)
                                    const values = app.option.valuesOf(key)
                                    const list = new List("_option.values")
                                    each(values, ([name, description]) => list.addItem({
                                        name: toString(name),
                                        active: name === app.option._getItem(key).selected,
                                        description: description + (key === "themePrimaryColor" || key === "themeAccentColor" ? ` {color: ${description}}` : ""),
                                        onclick() {
                                            confirm({
                                                message: replaceString("你确定要将 {key} 的值改为 {name} 吗？", { key, name }),
                                                onConfirm: () => app.option.setItem(key, name)
                                            }).then(([result, e]) => {
                                                if (e) snackbar(e)  // Happy April Fools!
                                                else if (result) snackbar("设置成功")
                                            }).catch(console.error)
                                        }
                                    }))
                                    return list
                                }
                            }
                        ]
                    }
                ],
                [
                    {
                        command: {
                            name: "/^@tools$/",
                            info: "打开对应工具"
                        }
                    },
                    {
                        grammar: "<工具名>",
                        info: [
                            {
                                length: 1,
                                note: "指定要打开的工具的名称",
                                list() {
                                    const list = new List("_tools")
                                    each(document.querySelectorAll("[id$='-dialog']"), tool => {
                                        const name = tool.id.replace(/-dialog$/, "")
                                        list.addItem({
                                            name,
                                            description: tool.querySelector(".mdui-dialog-title .mdui-typo-headline").innerHTML + ": " + tool.querySelector(".mdui-dialog-title .mdui-typo-caption-opacity").innerHTML,
                                            onclick() {
                                                _page.dialogs[name].open()
                                            }
                                        })
                                    })
                                    return list
                                }
                            }
                        ]
                    }
                ]
            ]
        }
    }
}
