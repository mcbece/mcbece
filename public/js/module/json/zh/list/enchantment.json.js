export var json = [
    {
        "template": {
            "url": "{normal_page}{info}",
            "input": {
                "text": "{name} "
            }
        },
        "level": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "1",
                "info": "[默认] I 级"
            },
            {
                "name": "2",
                "info": "II 级"
            },
            {
                "name": "3",
                "info": "III 级"
            },
            {
                "name": "4",
                "info": "IV 级"
            },
            {
                "name": "5",
                "info": "V 级"
            }
        ]
    },
    {
        "name": "protection",
        "info": "保护",
        "level": 4
    },
    {
        "name": "fire_protection",
        "info": "火焰保护",
        "level": 4
    },
    {
        "name": "feather_falling",
        "info": "摔落保护",
        "level": 4
    },
    {
        "name": "blast_protection",
        "info": "爆炸保护",
        "level": 4
    },
    {
        "name": "projectile_protection",
        "info": "弹射物保护",
        "level": 4
    },
    {
        "name": "thorns",
        "info": "荆棘",
        "level": 3
    },
    {
        "name": "respiration",
        "info": "水下呼吸",
        "level": 3
    },
    {
        "name": "depth_strider",
        "info": "深海探索者",
        "level": 3
    },
    {
        "name": "aqua_affinity",
        "info": "水下速掘",
        "level": 1
    },
    {
        "name": "sharpness",
        "info": "锋利",
        "level": 5
    },
    {
        "name": "smite",
        "info": "亡灵杀手",
        "level": 5
    },
    {
        "name": "bane_of_arthropods",
        "info": "节肢杀手",
        "level": 5
    },
    {
        "name": "knockback",
        "info": "击退",
        "level": 2
    },
    {
        "name": "fire_aspect",
        "info": "火焰附加",
        "level": 2
    },
    {
        "name": "looting",
        "info": "抢夺",
        "level": 3
    },
    {
        "name": "efficiency",
        "info": "效率",
        "level": 5
    },
    {
        "name": "silk_touch",
        "info": "精准采集",
        "level": 1
    },
    {
        "name": "unbreaking",
        "info": "耐久",
        "level": 3
    },
    {
        "name": "fortune",
        "info": "时运",
        "level": 3
    },
    {
        "name": "power",
        "info": "力量",
        "level": 5
    },
    {
        "name": "punch",
        "info": "冲击",
        "level": 2
    },
    {
        "name": "flame",
        "info": "火矢",
        "level": 1
    },
    {
        "name": "infinity",
        "info": "无限",
        "level": 1
    },
    {
        "name": "luck_of_the_sea",
        "info": "海之眷顾",
        "level": 3
    },
    {
        "name": "lure",
        "info": "饵钓",
        "level": 3
    },
    {
        "name": "frost_walker",
        "info": "冰霜行者",
        "level": 2
    },
    {
        "name": "mending",
        "info": "经验修补",
        "level": 1
    },
    {
        "name": "binding",
        "info": "绑定诅咒",
        "level": 1
    },
    {
        "name": "vanishing",
        "info": "消失诅咒",
        "level": 1
    },
    {
        "name": "impaling",
        "info": "穿刺",
        "level": 5
    },
    {
        "name": "riptide",
        "info": "激流",
        "level": 3
    },
    {
        "name": "loyalty",
        "info": "忠诚",
        "level": 3
    },
    {
        "name": "channeling",
        "info": "引雷",
        "level": 1
    },
    {
        "name": "multishot",
        "info": "多重射击",
        "level": 1
    },
    {
        "name": "piercing",
        "info": "穿透",
        "level": 4
    },
    {
        "name": "quick_charge",
        "info": "快速装填",
        "level": 3
    },
    {
        "name": "soul_speed",
        "info": "灵魂疾行",
        "level": 3
    }
    
]

for (var i = 1; i < json.length; i++) {
    var output = [
        {
            "template": {
                "input": {
                    "text": "{name} "
                }
            }
        }
    ]
    for (var e = 0; e < json[i].level; e++) {
        output.push(json[0].level[e + 1])
    }
    json[i].level = output
}