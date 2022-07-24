const List = app.data._forCustom.List

export default {
    "zh-CN": {
        vanilla: {
            list: {
                __new: {
                    test: [
                        {
                            "__app_list__": true
                        },
                        {
                            "name": "test"
                        }
                    ]
                },
                command: [
                    {
                        "name": "@long-list-test1",
                        "info": "长列表测试 1",
                        "input": {
                            "replace": "all",
                            "text": "{name} "
                        }
                    },
                    {
                        "name": "@long-list-test2",
                        "info": "长列表测试 2",
                        "input": {
                            "replace": "all",
                            "text": "{name} "
                        }
                    },
                    {
                        "name": "@test1",
                        "info": "onclick 测试",
                        "input": {
                            "replace": "all",
                            "text": "{name} "
                        }
                    },
                    {
                        "name": "@test2",
                        "info": "测试2",
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
                                "name": "/^@long-list-test1$/",
                                "info": "长列表测试 1"
                            }
                        },
                        {
                            "grammar": "[列表内容]",
                            "info": [
                                {
                                    "length": 1,
                                    "list": [
                                        "entity",
                                        "entity.summonable",
                                        "entity.family",
                                        "block",
                                        "item",
                                        "particle_emitter",
                                        "sound",
                                        "music",
                                        "animation",
                                        "effect",
                                        "enchantment",
                                        "fog",
                                        "location",
                                        "command",
                                        // "selector.variable",
                                        // "selector.argument",
                                        "difficulty",
                                        "boolean",
                                        "ability",
                                        "another1000_1",
                                        "another1000_2",
                                        "another1000_3",
                                        "another1000_4",
                                        "another1000_5",
                                        "another1000_6",
                                        "another1000_7",
                                        "another1000_8",
                                        "another1000_9"
                                    ],
                                }
                            ]
                        }
                    ],
                    [
                        {
                            "command": {
                                "name": "/^@long-list-test2$/",
                                "info": "长列表测试 2"
                            }
                        },
                        {
                            "grammar": "[列表内容]",
                            "info": [
                                {
                                    "length": 1,
                                    "list": [
                                        "entity",
                                        "entity.summonable",
                                        "entity.family",
                                        "block",
                                        "item",
                                        "particle_emitter",
                                        "sound",
                                        "music",
                                        "animation",
                                        "effect",
                                        "enchantment",
                                        "fog",
                                        "location",
                                        "command",
                                        // "selector.variable",
                                        // "selector.argument",
                                        "difficulty",
                                        "boolean",
                                        "ability"
                                    ],
                                }
                            ]
                        }
                    ],
                    [
                        {
                            "command": {
                                "name": "/^@test1$/",
                                "info": "onclick 测试"
                            }
                        },
                        {
                            "grammar": "<测试>",
                            "info": [
                                {
                                    "length": 1,
                                    "note": "---",
                                    list() {
                                        const list = new List()
                                        list.setHeader({
                                            _indexName: "test1.key1",
                                            template: {
                                                input: {
                                                    text: "alert"
                                                }
                                            }
                                        })
                                        list.setItem({
                                            name: 'alert("test")',
                                            onclick() {
                                                alert("test")
                                            }
                                        })
                                        return list
                                    }
                                }
                            ]
                        }
                    ],
                    [
                        {
                            "command": {
                                "name": "/^@test2$/",
                                "info": "测试2"
                            }
                        },
                        {
                            "grammar": "<测试> [测试]",
                            "info": [
                                {
                                    "length": 1,
                                    "note": "从 item 列表中检索数据",
                                    "list": "item"
                                },
                                {
                                    length: 2,
                                    note(getter) {
                                        return `索引值：${getter.searchFrom("item", getter.catchInput(1))}, 对应 item.data 如下`
                                    },
                                    list: "item.data"
                                }
                            ]
                        }
                    ]
                ]
            }
        }
    }
}
