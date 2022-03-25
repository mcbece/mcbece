import { each, replaceString } from "../_core/util/common.js"

const List = app.__lib.List

export default {
    "zh-CN": {
        vanilla: {
            list: {
                __new: {
                    player: [
                        {
                            template: {
                                input: {
                                    text: "{name} "
                                }
                            },
                            __app_list__: true
                        },
                        {
                            name: "PFiS1737",
                            info: "作者名称 :-)"
                        }
                    ]
                },
                command: [
                    {
                        name: "@list",
                        info: "加载任意列表",
                        input: {
                            replace: "all",
                            text: "{name} "
                        }
                    },
                    {
                        name: "@option",
                        info: "切换页面设置",
                        input: {
                            replace: "all",
                            text: "{name} "
                        }
                    },
                    {
                        name: "@tools",
                        info: "打开对应工具",
                        input: {
                            replace: "all",
                            text: "{name} "
                        }
                    }
                ]
            },
            grammar: {
                __new: [
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
                            grammar: "<设置名> <值> <确认>",
                            info: [
                                {
                                    length: 1,
                                    note: "指定要切换设置的名称",
                                    list() {
                                        const keys = app.option.keys()
                                        const list = new List()
                                        list.setHeader({
                                            _indexName: "_option.keys",
                                            template: {
                                                input: {
                                                    text: "{name} "
                                                }
                                            }
                                        })
                                        each(keys, key => list.setItem({
                                            name: key
                                        }))
                                        return list
                                    }
                                },
                                {
                                    length: 2,
                                    note: "指定要设置的值",
                                    list(getter) {
                                        const values = app.option.valuesOf(getter.catchInput(1))
                                        const list = new List()
                                        list.setHeader({
                                            _indexName: "_option.values",
                                            template: {
                                                input: {
                                                    text: "{name} "
                                                }
                                            }
                                        })
                                        each(values, value => list.setItem({
                                            name: value
                                        }))
                                        return list
                                    }
                                },
                                {
                                    length: 3,
                                    note(getter) {
                                        return replaceString("你确定要将 {key} 的值改为 {value} 吗？（按空格继续)", {
                                            key: getter.catchInput(1),
                                            value: getter.catchInput(2)
                                        })
                                    },
                                    list() {
                                        const list = new List()
                                        return list.setHeader({
                                            _indexName: "_option.confirm",
                                            template: {
                                                input: {
                                                    text: " "
                                                }
                                            }
                                        }).setItem({
                                            info: "是的，我确定"
                                        })
                                    }
                                }
                            ],
                            endFun(getter) {
                                const key = getter.catchInput(1)
                                const value = getter.catchInput(2)
                                app.option.setItem(key, (function() {
                                    if (value === "true") return true
                                    else if (value === "false") return false
                                    else return value
                                })())
                                return {
                                    note: "已完成设置"
                                }
                            }
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
                                        const list = new List()
                                        list.setHeader({
                                            _indexName: "_tools",
                                            template: {
                                                input: {
                                                    text: "{name} "
                                                }
                                            }
                                        })
                                        each(document.querySelectorAll("[id$='dialog']"), tool => {
                                            list.setItem({
                                                name: tool.id.replace(/-dialog$/, ""),
                                                info: tool.querySelector(".mdui-dialog-title .mdui-typo-headline").innerHTML + ": " + tool.querySelector(".mdui-dialog-title .mdui-typo-caption-opacity").innerHTML
                                            })
                                        })
                                        return list
                                    }
                                }
                            ],
                            endFun(getter) {
                                try {
                                    _page.dialogs[getter.catchInput(1)].open()
                                    return {
                                        note: "打开成功"
                                    }
                                } catch {
                                    return {
                                        note: "打开失败"
                                    }
                                }
                            }
                        }
                    ]
                ]
            }
        }
    }
}
