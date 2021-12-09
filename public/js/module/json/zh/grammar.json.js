export let grammar = [
    [
        {
            "command": {
                "name": "/^(\\/)?(\\?|help)$/",
                "info": "提供命令列表或单个命令的帮助信息"
            }
        },
        {
            "grammar": "[页码：整数]",
            "info": [
                {
                    "length": 1,
                    "note": "指定命令列表的页码",
                    "list": "commands.help.page_number"
                }
            ],
            "display": [
                {
                    "length": 1,
                    "rule": {
                        "type": "regex",
                        "text": "/^[0-9]/"
                    }
                }
            ]
        },
        {
            "grammar": "<命令：字符串>",
            "info": [
                {
                    "length": 1,
                    "note": "指定需要提供帮助信息的命令",
                    "list": "command"
                }
            ],
            "display": [
                {
                    "length": 1,
                    "rule": {
                        "type": "regex",
                        "text": "/^[a-z]/"
                    }
                }
            ]
        }
    ],
    [
        {
            "command": {
                "name": "/^(\\/)?ability$/",
                "info": "赋予或剥夺玩家的能力"
            }
        },
        {
            "grammar": "<玩家：目标> <能力：能力> <值：布尔值>",
            "info": [
                {
                    "length": 1,
                    "note": "指定要赋予或剥夺能力的玩家",
                    "list": "selector"
                },
                {
                    "length": 2,
                    "note": "指定要操作的能力",
                    "list": "ability"
                },
                {
                    "length": 3,
                    "note": "指定此能力是否对玩家可用",
                    "list": "boolean"
                }
            ]
        }
    ],
    [
        {
            "command": {
                "name": "/^(\\/)?(alwaysday|daylock)$/",
                "info": "锁定或解锁日夜循环"
            }
        },
        {
            "grammar": "[锁定：布尔值]",
            "info": [
                {
                    "length": 1,
                    "note": "指定是否锁定昼夜更替",
                    "list": "boolean"
                }
            ]
        }
    ],
    [
        {
            "command": {
                "name": "/^(\\/)?(camerashake)$/",
                "info": "对玩家视野施以一定强度和时间的摇晃效果"
            }
        },
        {
            "grammar": "add <玩家：目标> [强度：整数] [秒数：整数] [shakeType: CameraShakeType]",
            "info": [
                {
                    "length": 1,
                    "note": "添加",
                    "list": "commands.camerashake.model"
                },
                {
                    "length": 2,
                    "note": "指定要施以或停止视野摇晃效果的玩家",
                    "list": "selector"
                },
                {
                    "length": 3,
                    "note": "指定视野摇晃的强度",
                    "list": "commands.camerashake.intensity"
                },
                {
                    "length": 4,
                    "note": "指定视野摇晃的时长",
                    "list": "commands.camerashake.seconds"
                },
                {
                    "length": 5,
                    "note": "指定视野摇晃方向的种类",
                    "list": "commands.camerashake.shake_type"
                }
            ],
            "display": [
                {
                    "length": 1,
                    "rule": {
                        "type": "regex",
                        "text": "/^add$/"
                    }
                }
            ]
        },
        {
            "grammar": "stop <玩家：目标>",
            "info": [
                {
                    "length": 1,
                    "note": "停止",
                    "list": "commands.camerashake.model"
                },
                {
                    "length": 2,
                    "note": "指定要施以或停止视野摇晃效果的玩家",
                    "list": "selector"
                }
            ],
            "display": [
                {
                    "length": 1,
                    "rule": {
                        "type": "regex",
                        "text": "/^stop$/"
                    }
                }
            ]
        }
    ],
    [
        {
            "command": {
                "name": "/^(\\/)?(changesetting)$/",
                "info": "在基岩版专用服务器（BDS）上运行时更改设置"
            }
        },
        {
            "grammar": "allow-cheats <值：布尔值>",
            "info": [
                {
                    "length": 1,
                    "note": "是否允许作弊",
                    "list": "commands.changesetting.model"
                },
                {
                    "length": 2,
                    "note": "指定服务器是否允许作弊",
                    "list": "boolean"
                }
            ],
            "display": [
                {
                    "length": 1,
                    "rule": {
                        "type": "regex",
                        "text": "/^allow-cheats$/"
                    }
                            }
                        ]
        },
        {
            "grammar": "difficulty <难度：难度>",
            "info": [
                {
                    "length": 1,
                    "note": "设置难度",
                    "list": "commands.changesetting.model"
                },
                {
                    "length": 2,
                    "note": "指定要设置的难度",
                    "list": "difficulty"
                }
            ],
            "display": [
                {
                    "length": 1,
                    "rule": {
                        "type": "regex",
                        "text": "/^difficulty$/"
                    }
                },
                {
                    "length": 2,
                    "rule": {
                        "type": "regex-contrary",
                        "text": "/^[0-9]/"
                    }
                }
                
            ]
        },
        {
            "grammar": "difficulty <难度：整数>",
            "info": [
                {
                    "length": 1,
                    "note": "设置难度",
                    "list": "commands.changesetting.model"
                },
                {
                    "length": 2,
                    "note": "指定要设置的难度",
                    "list": "difficulty"
                }
            ],
            "display": [
                {
                    "length": 1,
                    "rule": {
                        "type": "regex",
                        "text": "/^difficulty$/"
                    }
                },
                {
                    "length": 2,
                    "rule": {
                        "type": "regex",
                        "text": "/^[0-9]/"
                    }
                }
            ]
        }
    ],
    [
        {
            "command": {
                "name": "/^(\\/)?(clear)$/",
                "info": "清除玩家物品栏的物品"
            }
        },
        {
            "grammar": "[玩家：目标] [物品：物品] [物品数据：整数] [最大数量：整数]",
            "info": [
                {
                    "length": 1,
                    "note": "指定要被清除物品的玩家",
                    "list": "selector"
                },
                {
                    "length": 2,
                    "note": "指定要被清除的物品ID",
                    "list": "item"
                },
                {
                    "length": 3,
                    "note": "指定要被清除物品的数据值",
                    "list": "item.data"
                },
                {
                    "length": 4,
                    "note": "指定要被清除物品的最大值",
                    "list": "commands.clear.max_count"
                }
            ]
        }
    ],
    [
        {
            "command": {
                "name": "/^(\\/)?(clearspawnpoint)$/",
                "info": "清除世界中设置的重生点"
            }
        },
        {
            "grammar": "[玩家：目标]",
            "info": [
                {
                    "length": 1,
                    "note": "指定要被删除出生点的玩家",
                    "list": "selector"
                }
            ]
        }
    ],
    [
        {
            "command": {
                "name": "/^(\\/)?(clone)$/",
                "info": "在指定区域之间复制方块结构"
            }
        },
        {
            "grammar": "<开始: x y z> <结束: x y z> <目标: x y z> [遮罩模式：遮罩模式] [复制模式：复制模式]",
            "info": [
                {
                    "length": 1,
                    "note": "定义源区域的两组对角方块坐标",
                    "list": "coordinate.x"
                },
                {
                    "length": 2,
                    "note": "定义源区域的两组对角方块坐标",
                    "list": "coordinate.y"
                },
                {
                    "length": 3,
                    "note": "定义源区域的两组对角方块坐标",
                    "list": "coordinate.z"
                },
                {
                    "length": 4,
                    "note": "定义源区域的两组对角方块坐标",
                    "list": "coordinate.x"
                },
                {
                    "length": 5,
                    "note": "定义源区域的两组对角方块坐标",
                    "list": "coordinate.y"
                },
                {
                    "length": 6,
                    "note": "定义源区域的两组对角方块坐标",
                    "list": "coordinate.z"
                },
                {
                    "length": 7,
                    "note": "定义目标区域的西北方向较低（即在各轴上坐标值最小）的点的坐标",
                    "list": "coordinate.x"
                },
                {
                    "length": 8,
                    "note": "定义目标区域的西北方向较低（即在各轴上坐标值最小）的点的坐标",
                    "list": "coordinate.y"
                },
                {
                    "length": 9,
                    "note": "定义目标区域的西北方向较低（即在各轴上坐标值最小）的点的坐标",
                    "list": "coordinate.z"
                },
                {
                    "length": 10,
                    "note": "指定是否过滤被复制方块",
                    "list": "commands.clone.mask_mode"
                },
                {
                    "length": 11,
                    "note": "指定对源区域的操作",
                    "list": "commands.clone.clone_mode"
                }
            ],
            "display": [
                {
                    "length": 10,
                    "rule": {
                        "type": "regex-contrary",
                        "text": "/^filtered$/"
                    }
                }
            ]
        },
        {
            "grammar": "<开始: x y z> <结束: x y z> <目标: x y z> filtered <复制模式：复制模式> [方块名：方块] [方块数据：整数]",
            "info": [
                {
                    "length": 1,
                    "note": "定义源区域的两组对角方块坐标",
                    "list": "coordinate.x"
                },
                {
                    "length": 2,
                    "note": "定义源区域的两组对角方块坐标",
                    "list": "coordinate.y"
                },
                {
                    "length": 3,
                    "note": "定义源区域的两组对角方块坐标",
                    "list": "coordinate.z"
                },
                {
                    "length": 4,
                    "note": "定义源区域的两组对角方块坐标",
                    "list": "coordinate.x"
                },
                {
                    "length": 5,
                    "note": "定义源区域的两组对角方块坐标",
                    "list": "coordinate.y"
                },
                {
                    "length": 6,
                    "note": "定义源区域的两组对角方块坐标",
                    "list": "coordinate.z"
                },
                {
                    "length": 7,
                    "note": "定义目标区域的西北方向较低（即在各轴上坐标值最小）的点的坐标",
                    "list": "coordinate.x"
                },
                {
                    "length": 8,
                    "note": "定义目标区域的西北方向较低（即在各轴上坐标值最小）的点的坐标",
                    "list": "coordinate.y"
                },
                {
                    "length": 9,
                    "note": "定义目标区域的西北方向较低（即在各轴上坐标值最小）的点的坐标",
                    "list": "coordinate.z"
                },
                {
                    "length": 10,
                    "note": "仅复制指定方块",
                    "list": "commands.clone.mask_mode"
                },
                {
                    "length": 11,
                    "note": "指定对源区域的操作",
                    "list": "commands.clone.clone_mode"
                },
                {
                    "length": 12,
                    "note": "指定要复制的方块ID",
                    "list": "block"
                },
                {
                    "length": 13,
                    "note": "指定复制时需要符合的方块数据值",
                    "list": "block.data"
                }
            ],
            "display": [
                {
                    "length": 10,
                    "rule": {
                        "type": "regex",
                        "text": "/^filtered$/"
                    }
                }
            ]
        }
    ],
    [
        {
            "command": {
                "name": "/^(\\/)?(connect|wsserver)$/",
                "info": "连接到指定的WebSocket服务器或断开当前的连接"
            }
        },
        {
            "grammar": "<服务器URI：字符串>",
            "info": [
                {
                    "length": 1,
                    "note": "指向WebSocket服务器的URI",
                    "list": "commands.wsserver.out; commands.wsserver.uri"
                }
            ],
            "display": [
                {
                    "length": 1,
                    "rule": {
                        "type": "regex-contrary",
                        "text": "/^out$/"
                    }
                }
            ]
        },
        {
            "grammar": "out",
            "info": [
                {
                    "length": 1,
                    "note": "断开当前的连接",
                    "list": "commands.wsserver.out; commands.wsserver.uri"
                }
            ],
            "display": [
                {
                    "length": 1,
                    "rule": {
                        "type": "regex",
                        "text": "/^out$/"
                    }
                }
            ]
        }
    ],
    [
        {
            "command": {
                "name": "/^(\\/)?(deop)$/",
                "info": "撤销玩家的管理员身份"
            }
        },
        {
            "grammar": "<玩家：目标>",
            "info": [
                {
                    "length": 1,
                    "note": "指定要从管理员列表中移除的玩家",
                    "list": "selector"
                }
            ]
        }
    ],
    [
        {
            "command": {
                "name": "/^(\\/)?(difficulty)$/",
                "info": "设定难度等级"
            }
        },
        {
            "grammar": "<难度：难度>",
            "info": [
                {
                    "length": 1,
                    "note": "指定要设置的难度",
                    "list": "difficulty"
                }
            ],
            "display": [
                {
                    "length": 1,
                    "rule": {
                        "type": "regex",
                        "text": "/^[a-z]/"
                    }
                }
            ]
        },
        {
            "grammar": "<难度：整数>",
            "info": [
                {
                    "length": 1,
                    "note": "指定要设置的难度",
                    "list": "difficulty"
                }
            ],
            "display": [
                {
                    "length": 1,
                    "rule": {
                        "type": "regex",
                        "text": "/^[0-9]/"
                    }
                }
            ]
        }
    ],
    [
        {
            "command": {
                "name": "/^(\\/)?(effect)$/",
                "info": "管理玩家及其他实体上的状态效果"
            }
        },
        {
            "grammar": "<玩家：目标> <效果：效果> [秒数：整数] [强度：整数] [隐藏粒子：布尔值]",
            "info": [
                {
                    "length": 1,
                    "note": "指定要被给予或移除效果的目标",
                    "list": "selector"
                },
                {
                    "length": 2,
                    "note": "指定给予的效果",
                    "list": "effect; commands.effect.clear"
                },
                {
                    "length": 3,
                    "note": "指定以秒（部分为游戏刻）为单位指定效果时长",
                    "list": "commands.effect.seconds"
                },
                {
                    "length": 4,
                    "note": "指定效果的额外等级",
                    "list": "commands.effect.intensity"
                },
                {
                    "length": 5,
                    "note": "指定是否隐藏状态效果的粒子",
                    "list": "boolean"
                }
            ],
            "display": [
                {
                    "length": 2,
                    "rule": {
                        "type": "regex-contrary",
                        "text": "/^clear$/"
                    }
                }
            ]
        },
        {
            "grammar": "<玩家：目标> clear",
            "info": [
                {
                    "length": 1,
                    "note": "指定要被给予或移除效果的目标",
                    "list": "selector"
                },
                {
                    "length": 2,
                    "note": "移除所有效果",
                    "list": "effect; commands.effect.clear"
                }
            ],
            "display": [
                {
                    "length": 2,
                    "rule": {
                        "type": "regex",
                        "text": "/^clear$/"
                    }
                }
            ]
        }
    ],
    [
        {
            "command": {
                "name": "/^(\\/)?(enchant)$/",
                "info": "为一位玩家手持的物品添加魔咒"
            }
        },
        {
            "grammar": "<玩家：目标> <魔咒：魔咒> [等级：整数]",
            "info": [
                {
                    "length": 1,
                    "note": "指定目标玩家",
                    "list": "selector"
                },
                {
                    "length": 2,
                    "note": "指定添加至玩家手持物品的魔咒",
                    "list": "enchantment"
                },
                {
                    "length": 3,
                    "note": "指定魔咒等级",
                    "list": "enchantment.level"
                }
            ],
            "display": [
                {
                    "length": 2,
                    "rule": {
                        "type": "regex",
                        "text": "/^[a-z]/"
                    }
                }
            ]
        },
        {
            "grammar": "<玩家：目标> <魔咒：整数> [等级：整数]",
            "info": [
                {
                    "length": 1,
                    "note": "指定目标玩家",
                    "list": "selector"
                },
                {
                    "length": 2,
                    "note": "指定添加至玩家手持物品的魔咒",
                    "list": "enchantment"
                },
                {
                    "length": 3,
                    "note": "指定魔咒等级",
                    "list": "enchantment.level"
                }
            ],
            "display": [
                {
                    "length": 2,
                    "rule": {
                        "type": "regex",
                        "text": "/^[0-9]/"
                    }
                }
            ]
        }
    ],
    [
        {
            "command": {
                "name": "/^(\\/)?(event)$/",
                "info": "触发指定的实体事件"
            }
        },
        {
            "grammar": "<目标：目标> <事件名称：字符串>",
            "info": [
                {
                    "length": 1,
                    "note": "指定实体事件的作用对象",
                    "list": "selector"
                },
                {
                    "length": 2,
                    "note": "指定命令触发的实体事件",
                    "list": "mob_event"
                }
            ]
        }
    ],
    [
        {
            "command": {
                "name": "/^(\\/)?(execute)$/",
                "info": "用于执行另一个命令，但是允许改变执行者、命令执行的位置和角度，添加限制执行条件"
            }
        },
        {
            "grammar": "<执行源：目标> <执行坐标：x y z> <命令：命令>",
            "info": [
                {
                    "length": 1,
                    "note": "指定目标命令执行者",
                    "list": "selector"
                },
                {
                    "length": 2,
                    "note": "指定命令运行的位置",
                    "list": "coordinate.x"
                },
                {
                    "length": 3,
                    "note": "指定命令运行的位置",
                    "list": "coordinate.y"
                },
                {
                    "length": 4,
                    "note": "指定命令运行的位置",
                    "list": "coordinate.z"
                },
                {
                    "length": 5,
                    "note": "指定要运行的命令",
                    "list": "command{input:{replace:'',text:'{name} '}}; commands.execute.detect"
                }
            ],
            "display": [
                {
                    "length": 5,
                    "rule": {
                        "type": "regex-contrary",
                        "text": "/^detect$/"
                    }
                }
            ]
        },
        {
            "grammar": "<执行源：目标> <执行坐标：x y z> detect <探测坐标：x y z> <方块：方块> <方块数据：整数> <命令：命令>",
            "info": [
                {
                    "length": 1,
                    "note": "指定目标命令执行者",
                    "list": "selector"
                },
                {
                    "length": 2,
                    "note": "指定命令运行的位置",
                    "list": "coordinate.x"
                },
                {
                    "length": 3,
                    "note": "指定命令运行的位置",
                    "list": "coordinate.y"
                },
                {
                    "length": 4,
                    "note": "指定命令运行的位置",
                    "list": "coordinate.z"
                },
                {
                    "length": 5,
                    "note": "检测方块",
                    "list": "command{input:{replace:'',text:'{name} '}}; commands.execute.detect"
                },
                {
                    "length": 6,
                    "note": "指定要检测方块的位置",
                    "list": "coordinate"
                },
                {
                    "length": 7,
                    "note": "指定要检测的方块ID",
                    "list": "block"
                },
                {
                    "length": 8,
                    "note": "指定要检测的方块的数据值",
                    "list": "block.data"
                },
                {
                    "length": 9,
                    "note": "指定要运行的命令",
                    "list": "command{input:{replace:'',text:'{name} '}}"
                }
            ],
            "display": [
                {
                    "length": 5,
                    "rule": {
                        "type": "regex",
                        "text": "/^detect$/"
                    }
                }
            ]
        }
    ],
    [
        {
            "command": {
                "name": "/^(\\/)?(fill)$/",
                "info": "用特定方块填充一个区域的全部或部分"
            }
        },
        {
            "grammar": "<开始：x y z> <结束：x y z> <方块：方块> [数据：整数] [填充模式：模式]",
            "info": [
                {
                    "length": 1,
                    "note": "定义填充区域的两组对角方块坐标",
                    "list": "coordinate.x"
                },
                {
                    "length": 2,
                    "note": "定义填充区域的两组对角方块坐标",
                    "list": "coordinate.y"
                },
                {
                    "length": 3,
                    "note": "定义填充区域的两组对角方块坐标",
                    "list": "coordinate.z"
                },
                {
                    "length": 4,
                    "note": "定义填充区域的两组对角方块坐标",
                    "list": "coordinate.x"
                },
                {
                    "length": 5,
                    "note": "定义填充区域的两组对角方块坐标",
                    "list": "coordinate.y"
                },
                {
                    "length": 6,
                    "note": "定义填充区域的两组对角方块坐标",
                    "list": "coordinate.z"
                },
                {
                    "length": 7,
                    "note": "指定用于填充该区域的方块",
                    "list": "block"
                },
                {
                    "length": 8,
                    "note": "指定用于填充方块的方块数据",
                    "list": "block.data"
                },
                {
                    "length": 9,
                    "note": "指定填充模式",
                    "list": "commands.fill.model"
                }
            ],
            "display": [
                {
                    "length": 8,
                    "rule": {
                        "type": "regex",
                        "text": "/^[0-9]/"
                    }
                },
                {
                    "length": 9,
                    "rule": {
                        "type": "regex-contrary",
                        "text": "/^replace$/"
                    }
                }
            ]
        },
        {
            "grammar": "<开始：x y z> <结束：x y z> <方块：方块> [方块状态：方块状态] [填充模式：模式]",
            "info": [
                {
                    "length": 1,
                    "note": "定义填充区域的两组对角方块坐标",
                    "list": "coordinate.x"
                },
                {
                    "length": 2,
                    "note": "定义填充区域的两组对角方块坐标",
                    "list": "coordinate.y"
                },
                {
                    "length": 3,
                    "note": "定义填充区域的两组对角方块坐标",
                    "list": "coordinate.z"
                },
                {
                    "length": 4,
                    "note": "定义填充区域的两组对角方块坐标",
                    "list": "coordinate.x"
                },
                {
                    "length": 5,
                    "note": "定义填充区域的两组对角方块坐标",
                    "list": "coordinate.y"
                },
                {
                    "length": 6,
                    "note": "定义填充区域的两组对角方块坐标",
                    "list": "coordinate.z"
                },
                {
                    "length": 7,
                    "note": "指定用于填充该区域的方块",
                    "list": "block"
                },
                {
                    "length": 8,
                    "note": "指定用于填充方块的方块状态",
                    "list": "block.state"
                },
                {
                    "length": 9,
                    "note": "指定填充模式",
                    "list": "commands.fill.model"
                }
            ],
            "display": [
                {
                    "length": 8,
                    "rule": {
                        "type": "regex-contrary",
                        "text": "/^[0-9]/"
                    }
                },
                {
                    "length": 9,
                    "rule": {
                        "type": "regex-contrary",
                        "text": "/^replace$/"
                    }
                }
            ]
        },
        {
            "grammar": "<开始：x y z> <结束：x y z> <方块：方块> <数据：整数> replace [替换方块名：方块] [替换方块数据：整数]",
            "info": [
                {
                    "length": 1,
                    "note": "定义填充区域的两组对角方块坐标",
                    "list": "coordinate.x"
                },
                {
                    "length": 2,
                    "note": "定义填充区域的两组对角方块坐标",
                    "list": "coordinate.y"
                },
                {
                    "length": 3,
                    "note": "定义填充区域的两组对角方块坐标",
                    "list": "coordinate.z"
                },
                {
                    "length": 4,
                    "note": "定义填充区域的两组对角方块坐标",
                    "list": "coordinate.x"
                },
                {
                    "length": 5,
                    "note": "定义填充区域的两组对角方块坐标",
                    "list": "coordinate.y"
                },
                {
                    "length": 6,
                    "note": "定义填充区域的两组对角方块坐标",
                    "list": "coordinate.z"
                },
                {
                    "length": 7,
                    "note": "指定用于填充该区域的方块",
                    "list": "block"
                },
                {
                    "length": 8,
                    "note": "指定用于填充方块的方块数据",
                    "list": "block.data"
                },
                {
                    "length": 9,
                    "note": "全部填充，无掉落物",
                    "list": "commands.fill.model"
                },
                {
                    "length": 10,
                    "note": "指定要被替换的方块",
                    "list": "block"
                },
                {
                    "length": 11,
                    "note": "指定要被替换方块的方块数据",
                    "list": "block.data"
                }
            ],
            "display": [
                {
                    "length": 8,
                    "rule": {
                        "type": "regex",
                        "text": "/^[0-9]/"
                    }
                },
                {
                    "length": 9,
                    "rule": {
                        "type": "regex",
                        "text": "/^replace$/"
                    }
                }
            ]
        },
        {
            "grammar": "<开始：x y z> <结束：x y z> <方块：方块> <方块状态：方块状态> replace [替换方块名：方块] [替换方块数据：整数]",
            "info": [
                {
                    "length": 1,
                    "note": "定义填充区域的两组对角方块坐标",
                    "list": "coordinate.x"
                },
                {
                    "length": 2,
                    "note": "定义填充区域的两组对角方块坐标",
                    "list": "coordinate.y"
                },
                {
                    "length": 3,
                    "note": "定义填充区域的两组对角方块坐标",
                    "list": "coordinate.z"
                },
                {
                    "length": 4,
                    "note": "定义填充区域的两组对角方块坐标",
                    "list": "coordinate.x"
                },
                {
                    "length": 5,
                    "note": "定义填充区域的两组对角方块坐标",
                    "list": "coordinate.y"
                },
                {
                    "length": 6,
                    "note": "定义填充区域的两组对角方块坐标",
                    "list": "coordinate.z"
                },
                {
                    "length": 7,
                    "note": "指定用于填充该区域的方块",
                    "list": "block"
                },
                {
                    "length": 8,
                    "note": "指定用于填充方块的方块状态",
                    "list": "block.state"
                },
                {
                    "length": 9,
                    "note": "全部填充，无掉落物",
                    "list": "commands.fill.model"
                },
                {
                    "length": 10,
                    "note": "指定要被替换的方块",
                    "list": "block"
                },
                {
                    "length": 11,
                    "note": "指定要被替换方块的方块数据",
                    "list": "block.data"
                }
            ],
            "display": [
                {
                    "length": 8,
                    "rule": {
                        "type": "regex-contrary",
                        "text": "/^[0-9]/"
                    }
                },
                {
                    "length": 9,
                    "rule": {
                        "type": "regex",
                        "text": "/^replace$/"
                    }
                }
            ]
        }
    ],
    [
        {
            "command": {
                "name": "/^(\\/)?(fog)$/",
                "info": "管理玩家的距离模糊与体积雾配置"
            }
        },
        
        // TODO: translate
        // 因为wiki没有该部分内容，此处翻译参考 ProjectXero 大佬的命令助手
        
        {
            "grammar": "<目标：目标> push <迷雾 ID：字符串> <\u200EuserProvidedId：字符串>",
            "info": [
                {
                    "length": 1,
                    "note": "指定玩家",
                    "list": "selector"
                },
                {
                    "length": 2,
                    "note": "加入配置",
                    "list": "commands.fog.model"
                },
                {
                    "length": 3,
                    "note": "指定要加入配制的迷雾 ID",
                    "list": "fog"
                },
                {
                    "length": 4,
                    "note": "指定自定义 ID",
                    "list": "commands.fog.user_provided_id"
                }
            ],
            "display": [
                {
                    "length": 2,
                    "rule": {
                        "type": "regex",
                        "text": "/^push$/"
                    }
                }
            ]
        },
        {
            "grammar": "<目标：目标> <\u200Emode：delete> <\u200EuserProvidedId：字符串>",
            "info": [
                {
                    "length": 1,
                    "note": "指定玩家",
                    "list": "selector"
                },
                {
                    "length": 2,
                    "note": "指定模式",
                    "list": "commands.fog.model"
                },
                {
                    "length": 3,
                    "note": "指定自定义 ID",
                    "list": "commands.fog.user_provided_id"
                }
            ],
            "display": [
                {
                    "length": 2,
                    "rule": {
                        "type": "regex-contrary",
                        "text": "/^push$/"
                    }
                }
            ]
        }
    ],
    [
        {
            "command": {
                "name": "/^(\\/)?(function)$/",
                "info": "运行行为包内的1个函数"
            }
        },
        {
            "grammar": "<名称：路径>",
            "info": [
                {
                    "length": 1,
                    "note": "指定要运行的函数的路径",
                    "list": "commands.function.path"
                }
            ]
        }
    ],
    [
        {
            "command": {
                "name": "/^(\\/)?(locate)$/",
                "info": "在聊天框中为命令执行者显示给定类型结构的最近坐标和距离"
            }
        },
        {
            // "grammar": "<特性：字符串>",  
            // wiki上的蜜汁翻译 （
            "grammar": "<结构名称：字符串>",
            "info": [
                {
                    "length": 1,
                    "note": "指定要定位的结构",
                    "list": "enchantment; item; block"
                }
            ]
        }
    ],
    [
        {
            "command": {
                "name": "/^(\\/)?(teleport|tp)$/",
                "info": "传送实体（玩家、生物等）"
            }
        },
        {
            "grammar": "<目的地：x y z> [检查方块：布尔值]",
            "info": [
                {
                    "note": "指定要被传送到的坐标",
                    "list": "coordinate.x; selector"
                },
                {
                    "note": "指定要被传送到的坐标",
                    "list": "coordinate.y"
                },
                {
                    "note": "指定要被传送到的坐标",
                    "list": "coordinate.z"
                },
                {
                    "note": "指定是否检查目的地是否有实体无法存在其中的方块",
                    "list": "boolean; rotation.y; commands.tp.facing"
                }
            ],
            "display": [
                {
                    "length": 1,
                    "rule": {
                        "type": "isCoordinate"
                    }
                },
                {
                    "length": 2,
                    "rule": {
                        "type": "regex-contrary",
                        "text": "/^([-~.0-9]+|facing)$/"
                    }
                }
            ]
        },
        {
            "grammar": "<目的地：x y z> [y旋转角度：角度] [x旋转角度：角度] [检查方块：布尔值]",
            "info": [
                {
                    "note": "指定要被传送到的坐标",
                    "list": "coordinate.x; selector"
                },
                {
                    "note": "指定要被传送到的坐标",
                    "list": "coordinate.y"
                },
                {
                    "note": "指定要被传送到的坐标",
                    "list": "coordinate.z"
                },
                {
                    "note": "指定实体传送后的旋转角度",
                    "list": "rotation.y"
                },
                {
                    "note": "指定实体传送后的旋转角度",
                    "list": "rotation.x"
                },
                {
                    "note": "指定是否检查目的地是否有实体无法存在其中的方块",
                    "list": "boolean"
                }
            ],
            "display": [
                {
                    "length": 1,
                    "rule": {
                        "type": "isCoordinate"
                    }
                },
                {
                    "length": 4,
                    "rule": {
                        "type": "regex",
                        "text": "/^[-~.0-9]+$/"
                    }
                }
            ]
        },
        {
            "grammar": "<目的地：x y z> facing <指定朝向坐标：x y z> [检查方块：布尔值]",
            "info": [
                {
                    "note": "指定要被传送到的坐标",
                    "list": "coordinate.x; selector"
                },
                {
                    "note": "指定要被传送到的坐标",
                    "list": "coordinate.y"
                },
                {
                    "note": "指定要被传送到的坐标",
                    "list": "coordinate.z"
                },
                {
                    "note": "指定朝向",
                    "list": "commands.tp.facing"
                },
                {
                    "note": "指定实体传送后朝向的坐标",
                    "list": "coordinate.x; selector"
                },
                {
                    "note": "指定实体传送后朝向的坐标",
                    "list": "coordinate.y"
                },
                {
                    "note": "指定实体传送后朝向的坐标",
                    "list": "coordinate.z"
                },
                {
                    "note": "指定是否检查目的地是否有实体无法存在其中的方块",
                    "list": "boolean"
                }
            ],
            "display": [
                {
                    "length": 1,
                    "rule": {
                        "type": "isCoordinate"
                    }
                },
                {
                    "length": 4,
                    "rule": {
                        "type": "regex",
                        "text": "/^facing$/"
                    }
                },
                {
                    "length": 5,
                    "rule": {
                        "type": "regex-contrary",
                        "text": "/^@/"
                    }
                }
            ]
        },
        {
            "grammar": "<目的地：x y z> facing <指定朝向实体：目标> [检查方块：布尔值]",
            "info": [
                {
                    "note": "指定要被传送到的坐标",
                    "list": "coordinate.x; selector"
                },
                {
                    "note": "指定要被传送到的坐标",
                    "list": "coordinate.y"
                },
                {
                    "note": "指定要被传送到的坐标",
                    "list": "coordinate.z"
                },
                {
                    "note": "指定朝向",
                    "list": "commands.tp.facing"
                },
                {
                    "note": "指定实体传送后朝向的实体",
                    "list": "selector"
                },
                {
                    "note": "指定是否检查目的地是否有实体无法存在其中的方块",
                    "list": "boolean"
                }
            ],
            "display": [
                {
                    "length": 1,
                    "rule": {
                        "type": "isCoordinate"
                    }
                },
                {
                    "length": 4,
                    "rule": {
                        "type": "regex",
                        "text": "/^facing$/"
                    }
                },
                {
                    "length": 5,
                    "rule": {
                        "type": "isSelector"
                    }
                }
            ]
        },
        {
            "grammar": "<目的地：目标> [检查方块：布尔值]",
            "info": [
                {
                    "note": "指定要被传送到的实体",
                    "list": "selector"
                },
                {
                    "note": "指定是否检查目的地是否有实体无法存在其中的方块",
                    "list": "boolean; coordinate.x; selector"
                }
            ],
            "display": [
                {
                    "length": 1,
                    "rule": {
                        "type": "isSelector"
                    }
                },
                {
                    "length": 2,
                    "rule": {
                        "type": "regex-contrary",
                        "text": "/(^@|^[-~^.0-9]+$)/g"
                    }
                }
                
            ]
        },
        {
            "grammar": "<传送目标：目标> <目的地：目标> [检查方块：布尔值]",
            "info": [
                {
                    "note": "指定要被传送的实体",
                    "list": "selector"
                },
                {
                    "note": "指定要被传送到的实体",
                    "list": "selector"
                },
                {
                    "note": "指定是否检查目的地是否有实体无法存在其中的方块",
                    "list": "boolean"
                }
            ],
            "display": [
                {
                    "length": 1,
                    "rule": {
                        "type": "isSelector"
                    }
                },
                {
                    "length": 2,
                    "rule": {
                        "type": "isSelector"
                    }
                }
            ]
        },
        {
            "grammar": "<传送目标：目标> <目的地：x y z> [检查方块：布尔值]",
            "info": [
                {
                    "note": "指定要被传送的实体",
                    "list": "selector"
                },
                {
                    "note": "指定要被传送到的坐标",
                    "list": "coordinate.x"
                },
                {
                    "note": "指定要被传送到的坐标",
                    "list": "coordinate.y"
                }, 
                {
                    "note": "指定要被传送到的坐标",
                    "list": "coordinate.z"
                },
                {
                    "note": "指定是否检查目的地是否有实体无法存在其中的方块",
                    "list": "boolean; rotation.y; commands.tp.facing"
                }
            ],
            "display": [
                {
                    "length": 1,
                    "rule": {
                        "type": "isSelector"
                    }
                },
                {
                    "length": 2,
                    "rule": {
                        "type": "isCoordinate"
                    }
                },
                {
                    "length": 5,
                    "rule": {
                        "type": "regex-contrary",
                        "text": "/^([-~.0-9]+|facing)$/"
                    }
                }
            ]
        },
        {
            "grammar": "<传送目标：目标> <目的地：x y z> [y旋转角度：角度] [x旋转角度：角度] [检查方块：布尔值]",
            "info": [
                {
                    "note": "指定要被传送的实体",
                    "list": "selector"
                },
                {
                    "note": "指定要被传送到的坐标",
                    "list": "coordinate.x"
                },
                {
                    "note": "指定要被传送到的坐标",
                    "list": "coordinate.y"
                }, 
                {
                    "note": "指定要被传送到的坐标",
                    "list": "coordinate.z"
                },
                {
                    "note": "指定实体传送后的旋转角度",
                    "list": "rotation.y"
                },
                {
                    "note": "指定实体传送后的旋转角度",
                    "list": "rotation.x"
                },
                {
                    "note": "指定是否检查目的地是否有实体无法存在其中的方块",
                    "list": "boolean"
                }
            ],
            "display": [
                {
                    "length": 1,
                    "rule": {
                        "type": "isSelector"
                    }
                },
                {
                    "length": 2,
                    "rule": {
                        "type": "isCoordinate"
                    }
                },
                {
                    "length": 5,
                    "rule": {
                        "type": "regex",
                        "text": "/^[-~.0-9]+$/"
                    }
                }
            ]
        },
        {
            "grammar": "<传送目标：目标> <目的地：x y z> facing <指定朝向坐标：x y z> [检查方块：布尔值]",
            "info": [
                {
                    "note": "指定要被传送的实体",
                    "list": "selector"
                },
                {
                    "note": "指定要被传送到的坐标",
                    "list": "coordinate.x"
                },
                {
                    "note": "指定要被传送到的坐标",
                    "list": "coordinate.y"
                }, 
                {
                    "note": "指定要被传送到的坐标",
                    "list": "coordinate.z"
                },
                {
                    "note": "指定朝向",
                    "list": "commands.tp.facing"
                },
                {
                    "note": "指定实体传送后朝向的坐标",
                    "list": "coordinate.x; selector"
                },
                {
                    "note": "指定实体传送后朝向的坐标",
                    "list": "coordinate.y"
                },
                {
                    "note": "指定实体传送后朝向的坐标",
                    "list": "coordinate.z"
                },
                {
                    "note": "指定是否检查目的地是否有实体无法存在其中的方块",
                    "list": "boolean"
                }
            ],
            "display": [
                {
                    "length": 1,
                    "rule": {
                        "type": "isSelector"
                    }
                },
                {
                    "length": 2,
                    "rule": {
                        "type": "isCoordinate"
                    }
                },
                {
                    "length": 5,
                    "rule": {
                        "type": "regex",
                        "text": "/^facing$/"
                    }
                },
                {
                    "length": 6,
                    "rule": {
                        "type": "regex-contrary",
                        "text": "/^@/"
                    }
                }
            ]
        },
        {
            "grammar": "<传送目标：目标> <目的地：x y z> facing <指定朝向坐标：目标> [检查方块：布尔值]",
            "info": [
                {
                    "note": "指定要被传送的实体",
                    "list": ""
                },
                {
                    "note": "指定要被传送到的坐标",
                    "list": "coordinate.x"
                },
                {
                    "note": "指定要被传送到的坐标",
                    "list": "coordinate.y"
                }, 
                {
                    "note": "指定要被传送到的坐标",
                    "list": "coordinate.z"
                },
                {
                    "note": "指定朝向",
                    "list": "commands.tp.facing"
                },
                {
                    "note": "指定实体传送后朝向的实体",
                    "list": "selector"
                },
                {
                    "note": "指定是否检查目的地是否有实体无法存在其中的方块",
                    "list": "boolean"
                }
            ],
            "display": [
                {
                    "length": 1,
                    "rule": {
                        "type": "isSelector"
                    }
                },
                {
                    "length": 2,
                    "rule": {
                        "type": "isCoordinate"
                    }
                },
                {
                    "length": 5,
                    "rule": {
                        "type": "regex",
                        "text": "/^facing$/"
                    }
                },
                {
                    "length": 6,
                    "rule": {
                        "type": "isSelector"
                    }
                }
            ]
        }
    ]
]