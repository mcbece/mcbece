export default {
    "next": [
        {
            "template": {},
            "option": {
                "searchable": false
            },
            "__app_list__": true
        },
        {
            "name": "[",
            "info": "使用参数",
            "input": {
                "replace": "none",
                "text": "{name}"
            }
        },
        {
            "name": "",
            "info": "下一项",
            "input": {
                "replace": "none",
                "text": " "
            }
        }
    ],
    "next_argument": [
        {
            "template": {},
            "option": {
                "searchable": false
            },
            "__app_list__": true
        },
        {
            "name": ",",
            "info": "下一个参数",
            "input": {
                "replace": "none",
                "text": "{name}"
            }
        },
        {
            "name": "]",
            "info": "结束",
            "input": {
                "replace": "none",
                "text": "{name} "
            }
        }
    ],
    "variable": [
        {
            "extend": "player",
            "template": {
                "url": "{command_page}",
                "input": {
                    "text": "{name}"
                }
            },
            "__app_list__": true
        },
        {
            "name": "@p",
            "info": "选择最近的玩家。"
        },
        {
            "name": "@r",
            "info": "选择随机玩家。"
        },
        {
            "name": "@a",
            "info": "选择所有玩家，包括已死亡玩家。"
        },
        {
            "name": "@e",
            "info": "选择所有实体（包含玩家），不包含死亡的实体。"
        },
        {
            "name": "@s",
            "info": "选择该命令的执行者（唯一的），包括已死亡玩家。"
        },
        {
            "name": "@c",
            "info": "[仅教育版] 选择自己的智能体。"
        },
        {
            "name": "@v",
            "info": "[仅教育版] 选择所有的智能体。"
        },
        {
            "name": "@initiator",
            "info": "[仅NPC内部命令] 选择当前与该NPC交互的玩家。"
        }
    ],
    "argument": [
        {
            "template": {
                "url": "{command_page}",
                "input": {
                    "replace": "last_selector_argument",
                    "text": "{name}="
                }
            },
            "__app_list__": true
        },
        {
            "name": "x",
            "info": "指定X轴基准点。",
            "value": [
                {
                    "extend": "coordinate.x<-{input:{replace:'none',text:'{name}'}}",
                    "__app_list__": true
                }
            ]
        },
        {
            "name": "y",
            "info": "指定Y轴基准点。",
            "value": [
                {
                    "extend": "coordinate.y<-{input:{replace:'none',text:'{name}'}}",
                    "__app_list__": true
                }
            ]
        },
        {
            "name": "z",
            "info": "指定Z轴基准点。",
            "value": [
                {
                    "extend": "coordinate.z<-{input:{replace:'none',text:'{name}'}}",
                    "__app_list__": true
                }
            ]
        },
        {
            "name": "r",
            "info": "通过最大距离选择目标。",
            "value": [{
                "__app_list__": true
            }]
        },
        {
            "name": "rm",
            "info": "通过最小距离选择目标。",
            "value": [{
                "__app_list__": true
            }]
        },
        {
            "name": "dx",
            "info": "指定X轴延伸距离。",
            "value": [{
                "__app_list__": true
            }]
        },
        {
            "name": "dy",
            "info": "指定Y轴延伸距离。",
            "value": [{
                "__app_list__": true
            }]
        },
        {
            "name": "dz",
            "info": "指定Z轴延伸距离。",
            "value": [{
                "__app_list__": true
            }]
        },
        {
            "name": "scores",
            "info": "通过计分项选择目标。",
            "value": [{
                "__app_list__": true
            }]
        },
        {
            "name": "tag",
            "info": "通过标签选择目标。",
            "value": [{
                "__app_list__": true
            }]
        },
        {
            "name": "c",
            "info": "指定数量并选择距离最近的目标。",
            "value": [{
                "__app_list__": true
            }]
        },
        {
            "name": "l",
            "info": "通过最大经验等级选择目标。",
            "value": [{
                "__app_list__": true
            }]
        },
        {
            "name": "lm",
            "info": "通过最小经验等级选择目标。",
            "value": [{
                "__app_list__": true
            }]
        },
        {
            "name": "m",
            "info": "通过游戏模式选择目标。",
            "value": [{
                "__app_list__": true
            }]
        },
        {
            "name": "name",
            "info": "通过名称选择目标。",
            "value": [{
                "__app_list__": true
            }]
        },
        {
            "name": "rx",
            "info": "通过最大垂直旋转角度选择目标。",
            "value": [{
                "__app_list__": true
            }]
        },
        {
            "name": "rxm",
            "info": "通过最小垂直旋转角度选择目标。",
            "value": [{
                "__app_list__": true
            }]
        },
        {
            "name": "ry",
            "info": "通过最大水平旋转角度选择目标。",
            "value": [{
                "__app_list__": true
            }]
        },
        {
            "name": "rym",
            "info": "通过最小水平旋转角度选择目标。",
            "value": [{
                "__app_list__": true
            }]
        },
        {
            "name": "type",
            "info": "通过实体类型选择目标。",
            "value": [
                {
                    "extend": "entity<-{input:{replace:'last_selector_argument_value',text:'{name}'}}",
                    "__app_list__": true
                }
            ]
        },
        {
            "name": "family",
            "info": "通过家族选择目标。",
            "value": [
                {
                    "extend": "entity.family<-{input:{replace:'last_selector_argument_value',text:'{name}'}}",
                    "__app_list__": true
                }
            ]
        },
        {
            "name": "hasitem",
            "info": "...",
            "value": [{
                "__app_list__": true
            }]
        }
    ]
}
