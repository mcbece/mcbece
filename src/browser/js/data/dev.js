import deepCopy from "fast-copy"

const List = app.data._forCustom.List

export default {
    zh_cn: {
        vanilla: {
            list: {
                another10000: deepCopy(app.data.get("list", "lang").export),
                test: [
                    {},
                    {
                        name: "test",
                        description: ""
                    }
                ],
                command: [
                    {
                        name: "@long-list-test",
                        description: "长列表测试",
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
                            name: "/^@long-list-test$/",
                            info: "长列表测试"
                        }
                    },
                    {
                        grammar: "[列表内容]",
                        info: [
                            {
                                length: 1,
                                list: [
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
                                    "lang",
                                    "another10000",
                                ],
                            }
                        ]
                    }
                ]
            ]
        }
    }
}
