import deepCopy from "fast-copy"

const content = {
    zh_cn: {
        "*": {
            list: {
                another10000: deepCopy(app.data.get("list", "lang").export),
                test: [
                    {
                        test: "testHeader",
                        template: {
                            sprite: {
                                img: "/test/image/BlockCSS.png",
                                imgWidth: 384,
                                size: 16
                            }
                        }
                    },
                    {
                        name: "testName",
                        description: "testDesc: test color {Color: red}",
                        url: `{Global: url.command_page} {This: name} {This: description} {Header: test}`
                    },
                    {
                        name: "testSprite",
                        description: "test block sprite",
                        sprite: {
                            pos: 3
                        }
                    },
                    {
                        name: "testImage",
                        description: "test image",
                        media: {
                            type: "image",
                            src: "/test/image/image.gif"
                        }
                    },
                    {
                        name: "testAudio",
                        description: "test audio",
                        media: {
                            type: "audio",
                            src: [
                                "/test/audio/audio1.mp3",
                                "/test/audio/audio2.mp3",
                                "/test/audio/audio3.ogg"
                            ]
                        }
                    }
                ],
                command: [
                    {
                        name: "@long-list-test",
                        description: "长列表测试",
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
                            name: "/^@long-list-test$/",
                            info: "长列表测试"
                        }
                    },
                    {
                        grammar: "(长列表)",
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

export default {
    id: "io.github.mcbece.packages.dev",
    name: "开发者测试包",
    author: "mcbece",
    version: [ 0, 0, 1 ],
    content
}
