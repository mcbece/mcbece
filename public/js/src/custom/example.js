import { each, replaceString } from "../../core/util/common.js"
import { List } from "../../core/lib/ListData.class.js"

export default {
    "zh-CN": {
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
                                list(getter) {
                                    const keys = getter._app.option.keys()
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
                                    const values = getter._app.option.values(getter.catchInput(1))
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
                            getter._app.option.setItem(getter.catchInput(1), getter.catchInput(2))
                            return {
                                note: "已完成设置"
                            }
                        }
                    }
                ]
            ]
        }
    }
}