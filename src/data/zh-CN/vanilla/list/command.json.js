export default [
    {
        "template": {
            "url": "{command_page}{name}",
            "input": {
                "replace": "all",
                "text": "/{name} "
            }
        },
        "__app_list__": true
    },
    {
        "name": "?",
        "info": "提供命令列表或单个命令的帮助信息。",
        "edition": [
            
        ]
    },
    {
        "name": "ability",
        "info": "[仅教育版] 赋予或剥夺玩家的能力。"
    },
    {
        "name": "alwaysday",
        "info": "锁定或解锁日夜循环。"
    },
    {
        "name": "camerashake",
        "info": "对玩家视野施以一定强度和时间的摇晃效果。"
    },
    {
        "name": "changesetting",
        "info": "[仅服务端] 在基岩版专用服务器（BDS）上运行时更改设置。"
    },
    {
        "name": "clear",
        "info": "清除玩家物品栏的物品。"
    },
    {
        "name": "clearspawnpoint",
        "info": "清除世界中设置的重生点。"
    },
    {
        "name": "clone",
        "info": "在指定区域之间复制方块结构。"
    },/*
    {
        "name": "closechat",
        "info": "如果聊天框已打开，则关闭它。"
    },
    {
        "name": "codebuilder",
        "info": "设置一个玩家的代码编辑状态。"
    },*/
    {
        "name": "connect",
        "info": "连接到指定的WebSocket服务器或断开当前的连接。"
    },
    {
        "name": "daylock",
        "info": "锁定或解锁日夜循环。"
    },/*
    {
        "name": "dedicatedwsserver",
        "info": "尝试连接一个WebSocket服务器。"
    },*/
    {
        "name": "deop",
        "info": "撤销玩家的管理员身份。"
    },
    {
        "name": "difficulty",
        "info": "设定难度等级。"
    },
    {
        "name": "effect",
        "info": "管理玩家及其他实体上的状态效果。"
    },
    {
        "name": "enchant",
        "info": "为一位玩家手持的物品添加魔咒。"
    },
    {
        "name": "event",
        "info": "触发指定的实体事件。"
    },
    {
        "name": "fill",
        "info": "用特定方块填充一个区域的全部或部分。"
    },
    {
        "name": "fog",
        "info": "管理玩家的距离模糊与体积雾配置"
    },
    {
        "name": "function",
        "info": "运行行为包内的1个函数"
    },
    {
        "name": "execute",
        "info": "用于执行另一个命令，但是允许改变执行者、命令执行的位置和角度，添加限制执行条件。"
    },
    {
        "name": "help",
        "info": "提供命令列表或单个命令的帮助信息。"
    },
    {
        "name": "locate",
        "info": "在聊天框中为命令执行者显示给定类型结构的最近坐标和距离。"
    },
    {
        "name": "teleport",
        "info": "传送实体（玩家、生物等）。"
    },
    {
        "name": "tp",
        "info": "传送实体（玩家、生物等）。"
    },
    {
        "name": "wsserver",
        "info": "连接到指定的WebSocket服务器或断开当前的连接。"
    }
]