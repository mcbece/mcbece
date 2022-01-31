export default {
    "zh-CN": {
        list: {
            command: [
                {
                    "name": "@list",
                    "info": "加载任意列表",
                    "input": {
                        "replace": "all",
                        "text": "{name} "
                    }
                },
                {
                    "name": "@long-list-test",
                    "info": "长列表测试",
                    "input": {
                        "replace": "all",
                        "text": "{name} "
                    }
                },
                {
                    "name": "@test1",
                    "input": {
                        "replace": "all",
                        "text": "{name} "
                    }
                },
                {
                    "name": "@test2",
                    "input": {
                        "replace": "all",
                        "text": "{name} "
                    }
                }
            ]
        },
        grammar: {
            __new: [
                [
                    {
                        "command": {
                            "name": "/^@list$/",
                            "info": "加载任意列表"
                        }
                    },
                    {
                        "grammar": "<列表名> [列表内容]",
                        "info": [
                            {
                                "length": 1,
                                "note": "指定要加载的列表的名称",
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
                        "command": {
                            "name": "/^@long-list-test$/",
                            "info": "长列表测试"
                        }
                    },
                    {
                        "grammar": "[列表内容]",
                        "info": [
                            {
                                "length": 1,
                                "list": "block; item; location; entity; enchantment",
                            }
                        ]
                    }
                ],
                [
                    {
                        "command": {
                            "name": "/^@test1$/",
                            "info": "测试"
                        }
                    },
                    {
                        "grammar": "<测试> [测试]",
                        "info": [
                            {
                                "length": 1,
                                "note": "从 item 列表中检索数据",
                            },
                            {
                                length: 2,
                                note(getter) {
                                    return `索引值：${getter.searchFrom("item", getter.catchInput(1), s => s)}`
                                }
                            }
                        ]
                    }
                ],
                [
                    {
                        "command": {
                            "name": "/^@test2$/",
                            "info": "测试"
                        }
                    },
                    {
                        "grammar": "<测试> [测试] [测试]",
                        "info": [
                            {
                                "length": 1,
                                "note": "从 item 列表中检索数据",
                                "list": "2233"
                            },
                            {
                                length: 2,
                                note(getter) {
                                    return `索引值：${getter.searchFrom("item", getter.catchInput(1), s => s)}`
                                },
                                list: "item"
                            },
                            {
                                length: 3,
                                list: "item.data"
                            }
                        ]
                    }
                ]
            ]
        }
    }
}