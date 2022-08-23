import { each } from "@util/index.js"

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
