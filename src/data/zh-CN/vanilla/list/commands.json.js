export default {
    "execute": {
        "detect": [
            {
                "template": {},
                "__app_list__": true
            },
            {
                "name": "detect",
                "info": "[不是命令] 检测方块。",
                "input": {
                    "text": "{name} "
                }
            }
        ]
    },
    "tp": {
        "facing": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                },
                "__app_list__": true
            },
            {
                "name": "facing",
                "info": "指定朝向"
            }
        ]
    },
    "help": {
        "page_number": [{
            "__app_list__": true
        }]
    },
    "camerashake": {
        "model": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                },
                "__app_list__": true
            },
            {
                "name": "add",
                "info": "添加"
            },
            {
                "name": "stop",
                "info": "停止"
            }
        ],
        "shake_type": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                },
                "__app_list__": true
            },
            {
                "name": "positional",
                "info": "坐标摇晃"
            },
            {
                "name": "rotational",
                "info": "角度摇晃"
            }
        ],
        "intensity": [{
            "__app_list__": true
        }],
        "seconds": [{
            "__app_list__": true
        }]
    },
    "changesetting": {
        "model": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                },
                "__app_list__": true
            },
            {
                "name": "allow-cheats",
                "info": "是否允许作弊"
            },
            {
                "name": "difficulty",
                "info": "设置难度"
            }
        ]
    },
    "clear": {
        "max_count": [{
            "__app_list__": true
        }]
    },
    "clone": {
        "mask_mode": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                },
                "__app_list__": true
            },
            {
                "name": "replace",
                "info": "[默认] 复制所有方块"
            },
            {
                "name": "masked",
                "info": "仅复制非空气方块"
            },
            {
                "name": "filtered",
                "info": "仅复制指定方块"
            }
        ],
        "clone_mode": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                },
                "__app_list__": true
            },
            {
                "name": "normal",
                "info": "[默认] 不执行 force 与 move"
            },
            {
                "name": "force",
                "info": "强制复制，即使源区域与目标区域有重叠"
            },
            {
                "name": "move",
                "info": "将源区域复制到目标区域，并将源区域替换为空气"
            }
        ]
    },
    "wsserver": {
        "uri": [{
            "__app_list__": true
        }],
        "out": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                },
                "__app_list__": true
            },
            {
                "name": "out",
                "info": "断开当前的连接"
            }
        ]
    },
    "effect": {
        "clear": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                },
                "__app_list__": true
            },
            {
                "name": "clear",
                "info": "移除所有效果"
            }
        ],
        "intensity": [
            {
                "template": {},
                "__app_list__": true
            },
            {
                "info": "一级为 0，最大为 255"
            }
        ],
        "seconds": [
            {
                "template": {},
                "__app_list__": true
            },
            {
                "info": "1 到 2,040,109,465 有效，最大为 2,147,483,647"
            },
            {
                "info": "瞬间伤害、瞬间治疗和饱和的单位为游戏刻"
            }
        ]
    },
    "fill": {
        "model": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                },
                "__app_list__": true
            },
            {
                "name": "replace",
                "info": "[默认] 全部填充，无掉落物"
            },
            {
                "name": "destroy",
                "info": "全部填充，有掉落物"
            },
            {
                "name": "hollow",
                "info": "仅用指定方块替换填充区域外层的方块，内部方块被替换为空气"
            },
            {
                "name": "outline",
                "info": "仅用指定方块替换填充区域外层的方块，内部方块不受影响"
            },
            {
                "name": "keep",
                "info": "仅用指定方块替换填充区域内的空气方块"
            }
        ]
    },
    "fog": {
        "model": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                },
                "__app_list__": true
            },
            
            // TODO: translate
            // 因为wiki没有该部分内容，此处翻译参考 ProjectXero 大佬的命令助手
            
            {
                "name": "push",
                "info": "加入配置"
            },
            {
                "name": "pop",
                "info": "移除首个指定自定义ID的配置"
            },
            {
                "name": "remove",
                "info": "移除所有指定自定义ID的配置"
            }
        ],
        "user_provided_id": [{
            "__app_list__": true
        }]
    },
    "function": {
        "path": [{
            "__app_list__": true
        }]
    }
}