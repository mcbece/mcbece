import { each } from "@/util/index.js"

const List = core.data.__extensionPackLib.List

const content = {
    zh_cn: {
        "*": {
            list: {
                player: [
                    {
                        template: {
                            input: {
                                text: "{This: name} "
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
                            text: "{This: name} "
                        }
                    },
                    {
                        name: "@tools",
                        description: "打开对应工具",
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
                                                text: "{This: name} "
                                            }
                                        }
                                    })
                                    each(core.data.get("list")._data, (_list, indexName) => {
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
                                                app.gui.dialogs[name].open()
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

export default {
    id: "io.github.mcbece.packages.example",
    name: "示例包",
    author: "mcbece",
    version: [ 0, 0, 1 ],
    content
}
