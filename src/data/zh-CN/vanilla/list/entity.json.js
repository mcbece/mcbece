
// 待添加 `__app_list__` 属性

export default [
    {
        "name": "entity",
        "minecraft_version": "1.18.10.20",
        "template": {
            "input": {
                "text": "{name} "
            },
            "url": "{normal_page}{info}"
        },
        "__app_list__": true,
        "summonable": [
            {
                "name": "summonable_entity",
                "minecraft_version": "1.18.10.20",
                "template": {
                    "input": {
                        "text": "{name} "
                    },
                    "url": "{normal_page}{info}"
                },
                "__app_list__": true
            },
            {
                "name": "armor_stand",
                "info": "盔甲架"
            },
            {
                "name": "arrow",
                "info": "箭",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    }
                ]
            },
            {
                "name": "axolotl",
                "info": "美西螈",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_born",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ageable_grow_up",
                        "info": ""
                    },
                    {
                        "name": "attack_cooldown_complete_event",
                        "info": ""
                    },
                    {
                        "name": "dried_out",
                        "info": ""
                    },
                    {
                        "name": "killed_enemy_event",
                        "info": ""
                    },
                    {
                        "name": "stop_drying_out",
                        "info": ""
                    },
                    {
                        "name": "start_drying_out",
                        "info": ""
                    },
                    {
                        "name": "recover_after_dried_out",
                        "info": ""
                    },
                    {
                        "name": "enter_water",
                        "info": ""
                    }
                ]
            },
            {
                "name": "bat",
                "info": "蝙蝠"
            },
            {
                "name": "bee",
                "info": "蜜蜂",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_born",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ageable_grow_up",
                        "info": ""
                    },
                    {
                        "name": "minecraft:exited_disturbed_hive",
                        "info": ""
                    },
                    {
                        "name": "hive_destroyed",
                        "info": ""
                    },
                    {
                        "name": "stop_panicking_after_fire",
                        "info": ""
                    },
                    {
                        "name": "minecraft:exited_hive_on_fire",
                        "info": ""
                    },
                    {
                        "name": "minecraft:exited_hive",
                        "info": ""
                    },
                    {
                        "name": "minecraft:hive_full",
                        "info": ""
                    },
                    {
                        "name": "attacked",
                        "info": ""
                    },
                    {
                        "name": "calmed_down",
                        "info": ""
                    },
                    {
                        "name": "collected_nectar",
                        "info": ""
                    },
                    {
                        "name": "find_hive_event",
                        "info": ""
                    },
                    {
                        "name": "find_hive_timeout",
                        "info": ""
                    },
                    {
                        "name": "find_flower_timeout",
                        "info": ""
                    },
                    {
                        "name": "seek_shelter",
                        "info": ""
                    },
                    {
                        "name": "abort_sheltering",
                        "info": ""
                    },
                    {
                        "name": "countdown_to_perish_event",
                        "info": ""
                    },
                    {
                        "name": "perish_event",
                        "info": ""
                    }
                ]
            },
            {
                "name": "blaze",
                "info": "烈焰人",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "switch_to_melee",
                        "info": ""
                    },
                    {
                        "name": "switch_to_ranged",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_hurt_event",
                        "info": ""
                    }
                ]
            },
            {
                "name": "boat",
                "info": "船",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entered_bubble_column_down",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entered_bubble_column_up",
                        "info": ""
                    },
                    {
                        "name": "minecraft:exited_bubble_column",
                        "info": ""
                    },
                    {
                        "name": "minecraft:sink",
                        "info": ""
                    }
                ]
            },
            {
                "name": "cat",
                "info": "猫",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_from_village",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_born",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ageable_grow_up",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_midnight_cat",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_tame",
                        "info": ""
                    },
                    {
                        "name": "minecraft:pet_slept_with_owner",
                        "info": ""
                    },
                    {
                        "name": "minecraft:cat_gifted_owner",
                        "info": ""
                    }
                ]
            },
            {
                "name": "cave_spider",
                "info": "洞穴蜘蛛",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_hostile",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_neutral",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_angry",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_calm",
                        "info": ""
                    }
                ]
            },
            {
                "name": "chest_minecart",
                "info": "运输矿车"
            },
            {
                "name": "chicken",
                "info": "鸡",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_born",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ageable_grow_up",
                        "info": ""
                    },
                    {
                        "name": "from_egg",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_adult",
                        "info": ""
                    }
                ]
            },
            {
                "name": "cod",
                "info": "鳕鱼"
            },
            {
                "name": "command_block_minecart",
                "info": "命令方块矿车",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:command_block_activate",
                        "info": ""
                    },
                    {
                        "name": "minecraft:command_block_deactivate",
                        "info": ""
                    }
                ]
            },
            {
                "name": "cow",
                "info": "牛",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_transformed",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_born",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ageable_grow_up",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_adult",
                        "info": ""
                    }
                ]
            },
            {
                "name": "creeper",
                "info": "苦力怕",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:start_exploding_forced",
                        "info": ""
                    },
                    {
                        "name": "minecraft:start_exploding",
                        "info": ""
                    },
                    {
                        "name": "minecraft:stop_exploding",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_charged",
                        "info": ""
                    }
                ]
            },
            {
                "name": "dolphin",
                "info": "海豚",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ageable_grow_up",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_angry",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_calm",
                        "info": ""
                    },
                    {
                        "name": "minecraft:stop_dryingout",
                        "info": ""
                    },
                    {
                        "name": "minecraft:start_dryingout",
                        "info": ""
                    },
                    {
                        "name": "minecraft:dried_out",
                        "info": ""
                    },
                    {
                        "name": "minecraft:navigation_on_land",
                        "info": ""
                    },
                    {
                        "name": "minecraft:navigation_off_land",
                        "info": ""
                    },
                    {
                        "name": "ageable_grow_up",
                        "info": ""
                    },
                    {
                        "name": "become_angry",
                        "info": ""
                    },
                    {
                        "name": "on_calm",
                        "info": ""
                    },
                    {
                        "name": "stop_dryingout",
                        "info": ""
                    },
                    {
                        "name": "start_dryingout",
                        "info": ""
                    },
                    {
                        "name": "dried_out",
                        "info": ""
                    },
                    {
                        "name": "navigation_on_land",
                        "info": ""
                    },
                    {
                        "name": "navigation_off_land",
                        "info": ""
                    },
                    {
                        "name": "recover_after_dried_out",
                        "info": ""
                    }
                ]
            },
            {
                "name": "donkey",
                "info": "驴",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_born",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ageable_grow_up",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_tame",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_chest",
                        "info": ""
                    },
                    {
                        "name": "minecraft:donkey_saddled",
                        "info": ""
                    },
                    {
                        "name": "minecraft:donkey_unsaddled",
                        "info": ""
                    }
                ]
            },
            {
                "name": "drowned",
                "info": "溺尸",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:as_adult",
                        "info": ""
                    },
                    {
                        "name": "minecraft:as_baby",
                        "info": ""
                    },
                    {
                        "name": "minecraft:switch_to_melee",
                        "info": ""
                    },
                    {
                        "name": "minecraft:switch_to_ranged",
                        "info": ""
                    },
                    {
                        "name": "minecraft:has_target",
                        "info": ""
                    },
                    {
                        "name": "minecraft:lost_target",
                        "info": ""
                    }
                ]
            },
            {
                "name": "egg",
                "info": "鸡蛋"
            },
            {
                "name": "elder_guardian",
                "info": "远古守卫者"
            },
            {
                "name": "elder_guardian_ghost",
                "info": "远古守卫者幽灵"
            },
            {
                "name": "ender_crystal",
                "info": "末影水晶",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:crystal_explode",
                        "info": ""
                    }
                ]
            },
            {
                "name": "ender_dragon",
                "info": "末影龙",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:start_land",
                        "info": ""
                    },
                    {
                        "name": "minecraft:start_fly",
                        "info": ""
                    },
                    {
                        "name": "minecraft:start_death",
                        "info": ""
                    }
                ]
            },
            {
                "name": "enderman",
                "info": "末影人",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_angry",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_calm",
                        "info": ""
                    }
                ]
            },
            {
                "name": "endermite",
                "info": "末影螨"
            },
            {
                "name": "evocation_fang",
                "info": "唤魔者尖牙"
            },
            {
                "name": "evocation_illager",
                "info": "唤魔者",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:spawn_for_raid",
                        "info": ""
                    },
                    {
                        "name": "minecraft:start_celebrating",
                        "info": ""
                    },
                    {
                        "name": "minecraft:stop_celebrating",
                        "info": ""
                    },
                    {
                        "name": "minecraft:raid_expired",
                        "info": ""
                    }
                ]
            },
            {
                "name": "fireworks_rocket",
                "info": "烟花火箭"
            },
            {
                "name": "fox",
                "info": "狐狸",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_born",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ageable_grow_up",
                        "info": ""
                    },
                    {
                        "name": "minecraft:fox_configure_thunderstorm",
                        "info": ""
                    },
                    {
                        "name": "minecraft:fox_configure_day",
                        "info": ""
                    },
                    {
                        "name": "minecraft:fox_configure_night",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ambient_normal",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ambient_sleep",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ambient_night",
                        "info": ""
                    },
                    {
                        "name": "minecraft:fox_configure_defending",
                        "info": ""
                    },
                    {
                        "name": "minecraft:fox_configure_docile_day",
                        "info": ""
                    },
                    {
                        "name": "minecraft:fox_configure_docile_night",
                        "info": ""
                    }
                ]
            },
            {
                "name": "ghast",
                "info": "恶魂"
            },
            {
                "name": "glow_squid",
                "info": "发光鱿鱼",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    }
                ]
            },
            {
                "name": "goat",
                "info": "山羊",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_born",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ageable_grow_up",
                        "info": ""
                    },
                    {
                        "name": "attack_cooldown_complete_event",
                        "info": ""
                    },
                    {
                        "name": "minecraft:born_default",
                        "info": ""
                    },
                    {
                        "name": "minecraft:born_screamer",
                        "info": ""
                    },
                    {
                        "name": "start_event",
                        "info": ""
                    }
                ]
            },
            {
                "name": "guardian",
                "info": "守卫者",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:target_too_close",
                        "info": ""
                    },
                    {
                        "name": "minecraft:target_far_enough",
                        "info": ""
                    }
                ]
            },
            {
                "name": "hoglin",
                "info": "疣猪兽",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_born",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ageable_grow_up",
                        "info": ""
                    },
                    {
                        "name": "spawn_adult",
                        "info": ""
                    },
                    {
                        "name": "spawn_baby",
                        "info": ""
                    },
                    {
                        "name": "stop_zombification_event",
                        "info": ""
                    },
                    {
                        "name": "become_zombie_event",
                        "info": ""
                    },
                    {
                        "name": "start_zombification_event",
                        "info": ""
                    },
                    {
                        "name": "spawn_adult_unhuntable",
                        "info": ""
                    },
                    {
                        "name": "become_angry_event",
                        "info": ""
                    },
                    {
                        "name": "become_calm_event",
                        "info": ""
                    },
                    {
                        "name": "escaped_event",
                        "info": ""
                    },
                    {
                        "name": "attack_cooldown_complete_event",
                        "info": ""
                    }
                ]
            },
            {
                "name": "hopper_minecart",
                "info": "漏斗矿车",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:hopper_activate",
                        "info": ""
                    },
                    {
                        "name": "minecraft:hopper_deactivate",
                        "info": ""
                    }
                ]
            },
            {
                "name": "horse",
                "info": "马",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_born",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ageable_grow_up",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_tame",
                        "info": ""
                    },
                    {
                        "name": "minecraft:horse_saddled",
                        "info": ""
                    },
                    {
                        "name": "minecraft:horse_unsaddled",
                        "info": ""
                    },
                    {
                        "name": "minecraft:make_white",
                        "info": ""
                    },
                    {
                        "name": "minecraft:make_creamy",
                        "info": ""
                    },
                    {
                        "name": "minecraft:make_chestnut",
                        "info": ""
                    },
                    {
                        "name": "minecraft:make_brown",
                        "info": ""
                    },
                    {
                        "name": "minecraft:make_black",
                        "info": ""
                    },
                    {
                        "name": "minecraft:make_gray",
                        "info": ""
                    },
                    {
                        "name": "minecraft:make_darkbrown",
                        "info": ""
                    }
                ]
            },
            {
                "name": "husk",
                "info": "尸壳",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:start_transforming",
                        "info": ""
                    },
                    {
                        "name": "minecraft:stop_transforming",
                        "info": ""
                    },
                    {
                        "name": "minecraft:convert_to_zombie",
                        "info": ""
                    }
                ]
            },
            {
                "name": "iron_golem",
                "info": "铁傀儡",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:from_player",
                        "info": ""
                    },
                    {
                        "name": "minecraft:from_village",
                        "info": ""
                    }
                ]
            },
            {
                "name": "leash_knot",
                "info": "拴绳结"
            },
            {
                "name": "lightning_bolt",
                "info": "闪电"
            },
            {
                "name": "llama",
                "info": "羊驼",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_born",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ageable_grow_up",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_tame",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_angry",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_calm",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_chest",
                        "info": ""
                    },
                    {
                        "name": "minecraft:from_wandering_trader",
                        "info": ""
                    },
                    {
                        "name": "minecraft:join_caravan",
                        "info": ""
                    },
                    {
                        "name": "minecraft:leave_caravan",
                        "info": ""
                    },
                    {
                        "name": "minecraft:mad_at_wolf",
                        "info": ""
                    },
                    {
                        "name": "minecraft:defend_wandering_trader",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_adult",
                        "info": ""
                    },
                    {
                        "name": "minecraft:add_attributes",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_baby",
                        "info": ""
                    }
                ]
            },
            {
                "name": "magma_cube",
                "info": "岩浆怪",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_calm",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_aggressive",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecart",
                "info": "矿车"
            },
            {
                "name": "minecraft:armor_stand",
                "info": "盔甲架"
            },
            {
                "name": "minecraft:arrow",
                "info": "箭",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:axolotl",
                "info": "美西螈",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_born",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ageable_grow_up",
                        "info": ""
                    },
                    {
                        "name": "attack_cooldown_complete_event",
                        "info": ""
                    },
                    {
                        "name": "dried_out",
                        "info": ""
                    },
                    {
                        "name": "killed_enemy_event",
                        "info": ""
                    },
                    {
                        "name": "stop_drying_out",
                        "info": ""
                    },
                    {
                        "name": "start_drying_out",
                        "info": ""
                    },
                    {
                        "name": "recover_after_dried_out",
                        "info": ""
                    },
                    {
                        "name": "enter_water",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:bat",
                "info": "蝙蝠"
            },
            {
                "name": "minecraft:bee",
                "info": "蜜蜂",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_born",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ageable_grow_up",
                        "info": ""
                    },
                    {
                        "name": "minecraft:exited_disturbed_hive",
                        "info": ""
                    },
                    {
                        "name": "hive_destroyed",
                        "info": ""
                    },
                    {
                        "name": "stop_panicking_after_fire",
                        "info": ""
                    },
                    {
                        "name": "minecraft:exited_hive_on_fire",
                        "info": ""
                    },
                    {
                        "name": "minecraft:exited_hive",
                        "info": ""
                    },
                    {
                        "name": "minecraft:hive_full",
                        "info": ""
                    },
                    {
                        "name": "attacked",
                        "info": ""
                    },
                    {
                        "name": "calmed_down",
                        "info": ""
                    },
                    {
                        "name": "collected_nectar",
                        "info": ""
                    },
                    {
                        "name": "find_hive_event",
                        "info": ""
                    },
                    {
                        "name": "find_hive_timeout",
                        "info": ""
                    },
                    {
                        "name": "find_flower_timeout",
                        "info": ""
                    },
                    {
                        "name": "seek_shelter",
                        "info": ""
                    },
                    {
                        "name": "abort_sheltering",
                        "info": ""
                    },
                    {
                        "name": "countdown_to_perish_event",
                        "info": ""
                    },
                    {
                        "name": "perish_event",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:blaze",
                "info": "烈焰人",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "switch_to_melee",
                        "info": ""
                    },
                    {
                        "name": "switch_to_ranged",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_hurt_event",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:boat",
                "info": "船",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entered_bubble_column_down",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entered_bubble_column_up",
                        "info": ""
                    },
                    {
                        "name": "minecraft:exited_bubble_column",
                        "info": ""
                    },
                    {
                        "name": "minecraft:sink",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:cat",
                "info": "猫",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_from_village",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_born",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ageable_grow_up",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_midnight_cat",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_tame",
                        "info": ""
                    },
                    {
                        "name": "minecraft:pet_slept_with_owner",
                        "info": ""
                    },
                    {
                        "name": "minecraft:cat_gifted_owner",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:cave_spider",
                "info": "洞穴蜘蛛",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_hostile",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_neutral",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_angry",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_calm",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:chest_minecart",
                "info": "运输矿车"
            },
            {
                "name": "minecraft:chicken",
                "info": "鸡",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_born",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ageable_grow_up",
                        "info": ""
                    },
                    {
                        "name": "from_egg",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_adult",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:cod",
                "info": "鳕鱼"
            },
            {
                "name": "minecraft:command_block_minecart",
                "info": "命令方块矿车",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:command_block_activate",
                        "info": ""
                    },
                    {
                        "name": "minecraft:command_block_deactivate",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:cow",
                "info": "牛",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_transformed",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_born",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ageable_grow_up",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_adult",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:creeper",
                "info": "苦力怕",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:start_exploding_forced",
                        "info": ""
                    },
                    {
                        "name": "minecraft:start_exploding",
                        "info": ""
                    },
                    {
                        "name": "minecraft:stop_exploding",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_charged",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:dolphin",
                "info": "海豚",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ageable_grow_up",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_angry",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_calm",
                        "info": ""
                    },
                    {
                        "name": "minecraft:stop_dryingout",
                        "info": ""
                    },
                    {
                        "name": "minecraft:start_dryingout",
                        "info": ""
                    },
                    {
                        "name": "minecraft:dried_out",
                        "info": ""
                    },
                    {
                        "name": "minecraft:navigation_on_land",
                        "info": ""
                    },
                    {
                        "name": "minecraft:navigation_off_land",
                        "info": ""
                    },
                    {
                        "name": "ageable_grow_up",
                        "info": ""
                    },
                    {
                        "name": "become_angry",
                        "info": ""
                    },
                    {
                        "name": "on_calm",
                        "info": ""
                    },
                    {
                        "name": "stop_dryingout",
                        "info": ""
                    },
                    {
                        "name": "start_dryingout",
                        "info": ""
                    },
                    {
                        "name": "dried_out",
                        "info": ""
                    },
                    {
                        "name": "navigation_on_land",
                        "info": ""
                    },
                    {
                        "name": "navigation_off_land",
                        "info": ""
                    },
                    {
                        "name": "recover_after_dried_out",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:donkey",
                "info": "驴",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_born",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ageable_grow_up",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_tame",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_chest",
                        "info": ""
                    },
                    {
                        "name": "minecraft:donkey_saddled",
                        "info": ""
                    },
                    {
                        "name": "minecraft:donkey_unsaddled",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:drowned",
                "info": "溺尸",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:as_adult",
                        "info": ""
                    },
                    {
                        "name": "minecraft:as_baby",
                        "info": ""
                    },
                    {
                        "name": "minecraft:switch_to_melee",
                        "info": ""
                    },
                    {
                        "name": "minecraft:switch_to_ranged",
                        "info": ""
                    },
                    {
                        "name": "minecraft:has_target",
                        "info": ""
                    },
                    {
                        "name": "minecraft:lost_target",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:egg",
                "info": "鸡蛋"
            },
            {
                "name": "minecraft:elder_guardian",
                "info": "远古守卫者"
            },
            {
                "name": "minecraft:elder_guardian_ghost",
                "info": "远古守卫者幽灵"
            },
            {
                "name": "minecraft:ender_crystal",
                "info": "末影水晶",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:crystal_explode",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:ender_dragon",
                "info": "末影龙",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:start_land",
                        "info": ""
                    },
                    {
                        "name": "minecraft:start_fly",
                        "info": ""
                    },
                    {
                        "name": "minecraft:start_death",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:enderman",
                "info": "末影人",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_angry",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_calm",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:endermite",
                "info": "末影螨"
            },
            {
                "name": "minecraft:evocation_fang",
                "info": "唤魔者尖牙"
            },
            {
                "name": "minecraft:evocation_illager",
                "info": "唤魔者",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:spawn_for_raid",
                        "info": ""
                    },
                    {
                        "name": "minecraft:start_celebrating",
                        "info": ""
                    },
                    {
                        "name": "minecraft:stop_celebrating",
                        "info": ""
                    },
                    {
                        "name": "minecraft:raid_expired",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:fireworks_rocket",
                "info": "烟花火箭"
            },
            {
                "name": "minecraft:fox",
                "info": "狐狸",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_born",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ageable_grow_up",
                        "info": ""
                    },
                    {
                        "name": "minecraft:fox_configure_thunderstorm",
                        "info": ""
                    },
                    {
                        "name": "minecraft:fox_configure_day",
                        "info": ""
                    },
                    {
                        "name": "minecraft:fox_configure_night",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ambient_normal",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ambient_sleep",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ambient_night",
                        "info": ""
                    },
                    {
                        "name": "minecraft:fox_configure_defending",
                        "info": ""
                    },
                    {
                        "name": "minecraft:fox_configure_docile_day",
                        "info": ""
                    },
                    {
                        "name": "minecraft:fox_configure_docile_night",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:ghast",
                "info": "恶魂"
            },
            {
                "name": "minecraft:glow_squid",
                "info": "发光鱿鱼",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:goat",
                "info": "山羊",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_born",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ageable_grow_up",
                        "info": ""
                    },
                    {
                        "name": "attack_cooldown_complete_event",
                        "info": ""
                    },
                    {
                        "name": "minecraft:born_default",
                        "info": ""
                    },
                    {
                        "name": "minecraft:born_screamer",
                        "info": ""
                    },
                    {
                        "name": "start_event",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:guardian",
                "info": "守卫者",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:target_too_close",
                        "info": ""
                    },
                    {
                        "name": "minecraft:target_far_enough",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:hoglin",
                "info": "疣猪兽",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_born",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ageable_grow_up",
                        "info": ""
                    },
                    {
                        "name": "spawn_adult",
                        "info": ""
                    },
                    {
                        "name": "spawn_baby",
                        "info": ""
                    },
                    {
                        "name": "stop_zombification_event",
                        "info": ""
                    },
                    {
                        "name": "become_zombie_event",
                        "info": ""
                    },
                    {
                        "name": "start_zombification_event",
                        "info": ""
                    },
                    {
                        "name": "spawn_adult_unhuntable",
                        "info": ""
                    },
                    {
                        "name": "become_angry_event",
                        "info": ""
                    },
                    {
                        "name": "become_calm_event",
                        "info": ""
                    },
                    {
                        "name": "escaped_event",
                        "info": ""
                    },
                    {
                        "name": "attack_cooldown_complete_event",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:hopper_minecart",
                "info": "漏斗矿车",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:hopper_activate",
                        "info": ""
                    },
                    {
                        "name": "minecraft:hopper_deactivate",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:horse",
                "info": "马",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_born",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ageable_grow_up",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_tame",
                        "info": ""
                    },
                    {
                        "name": "minecraft:horse_saddled",
                        "info": ""
                    },
                    {
                        "name": "minecraft:horse_unsaddled",
                        "info": ""
                    },
                    {
                        "name": "minecraft:make_white",
                        "info": ""
                    },
                    {
                        "name": "minecraft:make_creamy",
                        "info": ""
                    },
                    {
                        "name": "minecraft:make_chestnut",
                        "info": ""
                    },
                    {
                        "name": "minecraft:make_brown",
                        "info": ""
                    },
                    {
                        "name": "minecraft:make_black",
                        "info": ""
                    },
                    {
                        "name": "minecraft:make_gray",
                        "info": ""
                    },
                    {
                        "name": "minecraft:make_darkbrown",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:husk",
                "info": "尸壳",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:start_transforming",
                        "info": ""
                    },
                    {
                        "name": "minecraft:stop_transforming",
                        "info": ""
                    },
                    {
                        "name": "minecraft:convert_to_zombie",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:iron_golem",
                "info": "铁傀儡",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:from_player",
                        "info": ""
                    },
                    {
                        "name": "minecraft:from_village",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:leash_knot",
                "info": "拴绳结"
            },
            {
                "name": "minecraft:lightning_bolt",
                "info": "闪电"
            },
            {
                "name": "minecraft:llama",
                "info": "羊驼",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_born",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ageable_grow_up",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_tame",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_angry",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_calm",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_chest",
                        "info": ""
                    },
                    {
                        "name": "minecraft:from_wandering_trader",
                        "info": ""
                    },
                    {
                        "name": "minecraft:join_caravan",
                        "info": ""
                    },
                    {
                        "name": "minecraft:leave_caravan",
                        "info": ""
                    },
                    {
                        "name": "minecraft:mad_at_wolf",
                        "info": ""
                    },
                    {
                        "name": "minecraft:defend_wandering_trader",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_adult",
                        "info": ""
                    },
                    {
                        "name": "minecraft:add_attributes",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_baby",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:magma_cube",
                "info": "岩浆怪",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_calm",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_aggressive",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:minecart",
                "info": "矿车"
            },
            {
                "name": "minecraft:mooshroom",
                "info": "哞菇",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_born",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ageable_grow_up",
                        "info": ""
                    },
                    {
                        "name": "become_cow",
                        "info": ""
                    },
                    {
                        "name": "minecraft:flowerless",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ate_allium",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ate_cornflower",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ate_lily",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ate_rose",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ate_orchid",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ate_daisy",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ate_tulip",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ate_bluet",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ate_poppy",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ate_dandelion",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_red",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_brown",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_brown_adult",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_red_adult",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:mule",
                "info": "骡",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_born",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ageable_grow_up",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_tame",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_chest",
                        "info": ""
                    },
                    {
                        "name": "minecraft:mule_saddled",
                        "info": ""
                    },
                    {
                        "name": "minecraft:mule_unsaddled",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:npc",
                "info": "NPC"
            },
            {
                "name": "minecraft:ocelot",
                "info": "豹猫",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_born",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ageable_grow_up",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_born_wild",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_trust",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_leash",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_unleash",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:panda",
                "info": "熊猫",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_born",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ageable_grow_up",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_angry",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_calm",
                        "info": ""
                    },
                    {
                        "name": "minecraft:panda_lazy",
                        "info": ""
                    },
                    {
                        "name": "minecraft:panda_worried",
                        "info": ""
                    },
                    {
                        "name": "minecraft:panda_playful",
                        "info": ""
                    },
                    {
                        "name": "minecraft:panda_brown",
                        "info": ""
                    },
                    {
                        "name": "minecraft:panda_weak",
                        "info": ""
                    },
                    {
                        "name": "minecraft:panda_aggressive",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_scared",
                        "info": ""
                    },
                    {
                        "name": "minecraft:baby_on_calm",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:parrot",
                "info": "鹦鹉",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_tame",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:phantom",
                "info": "幻翼"
            },
            {
                "name": "minecraft:pig",
                "info": "猪",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "become_zombie",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_born",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ageable_grow_up",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_saddled",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_adult",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:piglin",
                "info": "猪灵",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_born",
                        "info": ""
                    },
                    {
                        "name": "spawn_adult",
                        "info": ""
                    },
                    {
                        "name": "spawn_baby",
                        "info": ""
                    },
                    {
                        "name": "stop_zombification_event",
                        "info": ""
                    },
                    {
                        "name": "become_zombie_event",
                        "info": ""
                    },
                    {
                        "name": "start_zombification_event",
                        "info": ""
                    },
                    {
                        "name": "become_angry_event",
                        "info": ""
                    },
                    {
                        "name": "become_calm_event",
                        "info": ""
                    },
                    {
                        "name": "attack_cooldown_complete_event",
                        "info": ""
                    },
                    {
                        "name": "spawn_adult_no_hunting",
                        "info": ""
                    },
                    {
                        "name": "spawn_adult_ranged",
                        "info": ""
                    },
                    {
                        "name": "spawn_adult_ranged_no_hunting",
                        "info": ""
                    },
                    {
                        "name": "spawn_adult_melee",
                        "info": ""
                    },
                    {
                        "name": "spawn_adult_melee_no_hunting",
                        "info": ""
                    },
                    {
                        "name": "important_block_destroyed_event",
                        "info": ""
                    },
                    {
                        "name": "admire_item_started_event",
                        "info": ""
                    },
                    {
                        "name": "admire_item_stopped_event",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:piglin_brute",
                "info": "猪灵蛮兵",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "stop_zombification_event",
                        "info": ""
                    },
                    {
                        "name": "become_zombie_event",
                        "info": ""
                    },
                    {
                        "name": "start_zombification_event",
                        "info": ""
                    },
                    {
                        "name": "become_angry_event",
                        "info": ""
                    },
                    {
                        "name": "become_calm_event",
                        "info": ""
                    },
                    {
                        "name": "important_block_destroyed_event",
                        "info": ""
                    },
                    {
                        "name": "go_back_to_spawn_failed",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:pillager",
                "info": "掠夺者",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_for_raid",
                        "info": ""
                    },
                    {
                        "name": "minecraft:start_celebrating",
                        "info": ""
                    },
                    {
                        "name": "minecraft:stop_celebrating",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_as_patrol_follower",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_as_illager_captain",
                        "info": ""
                    },
                    {
                        "name": "minecraft:promote_to_illager_captain",
                        "info": ""
                    },
                    {
                        "name": "minecraft:promote_to_patrol_captain",
                        "info": ""
                    },
                    {
                        "name": "minecraft:melee_mode",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ranged_mode",
                        "info": ""
                    },
                    {
                        "name": "minecraft:calm",
                        "info": ""
                    },
                    {
                        "name": "minecraft:raid_expired",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:polar_bear",
                "info": "北极熊",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_born",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ageable_grow_up",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_calm",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_scared",
                        "info": ""
                    },
                    {
                        "name": "minecraft:baby_on_calm",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_anger",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:pufferfish",
                "info": "河豚",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:to_full_puff",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_full_puff",
                        "info": ""
                    },
                    {
                        "name": "minecraft:from_full_puff",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_deflate",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_normal_puff",
                        "info": ""
                    },
                    {
                        "name": "minecraft:start_half_puff",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_half_puff",
                        "info": ""
                    },
                    {
                        "name": "minecraft:start_full_puff",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:rabbit",
                "info": "兔子",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_born",
                        "info": ""
                    },
                    {
                        "name": "in_desert",
                        "info": ""
                    },
                    {
                        "name": "in_snow",
                        "info": ""
                    },
                    {
                        "name": "grow_up",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:ravager",
                "info": "劫掠兽",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_for_raid",
                        "info": ""
                    },
                    {
                        "name": "minecraft:start_celebrating",
                        "info": ""
                    },
                    {
                        "name": "minecraft:stop_celebrating",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_for_raid_with_evoker_rider",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_for_raid_with_pillager_rider",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_with_pillager_rider",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_with_pillager_captain_rider",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_with_vindicator_rider",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_with_vindicator_captain_rider",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_stunned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:start_roar",
                        "info": ""
                    },
                    {
                        "name": "minecraft:end_roar",
                        "info": ""
                    },
                    {
                        "name": "minecraft:raid_expired",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:salmon",
                "info": "鲑鱼",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:sheep",
                "info": "绵羊",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_born",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ageable_grow_up",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_sheared",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_eat_block",
                        "info": ""
                    },
                    {
                        "name": "wololo",
                        "info": ""
                    },
                    {
                        "name": "spawn_adult",
                        "info": ""
                    },
                    {
                        "name": "spawn_baby",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:shulker",
                "info": "潜影贝",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:turn_purple",
                        "info": ""
                    },
                    {
                        "name": "minecraft:turn_black",
                        "info": ""
                    },
                    {
                        "name": "minecraft:turn_blue",
                        "info": ""
                    },
                    {
                        "name": "minecraft:turn_brown",
                        "info": ""
                    },
                    {
                        "name": "minecraft:turn_cyan",
                        "info": ""
                    },
                    {
                        "name": "minecraft:turn_gray",
                        "info": ""
                    },
                    {
                        "name": "minecraft:turn_green",
                        "info": ""
                    },
                    {
                        "name": "minecraft:turn_light_blue",
                        "info": ""
                    },
                    {
                        "name": "minecraft:turn_lime",
                        "info": ""
                    },
                    {
                        "name": "minecraft:turn_magenta",
                        "info": ""
                    },
                    {
                        "name": "minecraft:turn_orange",
                        "info": ""
                    },
                    {
                        "name": "minecraft:turn_pink",
                        "info": ""
                    },
                    {
                        "name": "minecraft:turn_red",
                        "info": ""
                    },
                    {
                        "name": "minecraft:turn_silver",
                        "info": ""
                    },
                    {
                        "name": "minecraft:turn_white",
                        "info": ""
                    },
                    {
                        "name": "minecraft:turn_yellow",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:silverfish",
                "info": "蠹虫",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_angry",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_calm",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:skeleton",
                "info": "骷髅",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:melee_mode",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ranged_mode",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spring_trap",
                        "info": ""
                    },
                    {
                        "name": "become_stray_event",
                        "info": ""
                    },
                    {
                        "name": "got_in_powder_snow",
                        "info": ""
                    },
                    {
                        "name": "got_out_of_powder_snow",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:skeleton_horse",
                "info": "骷髅马",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spring_trap",
                        "info": ""
                    },
                    {
                        "name": "minecraft:set_trap",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:slime",
                "info": "史莱姆",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_calm",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_aggressive",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:snow_golem",
                "info": "雪傀儡",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:on_sheared",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:snowball",
                "info": "雪球"
            },
            {
                "name": "minecraft:spider",
                "info": "蜘蛛",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_hostile",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_neutral",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_angry",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_calm",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:splash_potion",
                "info": "喷溅药水"
            },
            {
                "name": "minecraft:squid",
                "info": "鱿鱼",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:stray",
                "info": "流浪者",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:melee_mode",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ranged_mode",
                        "info": ""
                    },
                    {
                        "name": "change_to_skeleton",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:strider",
                "info": "炽足兽",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_born",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ageable_grow_up",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_saddled",
                        "info": ""
                    },
                    {
                        "name": "spawn_adult",
                        "info": ""
                    },
                    {
                        "name": "spawn_baby",
                        "info": ""
                    },
                    {
                        "name": "spawn_adult_parent_jockey",
                        "info": ""
                    },
                    {
                        "name": "spawn_adult_piglin_jockey",
                        "info": ""
                    },
                    {
                        "name": "spawn_zombified_piglin_rider",
                        "info": ""
                    },
                    {
                        "name": "start_suffocating",
                        "info": ""
                    },
                    {
                        "name": "stop_suffocating",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:tnt",
                "info": "TNT",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "from_explosion",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:tnt_minecart",
                "info": "TNT矿车",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_prime",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_instant_prime",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:tropicalfish",
                "info": "热带鱼",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_anenonme",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_black_tang",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_blue_dory",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_butterfly_fish",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_cichlid",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_clownfish",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_cc_betta",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_dog_fish",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_e_red_snapper",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_goat_fish",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_moorish_idol",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_ornate_butterfly",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_parrot_fish",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_queen_angel_fish",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_red_cichlid",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_red_lipped_benny",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_red_snapper",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_threadfin",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_tomato_clown",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_triggerfish",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_yellow_tang",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_yellow_tail_parrot",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:turtle",
                "info": "海龟",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_born",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ageable_grow_up",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_pregnant",
                        "info": ""
                    },
                    {
                        "name": "minecraft:go_lay_egg",
                        "info": ""
                    },
                    {
                        "name": "minecraft:laid_egg",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:vex",
                "info": "恼鬼"
            },
            {
                "name": "minecraft:villager",
                "info": "村民",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "become_witch",
                        "info": ""
                    },
                    {
                        "name": "become_zombie",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_transformed",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_born",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_farmer",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_librarian",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_cleric",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_armorer",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_butcher",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ageable_grow_up",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_cleric",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:vindicator",
                "info": "卫道士",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_for_raid",
                        "info": ""
                    },
                    {
                        "name": "minecraft:start_celebrating",
                        "info": ""
                    },
                    {
                        "name": "minecraft:stop_celebrating",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_as_patrol_follower",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_as_illager_captain",
                        "info": ""
                    },
                    {
                        "name": "minecraft:promote_to_illager_captain",
                        "info": ""
                    },
                    {
                        "name": "minecraft:promote_to_patrol_captain",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_aggro",
                        "info": ""
                    },
                    {
                        "name": "minecraft:stop_aggro",
                        "info": ""
                    },
                    {
                        "name": "minecraft:start_johnny",
                        "info": ""
                    },
                    {
                        "name": "minecraft:stop_johnny",
                        "info": ""
                    },
                    {
                        "name": "minecraft:raid_expired",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:wandering_trader",
                "info": "流浪商人",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:become_calm",
                        "info": ""
                    },
                    {
                        "name": "minecraft:scheduled",
                        "info": ""
                    },
                    {
                        "name": "minecraft:start_despawn",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_scared",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:witch",
                "info": "女巫",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:spawn_for_raid",
                        "info": ""
                    },
                    {
                        "name": "minecraft:start_celebrating",
                        "info": ""
                    },
                    {
                        "name": "minecraft:stop_celebrating",
                        "info": ""
                    },
                    {
                        "name": "minecraft:raid_expired",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:wither",
                "info": "凋灵",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:wither_skeleton",
                "info": "凋灵骷髅",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:wolf",
                "info": "狼",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_born",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ageable_grow_up",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_tame",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_angry",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_calm",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ageable_set_baby",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:xp_bottle",
                "info": "附魔之瓶"
            },
            {
                "name": "minecraft:xp_orb",
                "info": "经验球"
            },
            {
                "name": "minecraft:zoglin",
                "info": "僵尸疣猪兽",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_transformed",
                        "info": ""
                    },
                    {
                        "name": "minecraft:as_adult",
                        "info": ""
                    },
                    {
                        "name": "minecraft:as_baby",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:zombie",
                "info": "僵尸",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:as_adult",
                        "info": ""
                    },
                    {
                        "name": "minecraft:as_baby",
                        "info": ""
                    },
                    {
                        "name": "minecraft:start_transforming",
                        "info": ""
                    },
                    {
                        "name": "minecraft:stop_transforming",
                        "info": ""
                    },
                    {
                        "name": "minecraft:convert_to_drowned",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:zombie_horse",
                "info": "僵尸马",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ageable_grow_up",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:zombie_pigman",
                "info": "僵尸猪灵",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_transformed",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_angry",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_calm",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_as_strider_jockey",
                        "info": ""
                    }
                ]
            },
            {
                "name": "minecraft:zombie_villager",
                "info": "僵尸村民",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_transformed",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_cleric",
                        "info": ""
                    },
                    {
                        "name": "villager_converted",
                        "info": ""
                    },
                    {
                        "name": "from_village",
                        "info": ""
                    }
                ]
            },
            {
                "name": "mooshroom",
                "info": "哞菇",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_born",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ageable_grow_up",
                        "info": ""
                    },
                    {
                        "name": "become_cow",
                        "info": ""
                    },
                    {
                        "name": "minecraft:flowerless",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ate_allium",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ate_cornflower",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ate_lily",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ate_rose",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ate_orchid",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ate_daisy",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ate_tulip",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ate_bluet",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ate_poppy",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ate_dandelion",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_red",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_brown",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_brown_adult",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_red_adult",
                        "info": ""
                    }
                ]
            },
            {
                "name": "mule",
                "info": "骡",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_born",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ageable_grow_up",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_tame",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_chest",
                        "info": ""
                    },
                    {
                        "name": "minecraft:mule_saddled",
                        "info": ""
                    },
                    {
                        "name": "minecraft:mule_unsaddled",
                        "info": ""
                    }
                ]
            },
            {
                "name": "npc",
                "info": "NPC"
            },
            {
                "name": "ocelot",
                "info": "豹猫",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_born",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ageable_grow_up",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_born_wild",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_trust",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_leash",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_unleash",
                        "info": ""
                    }
                ]
            },
            {
                "name": "panda",
                "info": "熊猫",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_born",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ageable_grow_up",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_angry",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_calm",
                        "info": ""
                    },
                    {
                        "name": "minecraft:panda_lazy",
                        "info": ""
                    },
                    {
                        "name": "minecraft:panda_worried",
                        "info": ""
                    },
                    {
                        "name": "minecraft:panda_playful",
                        "info": ""
                    },
                    {
                        "name": "minecraft:panda_brown",
                        "info": ""
                    },
                    {
                        "name": "minecraft:panda_weak",
                        "info": ""
                    },
                    {
                        "name": "minecraft:panda_aggressive",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_scared",
                        "info": ""
                    },
                    {
                        "name": "minecraft:baby_on_calm",
                        "info": ""
                    }
                ]
            },
            {
                "name": "parrot",
                "info": "鹦鹉",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_tame",
                        "info": ""
                    }
                ]
            },
            {
                "name": "phantom",
                "info": "幻翼"
            },
            {
                "name": "pig",
                "info": "猪",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "become_zombie",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_born",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ageable_grow_up",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_saddled",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_adult",
                        "info": ""
                    }
                ]
            },
            {
                "name": "piglin",
                "info": "猪灵",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_born",
                        "info": ""
                    },
                    {
                        "name": "spawn_adult",
                        "info": ""
                    },
                    {
                        "name": "spawn_baby",
                        "info": ""
                    },
                    {
                        "name": "stop_zombification_event",
                        "info": ""
                    },
                    {
                        "name": "become_zombie_event",
                        "info": ""
                    },
                    {
                        "name": "start_zombification_event",
                        "info": ""
                    },
                    {
                        "name": "become_angry_event",
                        "info": ""
                    },
                    {
                        "name": "become_calm_event",
                        "info": ""
                    },
                    {
                        "name": "attack_cooldown_complete_event",
                        "info": ""
                    },
                    {
                        "name": "spawn_adult_no_hunting",
                        "info": ""
                    },
                    {
                        "name": "spawn_adult_ranged",
                        "info": ""
                    },
                    {
                        "name": "spawn_adult_ranged_no_hunting",
                        "info": ""
                    },
                    {
                        "name": "spawn_adult_melee",
                        "info": ""
                    },
                    {
                        "name": "spawn_adult_melee_no_hunting",
                        "info": ""
                    },
                    {
                        "name": "important_block_destroyed_event",
                        "info": ""
                    },
                    {
                        "name": "admire_item_started_event",
                        "info": ""
                    },
                    {
                        "name": "admire_item_stopped_event",
                        "info": ""
                    }
                ]
            },
            {
                "name": "piglin_brute",
                "info": "猪灵蛮兵",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "stop_zombification_event",
                        "info": ""
                    },
                    {
                        "name": "become_zombie_event",
                        "info": ""
                    },
                    {
                        "name": "start_zombification_event",
                        "info": ""
                    },
                    {
                        "name": "become_angry_event",
                        "info": ""
                    },
                    {
                        "name": "become_calm_event",
                        "info": ""
                    },
                    {
                        "name": "important_block_destroyed_event",
                        "info": ""
                    },
                    {
                        "name": "go_back_to_spawn_failed",
                        "info": ""
                    }
                ]
            },
            {
                "name": "pillager",
                "info": "掠夺者",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_for_raid",
                        "info": ""
                    },
                    {
                        "name": "minecraft:start_celebrating",
                        "info": ""
                    },
                    {
                        "name": "minecraft:stop_celebrating",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_as_patrol_follower",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_as_illager_captain",
                        "info": ""
                    },
                    {
                        "name": "minecraft:promote_to_illager_captain",
                        "info": ""
                    },
                    {
                        "name": "minecraft:promote_to_patrol_captain",
                        "info": ""
                    },
                    {
                        "name": "minecraft:melee_mode",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ranged_mode",
                        "info": ""
                    },
                    {
                        "name": "minecraft:calm",
                        "info": ""
                    },
                    {
                        "name": "minecraft:raid_expired",
                        "info": ""
                    }
                ]
            },
            {
                "name": "polar_bear",
                "info": "北极熊",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_born",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ageable_grow_up",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_calm",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_scared",
                        "info": ""
                    },
                    {
                        "name": "minecraft:baby_on_calm",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_anger",
                        "info": ""
                    }
                ]
            },
            {
                "name": "pufferfish",
                "info": "河豚",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:to_full_puff",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_full_puff",
                        "info": ""
                    },
                    {
                        "name": "minecraft:from_full_puff",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_deflate",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_normal_puff",
                        "info": ""
                    },
                    {
                        "name": "minecraft:start_half_puff",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_half_puff",
                        "info": ""
                    },
                    {
                        "name": "minecraft:start_full_puff",
                        "info": ""
                    }
                ]
            },
            {
                "name": "rabbit",
                "info": "兔子",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_born",
                        "info": ""
                    },
                    {
                        "name": "in_desert",
                        "info": ""
                    },
                    {
                        "name": "in_snow",
                        "info": ""
                    },
                    {
                        "name": "grow_up",
                        "info": ""
                    }
                ]
            },
            {
                "name": "ravager",
                "info": "劫掠兽",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_for_raid",
                        "info": ""
                    },
                    {
                        "name": "minecraft:start_celebrating",
                        "info": ""
                    },
                    {
                        "name": "minecraft:stop_celebrating",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_for_raid_with_evoker_rider",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_for_raid_with_pillager_rider",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_with_pillager_rider",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_with_pillager_captain_rider",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_with_vindicator_rider",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_with_vindicator_captain_rider",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_stunned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:start_roar",
                        "info": ""
                    },
                    {
                        "name": "minecraft:end_roar",
                        "info": ""
                    },
                    {
                        "name": "minecraft:raid_expired",
                        "info": ""
                    }
                ]
            },
            {
                "name": "salmon",
                "info": "鲑鱼",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    }
                ]
            },
            {
                "name": "sheep",
                "info": "绵羊",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_born",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ageable_grow_up",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_sheared",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_eat_block",
                        "info": ""
                    },
                    {
                        "name": "wololo",
                        "info": ""
                    },
                    {
                        "name": "spawn_adult",
                        "info": ""
                    },
                    {
                        "name": "spawn_baby",
                        "info": ""
                    }
                ]
            },
            {
                "name": "shulker",
                "info": "潜影贝",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:turn_purple",
                        "info": ""
                    },
                    {
                        "name": "minecraft:turn_black",
                        "info": ""
                    },
                    {
                        "name": "minecraft:turn_blue",
                        "info": ""
                    },
                    {
                        "name": "minecraft:turn_brown",
                        "info": ""
                    },
                    {
                        "name": "minecraft:turn_cyan",
                        "info": ""
                    },
                    {
                        "name": "minecraft:turn_gray",
                        "info": ""
                    },
                    {
                        "name": "minecraft:turn_green",
                        "info": ""
                    },
                    {
                        "name": "minecraft:turn_light_blue",
                        "info": ""
                    },
                    {
                        "name": "minecraft:turn_lime",
                        "info": ""
                    },
                    {
                        "name": "minecraft:turn_magenta",
                        "info": ""
                    },
                    {
                        "name": "minecraft:turn_orange",
                        "info": ""
                    },
                    {
                        "name": "minecraft:turn_pink",
                        "info": ""
                    },
                    {
                        "name": "minecraft:turn_red",
                        "info": ""
                    },
                    {
                        "name": "minecraft:turn_silver",
                        "info": ""
                    },
                    {
                        "name": "minecraft:turn_white",
                        "info": ""
                    },
                    {
                        "name": "minecraft:turn_yellow",
                        "info": ""
                    }
                ]
            },
            {
                "name": "silverfish",
                "info": "蠹虫",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_angry",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_calm",
                        "info": ""
                    }
                ]
            },
            {
                "name": "skeleton",
                "info": "骷髅",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:melee_mode",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ranged_mode",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spring_trap",
                        "info": ""
                    },
                    {
                        "name": "become_stray_event",
                        "info": ""
                    },
                    {
                        "name": "got_in_powder_snow",
                        "info": ""
                    },
                    {
                        "name": "got_out_of_powder_snow",
                        "info": ""
                    }
                ]
            },
            {
                "name": "skeleton_horse",
                "info": "骷髅马",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spring_trap",
                        "info": ""
                    },
                    {
                        "name": "minecraft:set_trap",
                        "info": ""
                    }
                ]
            },
            {
                "name": "slime",
                "info": "史莱姆",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_calm",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_aggressive",
                        "info": ""
                    }
                ]
            },
            {
                "name": "snow_golem",
                "info": "雪傀儡",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:on_sheared",
                        "info": ""
                    }
                ]
            },
            {
                "name": "snowball",
                "info": "雪球"
            },
            {
                "name": "spider",
                "info": "蜘蛛",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_hostile",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_neutral",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_angry",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_calm",
                        "info": ""
                    }
                ]
            },
            {
                "name": "splash_potion",
                "info": "喷溅药水"
            },
            {
                "name": "squid",
                "info": "鱿鱼",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    }
                ]
            },
            {
                "name": "stray",
                "info": "流浪者",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:melee_mode",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ranged_mode",
                        "info": ""
                    },
                    {
                        "name": "change_to_skeleton",
                        "info": ""
                    }
                ]
            },
            {
                "name": "strider",
                "info": "炽足兽",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_born",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ageable_grow_up",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_saddled",
                        "info": ""
                    },
                    {
                        "name": "spawn_adult",
                        "info": ""
                    },
                    {
                        "name": "spawn_baby",
                        "info": ""
                    },
                    {
                        "name": "spawn_adult_parent_jockey",
                        "info": ""
                    },
                    {
                        "name": "spawn_adult_piglin_jockey",
                        "info": ""
                    },
                    {
                        "name": "spawn_zombified_piglin_rider",
                        "info": ""
                    },
                    {
                        "name": "start_suffocating",
                        "info": ""
                    },
                    {
                        "name": "stop_suffocating",
                        "info": ""
                    }
                ]
            },
            {
                "name": "tnt",
                "info": "TNT",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "from_explosion",
                        "info": ""
                    }
                ]
            },
            {
                "name": "tnt_minecart",
                "info": "TNT矿车",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_prime",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_instant_prime",
                        "info": ""
                    }
                ]
            },
            {
                "name": "tropicalfish",
                "info": "热带鱼",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_anenonme",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_black_tang",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_blue_dory",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_butterfly_fish",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_cichlid",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_clownfish",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_cc_betta",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_dog_fish",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_e_red_snapper",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_goat_fish",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_moorish_idol",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_ornate_butterfly",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_parrot_fish",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_queen_angel_fish",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_red_cichlid",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_red_lipped_benny",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_red_snapper",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_threadfin",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_tomato_clown",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_triggerfish",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_yellow_tang",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_yellow_tail_parrot",
                        "info": ""
                    }
                ]
            },
            {
                "name": "turtle",
                "info": "海龟",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_born",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ageable_grow_up",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_pregnant",
                        "info": ""
                    },
                    {
                        "name": "minecraft:go_lay_egg",
                        "info": ""
                    },
                    {
                        "name": "minecraft:laid_egg",
                        "info": ""
                    }
                ]
            },
            {
                "name": "vex",
                "info": "恼鬼"
            },
            {
                "name": "villager",
                "info": "村民",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "become_witch",
                        "info": ""
                    },
                    {
                        "name": "become_zombie",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_transformed",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_born",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_farmer",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_librarian",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_cleric",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_armorer",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_butcher",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ageable_grow_up",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_cleric",
                        "info": ""
                    }
                ]
            },
            {
                "name": "vindicator",
                "info": "卫道士",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_for_raid",
                        "info": ""
                    },
                    {
                        "name": "minecraft:start_celebrating",
                        "info": ""
                    },
                    {
                        "name": "minecraft:stop_celebrating",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_as_patrol_follower",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_as_illager_captain",
                        "info": ""
                    },
                    {
                        "name": "minecraft:promote_to_illager_captain",
                        "info": ""
                    },
                    {
                        "name": "minecraft:promote_to_patrol_captain",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_aggro",
                        "info": ""
                    },
                    {
                        "name": "minecraft:stop_aggro",
                        "info": ""
                    },
                    {
                        "name": "minecraft:start_johnny",
                        "info": ""
                    },
                    {
                        "name": "minecraft:stop_johnny",
                        "info": ""
                    },
                    {
                        "name": "minecraft:raid_expired",
                        "info": ""
                    }
                ]
            },
            {
                "name": "wandering_trader",
                "info": "流浪商人",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:become_calm",
                        "info": ""
                    },
                    {
                        "name": "minecraft:scheduled",
                        "info": ""
                    },
                    {
                        "name": "minecraft:start_despawn",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_scared",
                        "info": ""
                    }
                ]
            },
            {
                "name": "witch",
                "info": "女巫",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:spawn_for_raid",
                        "info": ""
                    },
                    {
                        "name": "minecraft:start_celebrating",
                        "info": ""
                    },
                    {
                        "name": "minecraft:stop_celebrating",
                        "info": ""
                    },
                    {
                        "name": "minecraft:raid_expired",
                        "info": ""
                    }
                ]
            },
            {
                "name": "wither",
                "info": "凋灵",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    }
                ]
            },
            {
                "name": "wither_skeleton",
                "info": "凋灵骷髅",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    }
                ]
            },
            {
                "name": "wolf",
                "info": "狼",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_born",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ageable_grow_up",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_tame",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_angry",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_calm",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ageable_set_baby",
                        "info": ""
                    }
                ]
            },
            {
                "name": "xp_bottle",
                "info": "附魔之瓶"
            },
            {
                "name": "xp_orb",
                "info": "经验球"
            },
            {
                "name": "zoglin",
                "info": "僵尸疣猪兽",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_transformed",
                        "info": ""
                    },
                    {
                        "name": "minecraft:as_adult",
                        "info": ""
                    },
                    {
                        "name": "minecraft:as_baby",
                        "info": ""
                    }
                ]
            },
            {
                "name": "zombie",
                "info": "僵尸",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:as_adult",
                        "info": ""
                    },
                    {
                        "name": "minecraft:as_baby",
                        "info": ""
                    },
                    {
                        "name": "minecraft:start_transforming",
                        "info": ""
                    },
                    {
                        "name": "minecraft:stop_transforming",
                        "info": ""
                    },
                    {
                        "name": "minecraft:convert_to_drowned",
                        "info": ""
                    }
                ]
            },
            {
                "name": "zombie_horse",
                "info": "僵尸马",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:ageable_grow_up",
                        "info": ""
                    }
                ]
            },
            {
                "name": "zombie_pigman",
                "info": "僵尸猪灵",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_transformed",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_angry",
                        "info": ""
                    },
                    {
                        "name": "minecraft:on_calm",
                        "info": ""
                    },
                    {
                        "name": "minecraft:spawn_as_strider_jockey",
                        "info": ""
                    }
                ]
            },
            {
                "name": "zombie_villager",
                "info": "僵尸村民",
                "event": [
                    {
                        "template": {
                            "input": {
                                "text": "{name} "
                            }
                        }
                    },
                    {
                        "name": "minecraft:entity_spawned",
                        "info": ""
                    },
                    {
                        "name": "minecraft:entity_transformed",
                        "info": ""
                    },
                    {
                        "name": "minecraft:become_cleric",
                        "info": ""
                    },
                    {
                        "name": "villager_converted",
                        "info": ""
                    },
                    {
                        "name": "from_village",
                        "info": ""
                    }
                ]
            }
        ]
    },
    {
        "name": "area_effect_cloud",
        "info": "区域效果云"
    },
    {
        "name": "armor_stand",
        "info": "盔甲架"
    },
    {
        "name": "arrow",
        "info": "箭",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            }
        ]
    },
    {
        "name": "axolotl",
        "info": "美西螈",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_born",
                "info": ""
            },
            {
                "name": "minecraft:ageable_grow_up",
                "info": ""
            },
            {
                "name": "attack_cooldown_complete_event",
                "info": ""
            },
            {
                "name": "dried_out",
                "info": ""
            },
            {
                "name": "killed_enemy_event",
                "info": ""
            },
            {
                "name": "stop_drying_out",
                "info": ""
            },
            {
                "name": "start_drying_out",
                "info": ""
            },
            {
                "name": "recover_after_dried_out",
                "info": ""
            },
            {
                "name": "enter_water",
                "info": ""
            }
        ]
    },
    {
        "name": "bat",
        "info": "蝙蝠"
    },
    {
        "name": "bee",
        "info": "蜜蜂",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_born",
                "info": ""
            },
            {
                "name": "minecraft:ageable_grow_up",
                "info": ""
            },
            {
                "name": "minecraft:exited_disturbed_hive",
                "info": ""
            },
            {
                "name": "hive_destroyed",
                "info": ""
            },
            {
                "name": "stop_panicking_after_fire",
                "info": ""
            },
            {
                "name": "minecraft:exited_hive_on_fire",
                "info": ""
            },
            {
                "name": "minecraft:exited_hive",
                "info": ""
            },
            {
                "name": "minecraft:hive_full",
                "info": ""
            },
            {
                "name": "attacked",
                "info": ""
            },
            {
                "name": "calmed_down",
                "info": ""
            },
            {
                "name": "collected_nectar",
                "info": ""
            },
            {
                "name": "find_hive_event",
                "info": ""
            },
            {
                "name": "find_hive_timeout",
                "info": ""
            },
            {
                "name": "find_flower_timeout",
                "info": ""
            },
            {
                "name": "seek_shelter",
                "info": ""
            },
            {
                "name": "abort_sheltering",
                "info": ""
            },
            {
                "name": "countdown_to_perish_event",
                "info": ""
            },
            {
                "name": "perish_event",
                "info": ""
            }
        ]
    },
    {
        "name": "blaze",
        "info": "烈焰人",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "switch_to_melee",
                "info": ""
            },
            {
                "name": "switch_to_ranged",
                "info": ""
            },
            {
                "name": "minecraft:on_hurt_event",
                "info": ""
            }
        ]
    },
    {
        "name": "boat",
        "info": "船",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entered_bubble_column_down",
                "info": ""
            },
            {
                "name": "minecraft:entered_bubble_column_up",
                "info": ""
            },
            {
                "name": "minecraft:exited_bubble_column",
                "info": ""
            },
            {
                "name": "minecraft:sink",
                "info": ""
            }
        ]
    },
    {
        "name": "cat",
        "info": "猫",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:spawn_from_village",
                "info": ""
            },
            {
                "name": "minecraft:entity_born",
                "info": ""
            },
            {
                "name": "minecraft:ageable_grow_up",
                "info": ""
            },
            {
                "name": "minecraft:spawn_midnight_cat",
                "info": ""
            },
            {
                "name": "minecraft:on_tame",
                "info": ""
            },
            {
                "name": "minecraft:pet_slept_with_owner",
                "info": ""
            },
            {
                "name": "minecraft:cat_gifted_owner",
                "info": ""
            }
        ]
    },
    {
        "name": "cave_spider",
        "info": "洞穴蜘蛛",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:become_hostile",
                "info": ""
            },
            {
                "name": "minecraft:become_neutral",
                "info": ""
            },
            {
                "name": "minecraft:become_angry",
                "info": ""
            },
            {
                "name": "minecraft:on_calm",
                "info": ""
            }
        ]
    },
    {
        "name": "chest_minecart",
        "info": "运输矿车"
    },
    {
        "name": "chicken",
        "info": "鸡",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_born",
                "info": ""
            },
            {
                "name": "minecraft:ageable_grow_up",
                "info": ""
            },
            {
                "name": "from_egg",
                "info": ""
            },
            {
                "name": "minecraft:spawn_adult",
                "info": ""
            }
        ]
    },
    {
        "name": "cod",
        "info": "鳕鱼"
    },
    {
        "name": "command_block_minecart",
        "info": "命令方块矿车",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:command_block_activate",
                "info": ""
            },
            {
                "name": "minecraft:command_block_deactivate",
                "info": ""
            }
        ]
    },
    {
        "name": "cow",
        "info": "牛",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_transformed",
                "info": ""
            },
            {
                "name": "minecraft:entity_born",
                "info": ""
            },
            {
                "name": "minecraft:ageable_grow_up",
                "info": ""
            },
            {
                "name": "minecraft:spawn_adult",
                "info": ""
            }
        ]
    },
    {
        "name": "creeper",
        "info": "苦力怕",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:start_exploding_forced",
                "info": ""
            },
            {
                "name": "minecraft:start_exploding",
                "info": ""
            },
            {
                "name": "minecraft:stop_exploding",
                "info": ""
            },
            {
                "name": "minecraft:become_charged",
                "info": ""
            }
        ]
    },
    {
        "name": "dolphin",
        "info": "海豚",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:ageable_grow_up",
                "info": ""
            },
            {
                "name": "minecraft:become_angry",
                "info": ""
            },
            {
                "name": "minecraft:on_calm",
                "info": ""
            },
            {
                "name": "minecraft:stop_dryingout",
                "info": ""
            },
            {
                "name": "minecraft:start_dryingout",
                "info": ""
            },
            {
                "name": "minecraft:dried_out",
                "info": ""
            },
            {
                "name": "minecraft:navigation_on_land",
                "info": ""
            },
            {
                "name": "minecraft:navigation_off_land",
                "info": ""
            },
            {
                "name": "ageable_grow_up",
                "info": ""
            },
            {
                "name": "become_angry",
                "info": ""
            },
            {
                "name": "on_calm",
                "info": ""
            },
            {
                "name": "stop_dryingout",
                "info": ""
            },
            {
                "name": "start_dryingout",
                "info": ""
            },
            {
                "name": "dried_out",
                "info": ""
            },
            {
                "name": "navigation_on_land",
                "info": ""
            },
            {
                "name": "navigation_off_land",
                "info": ""
            },
            {
                "name": "recover_after_dried_out",
                "info": ""
            }
        ]
    },
    {
        "name": "donkey",
        "info": "驴",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_born",
                "info": ""
            },
            {
                "name": "minecraft:ageable_grow_up",
                "info": ""
            },
            {
                "name": "minecraft:on_tame",
                "info": ""
            },
            {
                "name": "minecraft:on_chest",
                "info": ""
            },
            {
                "name": "minecraft:donkey_saddled",
                "info": ""
            },
            {
                "name": "minecraft:donkey_unsaddled",
                "info": ""
            }
        ]
    },
    {
        "name": "dragon_fireball",
        "info": "末影龙火球"
    },
    {
        "name": "drowned",
        "info": "溺尸",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:as_adult",
                "info": ""
            },
            {
                "name": "minecraft:as_baby",
                "info": ""
            },
            {
                "name": "minecraft:switch_to_melee",
                "info": ""
            },
            {
                "name": "minecraft:switch_to_ranged",
                "info": ""
            },
            {
                "name": "minecraft:has_target",
                "info": ""
            },
            {
                "name": "minecraft:lost_target",
                "info": ""
            }
        ]
    },
    {
        "name": "egg",
        "info": "鸡蛋"
    },
    {
        "name": "elder_guardian",
        "info": "远古守卫者"
    },
    {
        "name": "elder_guardian_ghost",
        "info": "远古守卫者幽灵"
    },
    {
        "name": "ender_crystal",
        "info": "末影水晶",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:crystal_explode",
                "info": ""
            }
        ]
    },
    {
        "name": "ender_dragon",
        "info": "末影龙",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:start_land",
                "info": ""
            },
            {
                "name": "minecraft:start_fly",
                "info": ""
            },
            {
                "name": "minecraft:start_death",
                "info": ""
            }
        ]
    },
    {
        "name": "ender_pearl",
        "info": "末影珍珠",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            }
        ]
    },
    {
        "name": "enderman",
        "info": "末影人",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:become_angry",
                "info": ""
            },
            {
                "name": "minecraft:on_calm",
                "info": ""
            }
        ]
    },
    {
        "name": "endermite",
        "info": "末影螨"
    },
    {
        "name": "evocation_fang",
        "info": "唤魔者尖牙"
    },
    {
        "name": "evocation_illager",
        "info": "唤魔者",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:spawn_for_raid",
                "info": ""
            },
            {
                "name": "minecraft:start_celebrating",
                "info": ""
            },
            {
                "name": "minecraft:stop_celebrating",
                "info": ""
            },
            {
                "name": "minecraft:raid_expired",
                "info": ""
            }
        ]
    },
    {
        "name": "eye_of_ender_signal",
        "info": "末影之眼"
    },
    {
        "name": "falling_block",
        "info": "下落的方块"
    },
    {
        "name": "fireball",
        "info": "火球",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:explode",
                "info": ""
            }
        ]
    },
    {
        "name": "fireworks_rocket",
        "info": "烟花火箭"
    },
    {
        "name": "fishing_hook",
        "info": "浮漂",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            }
        ]
    },
    {
        "name": "fox",
        "info": "狐狸",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_born",
                "info": ""
            },
            {
                "name": "minecraft:ageable_grow_up",
                "info": ""
            },
            {
                "name": "minecraft:fox_configure_thunderstorm",
                "info": ""
            },
            {
                "name": "minecraft:fox_configure_day",
                "info": ""
            },
            {
                "name": "minecraft:fox_configure_night",
                "info": ""
            },
            {
                "name": "minecraft:ambient_normal",
                "info": ""
            },
            {
                "name": "minecraft:ambient_sleep",
                "info": ""
            },
            {
                "name": "minecraft:ambient_night",
                "info": ""
            },
            {
                "name": "minecraft:fox_configure_defending",
                "info": ""
            },
            {
                "name": "minecraft:fox_configure_docile_day",
                "info": ""
            },
            {
                "name": "minecraft:fox_configure_docile_night",
                "info": ""
            }
        ]
    },
    {
        "name": "ghast",
        "info": "恶魂"
    },
    {
        "name": "glow_squid",
        "info": "发光鱿鱼",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            }
        ]
    },
    {
        "name": "goat",
        "info": "山羊",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_born",
                "info": ""
            },
            {
                "name": "minecraft:ageable_grow_up",
                "info": ""
            },
            {
                "name": "attack_cooldown_complete_event",
                "info": ""
            },
            {
                "name": "minecraft:born_default",
                "info": ""
            },
            {
                "name": "minecraft:born_screamer",
                "info": ""
            },
            {
                "name": "start_event",
                "info": ""
            }
        ]
    },
    {
        "name": "guardian",
        "info": "守卫者",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:target_too_close",
                "info": ""
            },
            {
                "name": "minecraft:target_far_enough",
                "info": ""
            }
        ]
    },
    {
        "name": "hoglin",
        "info": "疣猪兽",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_born",
                "info": ""
            },
            {
                "name": "minecraft:ageable_grow_up",
                "info": ""
            },
            {
                "name": "spawn_adult",
                "info": ""
            },
            {
                "name": "spawn_baby",
                "info": ""
            },
            {
                "name": "stop_zombification_event",
                "info": ""
            },
            {
                "name": "become_zombie_event",
                "info": ""
            },
            {
                "name": "start_zombification_event",
                "info": ""
            },
            {
                "name": "spawn_adult_unhuntable",
                "info": ""
            },
            {
                "name": "become_angry_event",
                "info": ""
            },
            {
                "name": "become_calm_event",
                "info": ""
            },
            {
                "name": "escaped_event",
                "info": ""
            },
            {
                "name": "attack_cooldown_complete_event",
                "info": ""
            }
        ]
    },
    {
        "name": "hopper_minecart",
        "info": "漏斗矿车",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:hopper_activate",
                "info": ""
            },
            {
                "name": "minecraft:hopper_deactivate",
                "info": ""
            }
        ]
    },
    {
        "name": "horse",
        "info": "马",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_born",
                "info": ""
            },
            {
                "name": "minecraft:ageable_grow_up",
                "info": ""
            },
            {
                "name": "minecraft:on_tame",
                "info": ""
            },
            {
                "name": "minecraft:horse_saddled",
                "info": ""
            },
            {
                "name": "minecraft:horse_unsaddled",
                "info": ""
            },
            {
                "name": "minecraft:make_white",
                "info": ""
            },
            {
                "name": "minecraft:make_creamy",
                "info": ""
            },
            {
                "name": "minecraft:make_chestnut",
                "info": ""
            },
            {
                "name": "minecraft:make_brown",
                "info": ""
            },
            {
                "name": "minecraft:make_black",
                "info": ""
            },
            {
                "name": "minecraft:make_gray",
                "info": ""
            },
            {
                "name": "minecraft:make_darkbrown",
                "info": ""
            }
        ]
    },
    {
        "name": "husk",
        "info": "尸壳",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:start_transforming",
                "info": ""
            },
            {
                "name": "minecraft:stop_transforming",
                "info": ""
            },
            {
                "name": "minecraft:convert_to_zombie",
                "info": ""
            }
        ]
    },
    {
        "name": "iron_golem",
        "info": "铁傀儡",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:from_player",
                "info": ""
            },
            {
                "name": "minecraft:from_village",
                "info": ""
            }
        ]
    },
    {
        "name": "item",
        "info": "物品"
    },
    {
        "name": "leash_knot",
        "info": "拴绳结"
    },
    {
        "name": "lightning_bolt",
        "info": "闪电"
    },
    {
        "name": "lingering_potion",
        "info": "滞留药水"
    },
    {
        "name": "llama",
        "info": "羊驼",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_born",
                "info": ""
            },
            {
                "name": "minecraft:ageable_grow_up",
                "info": ""
            },
            {
                "name": "minecraft:on_tame",
                "info": ""
            },
            {
                "name": "minecraft:become_angry",
                "info": ""
            },
            {
                "name": "minecraft:on_calm",
                "info": ""
            },
            {
                "name": "minecraft:on_chest",
                "info": ""
            },
            {
                "name": "minecraft:from_wandering_trader",
                "info": ""
            },
            {
                "name": "minecraft:join_caravan",
                "info": ""
            },
            {
                "name": "minecraft:leave_caravan",
                "info": ""
            },
            {
                "name": "minecraft:mad_at_wolf",
                "info": ""
            },
            {
                "name": "minecraft:defend_wandering_trader",
                "info": ""
            },
            {
                "name": "minecraft:spawn_adult",
                "info": ""
            },
            {
                "name": "minecraft:add_attributes",
                "info": ""
            },
            {
                "name": "minecraft:spawn_baby",
                "info": ""
            }
        ]
    },
    {
        "name": "llama_spit",
        "info": "羊驼唾沫"
    },
    {
        "name": "magma_cube",
        "info": "岩浆怪",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:become_calm",
                "info": ""
            },
            {
                "name": "minecraft:become_aggressive",
                "info": ""
            }
        ]
    },
    {
        "name": "minecart",
        "info": "矿车"
    },
    {
        "name": "minecraft:area_effect_cloud",
        "info": "区域效果云"
    },
    {
        "name": "minecraft:armor_stand",
        "info": "盔甲架"
    },
    {
        "name": "minecraft:arrow",
        "info": "箭",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:axolotl",
        "info": "美西螈",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_born",
                "info": ""
            },
            {
                "name": "minecraft:ageable_grow_up",
                "info": ""
            },
            {
                "name": "attack_cooldown_complete_event",
                "info": ""
            },
            {
                "name": "dried_out",
                "info": ""
            },
            {
                "name": "killed_enemy_event",
                "info": ""
            },
            {
                "name": "stop_drying_out",
                "info": ""
            },
            {
                "name": "start_drying_out",
                "info": ""
            },
            {
                "name": "recover_after_dried_out",
                "info": ""
            },
            {
                "name": "enter_water",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:bat",
        "info": "蝙蝠"
    },
    {
        "name": "minecraft:bee",
        "info": "蜜蜂",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_born",
                "info": ""
            },
            {
                "name": "minecraft:ageable_grow_up",
                "info": ""
            },
            {
                "name": "minecraft:exited_disturbed_hive",
                "info": ""
            },
            {
                "name": "hive_destroyed",
                "info": ""
            },
            {
                "name": "stop_panicking_after_fire",
                "info": ""
            },
            {
                "name": "minecraft:exited_hive_on_fire",
                "info": ""
            },
            {
                "name": "minecraft:exited_hive",
                "info": ""
            },
            {
                "name": "minecraft:hive_full",
                "info": ""
            },
            {
                "name": "attacked",
                "info": ""
            },
            {
                "name": "calmed_down",
                "info": ""
            },
            {
                "name": "collected_nectar",
                "info": ""
            },
            {
                "name": "find_hive_event",
                "info": ""
            },
            {
                "name": "find_hive_timeout",
                "info": ""
            },
            {
                "name": "find_flower_timeout",
                "info": ""
            },
            {
                "name": "seek_shelter",
                "info": ""
            },
            {
                "name": "abort_sheltering",
                "info": ""
            },
            {
                "name": "countdown_to_perish_event",
                "info": ""
            },
            {
                "name": "perish_event",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:blaze",
        "info": "烈焰人",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "switch_to_melee",
                "info": ""
            },
            {
                "name": "switch_to_ranged",
                "info": ""
            },
            {
                "name": "minecraft:on_hurt_event",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:boat",
        "info": "船",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entered_bubble_column_down",
                "info": ""
            },
            {
                "name": "minecraft:entered_bubble_column_up",
                "info": ""
            },
            {
                "name": "minecraft:exited_bubble_column",
                "info": ""
            },
            {
                "name": "minecraft:sink",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:cat",
        "info": "猫",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:spawn_from_village",
                "info": ""
            },
            {
                "name": "minecraft:entity_born",
                "info": ""
            },
            {
                "name": "minecraft:ageable_grow_up",
                "info": ""
            },
            {
                "name": "minecraft:spawn_midnight_cat",
                "info": ""
            },
            {
                "name": "minecraft:on_tame",
                "info": ""
            },
            {
                "name": "minecraft:pet_slept_with_owner",
                "info": ""
            },
            {
                "name": "minecraft:cat_gifted_owner",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:cave_spider",
        "info": "洞穴蜘蛛",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:become_hostile",
                "info": ""
            },
            {
                "name": "minecraft:become_neutral",
                "info": ""
            },
            {
                "name": "minecraft:become_angry",
                "info": ""
            },
            {
                "name": "minecraft:on_calm",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:chest_minecart",
        "info": "运输矿车"
    },
    {
        "name": "minecraft:chicken",
        "info": "鸡",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_born",
                "info": ""
            },
            {
                "name": "minecraft:ageable_grow_up",
                "info": ""
            },
            {
                "name": "from_egg",
                "info": ""
            },
            {
                "name": "minecraft:spawn_adult",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:cod",
        "info": "鳕鱼"
    },
    {
        "name": "minecraft:command_block_minecart",
        "info": "命令方块矿车",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:command_block_activate",
                "info": ""
            },
            {
                "name": "minecraft:command_block_deactivate",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:cow",
        "info": "牛",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_transformed",
                "info": ""
            },
            {
                "name": "minecraft:entity_born",
                "info": ""
            },
            {
                "name": "minecraft:ageable_grow_up",
                "info": ""
            },
            {
                "name": "minecraft:spawn_adult",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:creeper",
        "info": "苦力怕",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:start_exploding_forced",
                "info": ""
            },
            {
                "name": "minecraft:start_exploding",
                "info": ""
            },
            {
                "name": "minecraft:stop_exploding",
                "info": ""
            },
            {
                "name": "minecraft:become_charged",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:dolphin",
        "info": "海豚",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:ageable_grow_up",
                "info": ""
            },
            {
                "name": "minecraft:become_angry",
                "info": ""
            },
            {
                "name": "minecraft:on_calm",
                "info": ""
            },
            {
                "name": "minecraft:stop_dryingout",
                "info": ""
            },
            {
                "name": "minecraft:start_dryingout",
                "info": ""
            },
            {
                "name": "minecraft:dried_out",
                "info": ""
            },
            {
                "name": "minecraft:navigation_on_land",
                "info": ""
            },
            {
                "name": "minecraft:navigation_off_land",
                "info": ""
            },
            {
                "name": "ageable_grow_up",
                "info": ""
            },
            {
                "name": "become_angry",
                "info": ""
            },
            {
                "name": "on_calm",
                "info": ""
            },
            {
                "name": "stop_dryingout",
                "info": ""
            },
            {
                "name": "start_dryingout",
                "info": ""
            },
            {
                "name": "dried_out",
                "info": ""
            },
            {
                "name": "navigation_on_land",
                "info": ""
            },
            {
                "name": "navigation_off_land",
                "info": ""
            },
            {
                "name": "recover_after_dried_out",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:donkey",
        "info": "驴",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_born",
                "info": ""
            },
            {
                "name": "minecraft:ageable_grow_up",
                "info": ""
            },
            {
                "name": "minecraft:on_tame",
                "info": ""
            },
            {
                "name": "minecraft:on_chest",
                "info": ""
            },
            {
                "name": "minecraft:donkey_saddled",
                "info": ""
            },
            {
                "name": "minecraft:donkey_unsaddled",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:dragon_fireball",
        "info": "末影龙火球"
    },
    {
        "name": "minecraft:drowned",
        "info": "溺尸",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:as_adult",
                "info": ""
            },
            {
                "name": "minecraft:as_baby",
                "info": ""
            },
            {
                "name": "minecraft:switch_to_melee",
                "info": ""
            },
            {
                "name": "minecraft:switch_to_ranged",
                "info": ""
            },
            {
                "name": "minecraft:has_target",
                "info": ""
            },
            {
                "name": "minecraft:lost_target",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:egg",
        "info": "鸡蛋"
    },
    {
        "name": "minecraft:elder_guardian",
        "info": "远古守卫者"
    },
    {
        "name": "minecraft:elder_guardian_ghost",
        "info": "远古守卫者幽灵"
    },
    {
        "name": "minecraft:ender_crystal",
        "info": "末影水晶",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:crystal_explode",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:ender_dragon",
        "info": "末影龙",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:start_land",
                "info": ""
            },
            {
                "name": "minecraft:start_fly",
                "info": ""
            },
            {
                "name": "minecraft:start_death",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:ender_pearl",
        "info": "末影珍珠",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:enderman",
        "info": "末影人",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:become_angry",
                "info": ""
            },
            {
                "name": "minecraft:on_calm",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:endermite",
        "info": "末影螨"
    },
    {
        "name": "minecraft:evocation_fang",
        "info": "唤魔者尖牙"
    },
    {
        "name": "minecraft:evocation_illager",
        "info": "唤魔者",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:spawn_for_raid",
                "info": ""
            },
            {
                "name": "minecraft:start_celebrating",
                "info": ""
            },
            {
                "name": "minecraft:stop_celebrating",
                "info": ""
            },
            {
                "name": "minecraft:raid_expired",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:eye_of_ender_signal",
        "info": "末影之眼"
    },
    {
        "name": "minecraft:falling_block",
        "info": "下落的方块"
    },
    {
        "name": "minecraft:fireball",
        "info": "火球",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:explode",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:fireworks_rocket",
        "info": "烟花火箭"
    },
    {
        "name": "minecraft:fishing_hook",
        "info": "浮漂",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:fox",
        "info": "狐狸",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_born",
                "info": ""
            },
            {
                "name": "minecraft:ageable_grow_up",
                "info": ""
            },
            {
                "name": "minecraft:fox_configure_thunderstorm",
                "info": ""
            },
            {
                "name": "minecraft:fox_configure_day",
                "info": ""
            },
            {
                "name": "minecraft:fox_configure_night",
                "info": ""
            },
            {
                "name": "minecraft:ambient_normal",
                "info": ""
            },
            {
                "name": "minecraft:ambient_sleep",
                "info": ""
            },
            {
                "name": "minecraft:ambient_night",
                "info": ""
            },
            {
                "name": "minecraft:fox_configure_defending",
                "info": ""
            },
            {
                "name": "minecraft:fox_configure_docile_day",
                "info": ""
            },
            {
                "name": "minecraft:fox_configure_docile_night",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:ghast",
        "info": "恶魂"
    },
    {
        "name": "minecraft:glow_squid",
        "info": "发光鱿鱼",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:goat",
        "info": "山羊",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_born",
                "info": ""
            },
            {
                "name": "minecraft:ageable_grow_up",
                "info": ""
            },
            {
                "name": "attack_cooldown_complete_event",
                "info": ""
            },
            {
                "name": "minecraft:born_default",
                "info": ""
            },
            {
                "name": "minecraft:born_screamer",
                "info": ""
            },
            {
                "name": "start_event",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:guardian",
        "info": "守卫者",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:target_too_close",
                "info": ""
            },
            {
                "name": "minecraft:target_far_enough",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:hoglin",
        "info": "疣猪兽",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_born",
                "info": ""
            },
            {
                "name": "minecraft:ageable_grow_up",
                "info": ""
            },
            {
                "name": "spawn_adult",
                "info": ""
            },
            {
                "name": "spawn_baby",
                "info": ""
            },
            {
                "name": "stop_zombification_event",
                "info": ""
            },
            {
                "name": "become_zombie_event",
                "info": ""
            },
            {
                "name": "start_zombification_event",
                "info": ""
            },
            {
                "name": "spawn_adult_unhuntable",
                "info": ""
            },
            {
                "name": "become_angry_event",
                "info": ""
            },
            {
                "name": "become_calm_event",
                "info": ""
            },
            {
                "name": "escaped_event",
                "info": ""
            },
            {
                "name": "attack_cooldown_complete_event",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:hopper_minecart",
        "info": "漏斗矿车",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:hopper_activate",
                "info": ""
            },
            {
                "name": "minecraft:hopper_deactivate",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:horse",
        "info": "马",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_born",
                "info": ""
            },
            {
                "name": "minecraft:ageable_grow_up",
                "info": ""
            },
            {
                "name": "minecraft:on_tame",
                "info": ""
            },
            {
                "name": "minecraft:horse_saddled",
                "info": ""
            },
            {
                "name": "minecraft:horse_unsaddled",
                "info": ""
            },
            {
                "name": "minecraft:make_white",
                "info": ""
            },
            {
                "name": "minecraft:make_creamy",
                "info": ""
            },
            {
                "name": "minecraft:make_chestnut",
                "info": ""
            },
            {
                "name": "minecraft:make_brown",
                "info": ""
            },
            {
                "name": "minecraft:make_black",
                "info": ""
            },
            {
                "name": "minecraft:make_gray",
                "info": ""
            },
            {
                "name": "minecraft:make_darkbrown",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:husk",
        "info": "尸壳",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:start_transforming",
                "info": ""
            },
            {
                "name": "minecraft:stop_transforming",
                "info": ""
            },
            {
                "name": "minecraft:convert_to_zombie",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:iron_golem",
        "info": "铁傀儡",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:from_player",
                "info": ""
            },
            {
                "name": "minecraft:from_village",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:item",
        "info": "物品"
    },
    {
        "name": "minecraft:leash_knot",
        "info": "拴绳结"
    },
    {
        "name": "minecraft:lightning_bolt",
        "info": "闪电"
    },
    {
        "name": "minecraft:lingering_potion",
        "info": "滞留药水"
    },
    {
        "name": "minecraft:llama",
        "info": "羊驼",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_born",
                "info": ""
            },
            {
                "name": "minecraft:ageable_grow_up",
                "info": ""
            },
            {
                "name": "minecraft:on_tame",
                "info": ""
            },
            {
                "name": "minecraft:become_angry",
                "info": ""
            },
            {
                "name": "minecraft:on_calm",
                "info": ""
            },
            {
                "name": "minecraft:on_chest",
                "info": ""
            },
            {
                "name": "minecraft:from_wandering_trader",
                "info": ""
            },
            {
                "name": "minecraft:join_caravan",
                "info": ""
            },
            {
                "name": "minecraft:leave_caravan",
                "info": ""
            },
            {
                "name": "minecraft:mad_at_wolf",
                "info": ""
            },
            {
                "name": "minecraft:defend_wandering_trader",
                "info": ""
            },
            {
                "name": "minecraft:spawn_adult",
                "info": ""
            },
            {
                "name": "minecraft:add_attributes",
                "info": ""
            },
            {
                "name": "minecraft:spawn_baby",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:llama_spit",
        "info": "羊驼唾沫"
    },
    {
        "name": "minecraft:magma_cube",
        "info": "岩浆怪",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:become_calm",
                "info": ""
            },
            {
                "name": "minecraft:become_aggressive",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:minecart",
        "info": "矿车"
    },
    {
        "name": "minecraft:mooshroom",
        "info": "哞菇",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_born",
                "info": ""
            },
            {
                "name": "minecraft:ageable_grow_up",
                "info": ""
            },
            {
                "name": "become_cow",
                "info": ""
            },
            {
                "name": "minecraft:flowerless",
                "info": ""
            },
            {
                "name": "minecraft:ate_allium",
                "info": ""
            },
            {
                "name": "minecraft:ate_cornflower",
                "info": ""
            },
            {
                "name": "minecraft:ate_lily",
                "info": ""
            },
            {
                "name": "minecraft:ate_rose",
                "info": ""
            },
            {
                "name": "minecraft:ate_orchid",
                "info": ""
            },
            {
                "name": "minecraft:ate_daisy",
                "info": ""
            },
            {
                "name": "minecraft:ate_tulip",
                "info": ""
            },
            {
                "name": "minecraft:ate_bluet",
                "info": ""
            },
            {
                "name": "minecraft:ate_poppy",
                "info": ""
            },
            {
                "name": "minecraft:ate_dandelion",
                "info": ""
            },
            {
                "name": "minecraft:become_red",
                "info": ""
            },
            {
                "name": "minecraft:become_brown",
                "info": ""
            },
            {
                "name": "minecraft:become_brown_adult",
                "info": ""
            },
            {
                "name": "minecraft:become_red_adult",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:moving_block",
        "info": "移动中的方块"
    },
    {
        "name": "minecraft:mule",
        "info": "骡",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_born",
                "info": ""
            },
            {
                "name": "minecraft:ageable_grow_up",
                "info": ""
            },
            {
                "name": "minecraft:on_tame",
                "info": ""
            },
            {
                "name": "minecraft:on_chest",
                "info": ""
            },
            {
                "name": "minecraft:mule_saddled",
                "info": ""
            },
            {
                "name": "minecraft:mule_unsaddled",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:npc",
        "info": "NPC"
    },
    {
        "name": "minecraft:ocelot",
        "info": "豹猫",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_born",
                "info": ""
            },
            {
                "name": "minecraft:ageable_grow_up",
                "info": ""
            },
            {
                "name": "minecraft:entity_born_wild",
                "info": ""
            },
            {
                "name": "minecraft:on_trust",
                "info": ""
            },
            {
                "name": "minecraft:on_leash",
                "info": ""
            },
            {
                "name": "minecraft:on_unleash",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:painting",
        "info": "画"
    },
    {
        "name": "minecraft:panda",
        "info": "熊猫",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_born",
                "info": ""
            },
            {
                "name": "minecraft:ageable_grow_up",
                "info": ""
            },
            {
                "name": "minecraft:become_angry",
                "info": ""
            },
            {
                "name": "minecraft:on_calm",
                "info": ""
            },
            {
                "name": "minecraft:panda_lazy",
                "info": ""
            },
            {
                "name": "minecraft:panda_worried",
                "info": ""
            },
            {
                "name": "minecraft:panda_playful",
                "info": ""
            },
            {
                "name": "minecraft:panda_brown",
                "info": ""
            },
            {
                "name": "minecraft:panda_weak",
                "info": ""
            },
            {
                "name": "minecraft:panda_aggressive",
                "info": ""
            },
            {
                "name": "minecraft:on_scared",
                "info": ""
            },
            {
                "name": "minecraft:baby_on_calm",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:parrot",
        "info": "鹦鹉",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:on_tame",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:phantom",
        "info": "幻翼"
    },
    {
        "name": "minecraft:pig",
        "info": "猪",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "become_zombie",
                "info": ""
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_born",
                "info": ""
            },
            {
                "name": "minecraft:ageable_grow_up",
                "info": ""
            },
            {
                "name": "minecraft:on_saddled",
                "info": ""
            },
            {
                "name": "minecraft:spawn_adult",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:piglin",
        "info": "猪灵",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_born",
                "info": ""
            },
            {
                "name": "spawn_adult",
                "info": ""
            },
            {
                "name": "spawn_baby",
                "info": ""
            },
            {
                "name": "stop_zombification_event",
                "info": ""
            },
            {
                "name": "become_zombie_event",
                "info": ""
            },
            {
                "name": "start_zombification_event",
                "info": ""
            },
            {
                "name": "become_angry_event",
                "info": ""
            },
            {
                "name": "become_calm_event",
                "info": ""
            },
            {
                "name": "attack_cooldown_complete_event",
                "info": ""
            },
            {
                "name": "spawn_adult_no_hunting",
                "info": ""
            },
            {
                "name": "spawn_adult_ranged",
                "info": ""
            },
            {
                "name": "spawn_adult_ranged_no_hunting",
                "info": ""
            },
            {
                "name": "spawn_adult_melee",
                "info": ""
            },
            {
                "name": "spawn_adult_melee_no_hunting",
                "info": ""
            },
            {
                "name": "important_block_destroyed_event",
                "info": ""
            },
            {
                "name": "admire_item_started_event",
                "info": ""
            },
            {
                "name": "admire_item_stopped_event",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:piglin_brute",
        "info": "猪灵蛮兵",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "stop_zombification_event",
                "info": ""
            },
            {
                "name": "become_zombie_event",
                "info": ""
            },
            {
                "name": "start_zombification_event",
                "info": ""
            },
            {
                "name": "become_angry_event",
                "info": ""
            },
            {
                "name": "become_calm_event",
                "info": ""
            },
            {
                "name": "important_block_destroyed_event",
                "info": ""
            },
            {
                "name": "go_back_to_spawn_failed",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:pillager",
        "info": "掠夺者",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:spawn_for_raid",
                "info": ""
            },
            {
                "name": "minecraft:start_celebrating",
                "info": ""
            },
            {
                "name": "minecraft:stop_celebrating",
                "info": ""
            },
            {
                "name": "minecraft:spawn_as_patrol_follower",
                "info": ""
            },
            {
                "name": "minecraft:spawn_as_illager_captain",
                "info": ""
            },
            {
                "name": "minecraft:promote_to_illager_captain",
                "info": ""
            },
            {
                "name": "minecraft:promote_to_patrol_captain",
                "info": ""
            },
            {
                "name": "minecraft:melee_mode",
                "info": ""
            },
            {
                "name": "minecraft:ranged_mode",
                "info": ""
            },
            {
                "name": "minecraft:calm",
                "info": ""
            },
            {
                "name": "minecraft:raid_expired",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:player",
        "info": "玩家",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:gain_bad_omen",
                "info": ""
            },
            {
                "name": "minecraft:clear_add_bad_omen",
                "info": ""
            },
            {
                "name": "minecraft:trigger_raid",
                "info": ""
            },
            {
                "name": "minecraft:remove_raid_trigger",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:polar_bear",
        "info": "北极熊",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_born",
                "info": ""
            },
            {
                "name": "minecraft:ageable_grow_up",
                "info": ""
            },
            {
                "name": "minecraft:on_calm",
                "info": ""
            },
            {
                "name": "minecraft:on_scared",
                "info": ""
            },
            {
                "name": "minecraft:baby_on_calm",
                "info": ""
            },
            {
                "name": "minecraft:on_anger",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:pufferfish",
        "info": "河豚",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:to_full_puff",
                "info": ""
            },
            {
                "name": "minecraft:on_full_puff",
                "info": ""
            },
            {
                "name": "minecraft:from_full_puff",
                "info": ""
            },
            {
                "name": "minecraft:on_deflate",
                "info": ""
            },
            {
                "name": "minecraft:on_normal_puff",
                "info": ""
            },
            {
                "name": "minecraft:start_half_puff",
                "info": ""
            },
            {
                "name": "minecraft:on_half_puff",
                "info": ""
            },
            {
                "name": "minecraft:start_full_puff",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:rabbit",
        "info": "兔子",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_born",
                "info": ""
            },
            {
                "name": "in_desert",
                "info": ""
            },
            {
                "name": "in_snow",
                "info": ""
            },
            {
                "name": "grow_up",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:ravager",
        "info": "劫掠兽",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:spawn_for_raid",
                "info": ""
            },
            {
                "name": "minecraft:start_celebrating",
                "info": ""
            },
            {
                "name": "minecraft:stop_celebrating",
                "info": ""
            },
            {
                "name": "minecraft:spawn_for_raid_with_evoker_rider",
                "info": ""
            },
            {
                "name": "minecraft:spawn_for_raid_with_pillager_rider",
                "info": ""
            },
            {
                "name": "minecraft:spawn_with_pillager_rider",
                "info": ""
            },
            {
                "name": "minecraft:spawn_with_pillager_captain_rider",
                "info": ""
            },
            {
                "name": "minecraft:spawn_with_vindicator_rider",
                "info": ""
            },
            {
                "name": "minecraft:spawn_with_vindicator_captain_rider",
                "info": ""
            },
            {
                "name": "minecraft:become_stunned",
                "info": ""
            },
            {
                "name": "minecraft:start_roar",
                "info": ""
            },
            {
                "name": "minecraft:end_roar",
                "info": ""
            },
            {
                "name": "minecraft:raid_expired",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:salmon",
        "info": "鲑鱼",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:sheep",
        "info": "绵羊",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_born",
                "info": ""
            },
            {
                "name": "minecraft:ageable_grow_up",
                "info": ""
            },
            {
                "name": "minecraft:on_sheared",
                "info": ""
            },
            {
                "name": "minecraft:on_eat_block",
                "info": ""
            },
            {
                "name": "wololo",
                "info": ""
            },
            {
                "name": "spawn_adult",
                "info": ""
            },
            {
                "name": "spawn_baby",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:shield",
        "info": "盾牌"
    },
    {
        "name": "minecraft:shulker",
        "info": "潜影贝",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:turn_purple",
                "info": ""
            },
            {
                "name": "minecraft:turn_black",
                "info": ""
            },
            {
                "name": "minecraft:turn_blue",
                "info": ""
            },
            {
                "name": "minecraft:turn_brown",
                "info": ""
            },
            {
                "name": "minecraft:turn_cyan",
                "info": ""
            },
            {
                "name": "minecraft:turn_gray",
                "info": ""
            },
            {
                "name": "minecraft:turn_green",
                "info": ""
            },
            {
                "name": "minecraft:turn_light_blue",
                "info": ""
            },
            {
                "name": "minecraft:turn_lime",
                "info": ""
            },
            {
                "name": "minecraft:turn_magenta",
                "info": ""
            },
            {
                "name": "minecraft:turn_orange",
                "info": ""
            },
            {
                "name": "minecraft:turn_pink",
                "info": ""
            },
            {
                "name": "minecraft:turn_red",
                "info": ""
            },
            {
                "name": "minecraft:turn_silver",
                "info": ""
            },
            {
                "name": "minecraft:turn_white",
                "info": ""
            },
            {
                "name": "minecraft:turn_yellow",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:shulker_bullet",
        "info": "潜影贝导弹"
    },
    {
        "name": "minecraft:silverfish",
        "info": "蠹虫",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:become_angry",
                "info": ""
            },
            {
                "name": "minecraft:on_calm",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:skeleton",
        "info": "骷髅",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:melee_mode",
                "info": ""
            },
            {
                "name": "minecraft:ranged_mode",
                "info": ""
            },
            {
                "name": "minecraft:spring_trap",
                "info": ""
            },
            {
                "name": "become_stray_event",
                "info": ""
            },
            {
                "name": "got_in_powder_snow",
                "info": ""
            },
            {
                "name": "got_out_of_powder_snow",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:skeleton_horse",
        "info": "骷髅马",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:spring_trap",
                "info": ""
            },
            {
                "name": "minecraft:set_trap",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:slime",
        "info": "史莱姆",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:become_calm",
                "info": ""
            },
            {
                "name": "minecraft:become_aggressive",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:small_fireball",
        "info": "小火球"
    },
    {
        "name": "minecraft:snow_golem",
        "info": "雪傀儡",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:on_sheared",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:snowball",
        "info": "雪球"
    },
    {
        "name": "minecraft:spider",
        "info": "蜘蛛",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:become_hostile",
                "info": ""
            },
            {
                "name": "minecraft:become_neutral",
                "info": ""
            },
            {
                "name": "minecraft:become_angry",
                "info": ""
            },
            {
                "name": "minecraft:become_calm",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:splash_potion",
        "info": "喷溅药水"
    },
    {
        "name": "minecraft:squid",
        "info": "鱿鱼",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:stray",
        "info": "流浪者",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:melee_mode",
                "info": ""
            },
            {
                "name": "minecraft:ranged_mode",
                "info": ""
            },
            {
                "name": "change_to_skeleton",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:strider",
        "info": "炽足兽",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_born",
                "info": ""
            },
            {
                "name": "minecraft:ageable_grow_up",
                "info": ""
            },
            {
                "name": "minecraft:on_saddled",
                "info": ""
            },
            {
                "name": "spawn_adult",
                "info": ""
            },
            {
                "name": "spawn_baby",
                "info": ""
            },
            {
                "name": "spawn_adult_parent_jockey",
                "info": ""
            },
            {
                "name": "spawn_adult_piglin_jockey",
                "info": ""
            },
            {
                "name": "spawn_zombified_piglin_rider",
                "info": ""
            },
            {
                "name": "start_suffocating",
                "info": ""
            },
            {
                "name": "stop_suffocating",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:thrown_trident",
        "info": "三叉戟"
    },
    {
        "name": "minecraft:tnt",
        "info": "TNT",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "from_explosion",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:tnt_minecart",
        "info": "TNT矿车",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:on_prime",
                "info": ""
            },
            {
                "name": "minecraft:on_instant_prime",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:tropicalfish",
        "info": "热带鱼",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:become_anenonme",
                "info": ""
            },
            {
                "name": "minecraft:become_black_tang",
                "info": ""
            },
            {
                "name": "minecraft:become_blue_dory",
                "info": ""
            },
            {
                "name": "minecraft:become_butterfly_fish",
                "info": ""
            },
            {
                "name": "minecraft:become_cichlid",
                "info": ""
            },
            {
                "name": "minecraft:become_clownfish",
                "info": ""
            },
            {
                "name": "minecraft:become_cc_betta",
                "info": ""
            },
            {
                "name": "minecraft:become_dog_fish",
                "info": ""
            },
            {
                "name": "minecraft:become_e_red_snapper",
                "info": ""
            },
            {
                "name": "minecraft:become_goat_fish",
                "info": ""
            },
            {
                "name": "minecraft:become_moorish_idol",
                "info": ""
            },
            {
                "name": "minecraft:become_ornate_butterfly",
                "info": ""
            },
            {
                "name": "minecraft:become_parrot_fish",
                "info": ""
            },
            {
                "name": "minecraft:become_queen_angel_fish",
                "info": ""
            },
            {
                "name": "minecraft:become_red_cichlid",
                "info": ""
            },
            {
                "name": "minecraft:become_red_lipped_benny",
                "info": ""
            },
            {
                "name": "minecraft:become_red_snapper",
                "info": ""
            },
            {
                "name": "minecraft:become_threadfin",
                "info": ""
            },
            {
                "name": "minecraft:become_tomato_clown",
                "info": ""
            },
            {
                "name": "minecraft:become_triggerfish",
                "info": ""
            },
            {
                "name": "minecraft:become_yellow_tang",
                "info": ""
            },
            {
                "name": "minecraft:become_yellow_tail_parrot",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:turtle",
        "info": "海龟",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_born",
                "info": ""
            },
            {
                "name": "minecraft:ageable_grow_up",
                "info": ""
            },
            {
                "name": "minecraft:become_pregnant",
                "info": ""
            },
            {
                "name": "minecraft:go_lay_egg",
                "info": ""
            },
            {
                "name": "minecraft:laid_egg",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:vex",
        "info": "恼鬼"
    },
    {
        "name": "minecraft:villager",
        "info": "村民",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "become_witch",
                "info": ""
            },
            {
                "name": "become_zombie",
                "info": ""
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_transformed",
                "info": ""
            },
            {
                "name": "minecraft:entity_born",
                "info": ""
            },
            {
                "name": "minecraft:spawn_farmer",
                "info": ""
            },
            {
                "name": "minecraft:spawn_librarian",
                "info": ""
            },
            {
                "name": "minecraft:spawn_cleric",
                "info": ""
            },
            {
                "name": "minecraft:spawn_armorer",
                "info": ""
            },
            {
                "name": "minecraft:spawn_butcher",
                "info": ""
            },
            {
                "name": "minecraft:ageable_grow_up",
                "info": ""
            },
            {
                "name": "minecraft:become_cleric",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:vindicator",
        "info": "卫道士",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:spawn_for_raid",
                "info": ""
            },
            {
                "name": "minecraft:start_celebrating",
                "info": ""
            },
            {
                "name": "minecraft:stop_celebrating",
                "info": ""
            },
            {
                "name": "minecraft:spawn_as_patrol_follower",
                "info": ""
            },
            {
                "name": "minecraft:spawn_as_illager_captain",
                "info": ""
            },
            {
                "name": "minecraft:promote_to_illager_captain",
                "info": ""
            },
            {
                "name": "minecraft:promote_to_patrol_captain",
                "info": ""
            },
            {
                "name": "minecraft:become_aggro",
                "info": ""
            },
            {
                "name": "minecraft:stop_aggro",
                "info": ""
            },
            {
                "name": "minecraft:start_johnny",
                "info": ""
            },
            {
                "name": "minecraft:stop_johnny",
                "info": ""
            },
            {
                "name": "minecraft:raid_expired",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:wandering_trader",
        "info": "流浪商人",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:become_calm",
                "info": ""
            },
            {
                "name": "minecraft:scheduled",
                "info": ""
            },
            {
                "name": "minecraft:start_despawn",
                "info": ""
            },
            {
                "name": "minecraft:become_scared",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:witch",
        "info": "女巫",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:spawn_for_raid",
                "info": ""
            },
            {
                "name": "minecraft:start_celebrating",
                "info": ""
            },
            {
                "name": "minecraft:stop_celebrating",
                "info": ""
            },
            {
                "name": "minecraft:raid_expired",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:wither",
        "info": "凋灵",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:wither_skeleton",
        "info": "凋灵骷髅",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:wither_skull",
        "info": "凋灵之首",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:explode",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:wither_skull_dangerous",
        "info": "蓝色凋灵之首",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:explode",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:wolf",
        "info": "狼",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_born",
                "info": ""
            },
            {
                "name": "minecraft:ageable_grow_up",
                "info": ""
            },
            {
                "name": "minecraft:on_tame",
                "info": ""
            },
            {
                "name": "minecraft:become_angry",
                "info": ""
            },
            {
                "name": "minecraft:on_calm",
                "info": ""
            },
            {
                "name": "minecraft:ageable_set_baby",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:xp_bottle",
        "info": "附魔之瓶"
    },
    {
        "name": "minecraft:xp_orb",
        "info": "经验球"
    },
    {
        "name": "minecraft:zoglin",
        "info": "僵尸疣猪兽",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_transformed",
                "info": ""
            },
            {
                "name": "minecraft:as_adult",
                "info": ""
            },
            {
                "name": "minecraft:as_baby",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:zombie",
        "info": "僵尸",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:as_adult",
                "info": ""
            },
            {
                "name": "minecraft:as_baby",
                "info": ""
            },
            {
                "name": "minecraft:start_transforming",
                "info": ""
            },
            {
                "name": "minecraft:stop_transforming",
                "info": ""
            },
            {
                "name": "minecraft:convert_to_drowned",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:zombie_horse",
        "info": "僵尸马",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:ageable_grow_up",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:zombie_pigman",
        "info": "僵尸猪灵",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_transformed",
                "info": ""
            },
            {
                "name": "minecraft:become_angry",
                "info": ""
            },
            {
                "name": "minecraft:on_calm",
                "info": ""
            },
            {
                "name": "minecraft:spawn_as_strider_jockey",
                "info": ""
            }
        ]
    },
    {
        "name": "minecraft:zombie_villager",
        "info": "僵尸村民",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_transformed",
                "info": ""
            },
            {
                "name": "minecraft:become_cleric",
                "info": ""
            },
            {
                "name": "villager_converted",
                "info": ""
            },
            {
                "name": "from_village",
                "info": ""
            }
        ]
    },
    {
        "name": "mooshroom",
        "info": "哞菇",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_born",
                "info": ""
            },
            {
                "name": "minecraft:ageable_grow_up",
                "info": ""
            },
            {
                "name": "become_cow",
                "info": ""
            },
            {
                "name": "minecraft:flowerless",
                "info": ""
            },
            {
                "name": "minecraft:ate_allium",
                "info": ""
            },
            {
                "name": "minecraft:ate_cornflower",
                "info": ""
            },
            {
                "name": "minecraft:ate_lily",
                "info": ""
            },
            {
                "name": "minecraft:ate_rose",
                "info": ""
            },
            {
                "name": "minecraft:ate_orchid",
                "info": ""
            },
            {
                "name": "minecraft:ate_daisy",
                "info": ""
            },
            {
                "name": "minecraft:ate_tulip",
                "info": ""
            },
            {
                "name": "minecraft:ate_bluet",
                "info": ""
            },
            {
                "name": "minecraft:ate_poppy",
                "info": ""
            },
            {
                "name": "minecraft:ate_dandelion",
                "info": ""
            },
            {
                "name": "minecraft:become_red",
                "info": ""
            },
            {
                "name": "minecraft:become_brown",
                "info": ""
            },
            {
                "name": "minecraft:become_brown_adult",
                "info": ""
            },
            {
                "name": "minecraft:become_red_adult",
                "info": ""
            }
        ]
    },
    {
        "name": "moving_block",
        "info": "移动中的方块"
    },
    {
        "name": "mule",
        "info": "骡",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_born",
                "info": ""
            },
            {
                "name": "minecraft:ageable_grow_up",
                "info": ""
            },
            {
                "name": "minecraft:on_tame",
                "info": ""
            },
            {
                "name": "minecraft:on_chest",
                "info": ""
            },
            {
                "name": "minecraft:mule_saddled",
                "info": ""
            },
            {
                "name": "minecraft:mule_unsaddled",
                "info": ""
            }
        ]
    },
    {
        "name": "npc",
        "info": "NPC"
    },
    {
        "name": "ocelot",
        "info": "豹猫",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_born",
                "info": ""
            },
            {
                "name": "minecraft:ageable_grow_up",
                "info": ""
            },
            {
                "name": "minecraft:entity_born_wild",
                "info": ""
            },
            {
                "name": "minecraft:on_trust",
                "info": ""
            },
            {
                "name": "minecraft:on_leash",
                "info": ""
            },
            {
                "name": "minecraft:on_unleash",
                "info": ""
            }
        ]
    },
    {
        "name": "painting",
        "info": "画"
    },
    {
        "name": "panda",
        "info": "熊猫",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_born",
                "info": ""
            },
            {
                "name": "minecraft:ageable_grow_up",
                "info": ""
            },
            {
                "name": "minecraft:become_angry",
                "info": ""
            },
            {
                "name": "minecraft:on_calm",
                "info": ""
            },
            {
                "name": "minecraft:panda_lazy",
                "info": ""
            },
            {
                "name": "minecraft:panda_worried",
                "info": ""
            },
            {
                "name": "minecraft:panda_playful",
                "info": ""
            },
            {
                "name": "minecraft:panda_brown",
                "info": ""
            },
            {
                "name": "minecraft:panda_weak",
                "info": ""
            },
            {
                "name": "minecraft:panda_aggressive",
                "info": ""
            },
            {
                "name": "minecraft:on_scared",
                "info": ""
            },
            {
                "name": "minecraft:baby_on_calm",
                "info": ""
            }
        ]
    },
    {
        "name": "parrot",
        "info": "鹦鹉",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:on_tame",
                "info": ""
            }
        ]
    },
    {
        "name": "phantom",
        "info": "幻翼"
    },
    {
        "name": "pig",
        "info": "猪",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "become_zombie",
                "info": ""
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_born",
                "info": ""
            },
            {
                "name": "minecraft:ageable_grow_up",
                "info": ""
            },
            {
                "name": "minecraft:on_saddled",
                "info": ""
            },
            {
                "name": "minecraft:spawn_adult",
                "info": ""
            }
        ]
    },
    {
        "name": "piglin",
        "info": "猪灵",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_born",
                "info": ""
            },
            {
                "name": "spawn_adult",
                "info": ""
            },
            {
                "name": "spawn_baby",
                "info": ""
            },
            {
                "name": "stop_zombification_event",
                "info": ""
            },
            {
                "name": "become_zombie_event",
                "info": ""
            },
            {
                "name": "start_zombification_event",
                "info": ""
            },
            {
                "name": "become_angry_event",
                "info": ""
            },
            {
                "name": "become_calm_event",
                "info": ""
            },
            {
                "name": "attack_cooldown_complete_event",
                "info": ""
            },
            {
                "name": "spawn_adult_no_hunting",
                "info": ""
            },
            {
                "name": "spawn_adult_ranged",
                "info": ""
            },
            {
                "name": "spawn_adult_ranged_no_hunting",
                "info": ""
            },
            {
                "name": "spawn_adult_melee",
                "info": ""
            },
            {
                "name": "spawn_adult_melee_no_hunting",
                "info": ""
            },
            {
                "name": "important_block_destroyed_event",
                "info": ""
            },
            {
                "name": "admire_item_started_event",
                "info": ""
            },
            {
                "name": "admire_item_stopped_event",
                "info": ""
            }
        ]
    },
    {
        "name": "piglin_brute",
        "info": "猪灵蛮兵",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "stop_zombification_event",
                "info": ""
            },
            {
                "name": "become_zombie_event",
                "info": ""
            },
            {
                "name": "start_zombification_event",
                "info": ""
            },
            {
                "name": "become_angry_event",
                "info": ""
            },
            {
                "name": "become_calm_event",
                "info": ""
            },
            {
                "name": "important_block_destroyed_event",
                "info": ""
            },
            {
                "name": "go_back_to_spawn_failed",
                "info": ""
            }
        ]
    },
    {
        "name": "pillager",
        "info": "掠夺者",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:spawn_for_raid",
                "info": ""
            },
            {
                "name": "minecraft:start_celebrating",
                "info": ""
            },
            {
                "name": "minecraft:stop_celebrating",
                "info": ""
            },
            {
                "name": "minecraft:spawn_as_patrol_follower",
                "info": ""
            },
            {
                "name": "minecraft:spawn_as_illager_captain",
                "info": ""
            },
            {
                "name": "minecraft:promote_to_illager_captain",
                "info": ""
            },
            {
                "name": "minecraft:promote_to_patrol_captain",
                "info": ""
            },
            {
                "name": "minecraft:melee_mode",
                "info": ""
            },
            {
                "name": "minecraft:ranged_mode",
                "info": ""
            },
            {
                "name": "minecraft:calm",
                "info": ""
            },
            {
                "name": "minecraft:raid_expired",
                "info": ""
            }
        ]
    },
    {
        "name": "player",
        "info": "玩家",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:gain_bad_omen",
                "info": ""
            },
            {
                "name": "minecraft:clear_add_bad_omen",
                "info": ""
            },
            {
                "name": "minecraft:trigger_raid",
                "info": ""
            },
            {
                "name": "minecraft:remove_raid_trigger",
                "info": ""
            }
        ]
    },
    {
        "name": "polar_bear",
        "info": "北极熊",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_born",
                "info": ""
            },
            {
                "name": "minecraft:ageable_grow_up",
                "info": ""
            },
            {
                "name": "minecraft:on_calm",
                "info": ""
            },
            {
                "name": "minecraft:on_scared",
                "info": ""
            },
            {
                "name": "minecraft:baby_on_calm",
                "info": ""
            },
            {
                "name": "minecraft:on_anger",
                "info": ""
            }
        ]
    },
    {
        "name": "pufferfish",
        "info": "河豚",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:to_full_puff",
                "info": ""
            },
            {
                "name": "minecraft:on_full_puff",
                "info": ""
            },
            {
                "name": "minecraft:from_full_puff",
                "info": ""
            },
            {
                "name": "minecraft:on_deflate",
                "info": ""
            },
            {
                "name": "minecraft:on_normal_puff",
                "info": ""
            },
            {
                "name": "minecraft:start_half_puff",
                "info": ""
            },
            {
                "name": "minecraft:on_half_puff",
                "info": ""
            },
            {
                "name": "minecraft:start_full_puff",
                "info": ""
            }
        ]
    },
    {
        "name": "rabbit",
        "info": "兔子",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_born",
                "info": ""
            },
            {
                "name": "in_desert",
                "info": ""
            },
            {
                "name": "in_snow",
                "info": ""
            },
            {
                "name": "grow_up",
                "info": ""
            }
        ]
    },
    {
        "name": "ravager",
        "info": "劫掠兽",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:spawn_for_raid",
                "info": ""
            },
            {
                "name": "minecraft:start_celebrating",
                "info": ""
            },
            {
                "name": "minecraft:stop_celebrating",
                "info": ""
            },
            {
                "name": "minecraft:spawn_for_raid_with_evoker_rider",
                "info": ""
            },
            {
                "name": "minecraft:spawn_for_raid_with_pillager_rider",
                "info": ""
            },
            {
                "name": "minecraft:spawn_with_pillager_rider",
                "info": ""
            },
            {
                "name": "minecraft:spawn_with_pillager_captain_rider",
                "info": ""
            },
            {
                "name": "minecraft:spawn_with_vindicator_rider",
                "info": ""
            },
            {
                "name": "minecraft:spawn_with_vindicator_captain_rider",
                "info": ""
            },
            {
                "name": "minecraft:become_stunned",
                "info": ""
            },
            {
                "name": "minecraft:start_roar",
                "info": ""
            },
            {
                "name": "minecraft:end_roar",
                "info": ""
            },
            {
                "name": "minecraft:raid_expired",
                "info": ""
            }
        ]
    },
    {
        "name": "salmon",
        "info": "鲑鱼",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            }
        ]
    },
    {
        "name": "sheep",
        "info": "绵羊",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_born",
                "info": ""
            },
            {
                "name": "minecraft:ageable_grow_up",
                "info": ""
            },
            {
                "name": "minecraft:on_sheared",
                "info": ""
            },
            {
                "name": "minecraft:on_eat_block",
                "info": ""
            },
            {
                "name": "wololo",
                "info": ""
            },
            {
                "name": "spawn_adult",
                "info": ""
            },
            {
                "name": "spawn_baby",
                "info": ""
            }
        ]
    },
    {
        "name": "shield",
        "info": "盾牌"
    },
    {
        "name": "shulker",
        "info": "潜影贝",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:turn_purple",
                "info": ""
            },
            {
                "name": "minecraft:turn_black",
                "info": ""
            },
            {
                "name": "minecraft:turn_blue",
                "info": ""
            },
            {
                "name": "minecraft:turn_brown",
                "info": ""
            },
            {
                "name": "minecraft:turn_cyan",
                "info": ""
            },
            {
                "name": "minecraft:turn_gray",
                "info": ""
            },
            {
                "name": "minecraft:turn_green",
                "info": ""
            },
            {
                "name": "minecraft:turn_light_blue",
                "info": ""
            },
            {
                "name": "minecraft:turn_lime",
                "info": ""
            },
            {
                "name": "minecraft:turn_magenta",
                "info": ""
            },
            {
                "name": "minecraft:turn_orange",
                "info": ""
            },
            {
                "name": "minecraft:turn_pink",
                "info": ""
            },
            {
                "name": "minecraft:turn_red",
                "info": ""
            },
            {
                "name": "minecraft:turn_silver",
                "info": ""
            },
            {
                "name": "minecraft:turn_white",
                "info": ""
            },
            {
                "name": "minecraft:turn_yellow",
                "info": ""
            }
        ]
    },
    {
        "name": "shulker_bullet",
        "info": "潜影贝导弹"
    },
    {
        "name": "silverfish",
        "info": "蠹虫",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:become_angry",
                "info": ""
            },
            {
                "name": "minecraft:on_calm",
                "info": ""
            }
        ]
    },
    {
        "name": "skeleton",
        "info": "骷髅",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:melee_mode",
                "info": ""
            },
            {
                "name": "minecraft:ranged_mode",
                "info": ""
            },
            {
                "name": "minecraft:spring_trap",
                "info": ""
            },
            {
                "name": "become_stray_event",
                "info": ""
            },
            {
                "name": "got_in_powder_snow",
                "info": ""
            },
            {
                "name": "got_out_of_powder_snow",
                "info": ""
            }
        ]
    },
    {
        "name": "skeleton_horse",
        "info": "骷髅马",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:spring_trap",
                "info": ""
            },
            {
                "name": "minecraft:set_trap",
                "info": ""
            }
        ]
    },
    {
        "name": "slime",
        "info": "史莱姆",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:become_calm",
                "info": ""
            },
            {
                "name": "minecraft:become_aggressive",
                "info": ""
            }
        ]
    },
    {
        "name": "small_fireball",
        "info": "小火球"
    },
    {
        "name": "snow_golem",
        "info": "雪傀儡",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:on_sheared",
                "info": ""
            }
        ]
    },
    {
        "name": "snowball",
        "info": "雪球"
    },
    {
        "name": "spider",
        "info": "蜘蛛",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:become_hostile",
                "info": ""
            },
            {
                "name": "minecraft:become_neutral",
                "info": ""
            },
            {
                "name": "minecraft:become_angry",
                "info": ""
            },
            {
                "name": "minecraft:become_calm",
                "info": ""
            }
        ]
    },
    {
        "name": "splash_potion",
        "info": "喷溅药水"
    },
    {
        "name": "squid",
        "info": "鱿鱼",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            }
        ]
    },
    {
        "name": "stray",
        "info": "流浪者",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:melee_mode",
                "info": ""
            },
            {
                "name": "minecraft:ranged_mode",
                "info": ""
            },
            {
                "name": "change_to_skeleton",
                "info": ""
            }
        ]
    },
    {
        "name": "strider",
        "info": "炽足兽",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_born",
                "info": ""
            },
            {
                "name": "minecraft:ageable_grow_up",
                "info": ""
            },
            {
                "name": "minecraft:on_saddled",
                "info": ""
            },
            {
                "name": "spawn_adult",
                "info": ""
            },
            {
                "name": "spawn_baby",
                "info": ""
            },
            {
                "name": "spawn_adult_parent_jockey",
                "info": ""
            },
            {
                "name": "spawn_adult_piglin_jockey",
                "info": ""
            },
            {
                "name": "spawn_zombified_piglin_rider",
                "info": ""
            },
            {
                "name": "start_suffocating",
                "info": ""
            },
            {
                "name": "stop_suffocating",
                "info": ""
            }
        ]
    },
    {
        "name": "thrown_trident",
        "info": "三叉戟"
    },
    {
        "name": "tnt",
        "info": "TNT",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "from_explosion",
                "info": ""
            }
        ]
    },
    {
        "name": "tnt_minecart",
        "info": "TNT矿车",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:on_prime",
                "info": ""
            },
            {
                "name": "minecraft:on_instant_prime",
                "info": ""
            }
        ]
    },
    {
        "name": "tropicalfish",
        "info": "热带鱼",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:become_anenonme",
                "info": ""
            },
            {
                "name": "minecraft:become_black_tang",
                "info": ""
            },
            {
                "name": "minecraft:become_blue_dory",
                "info": ""
            },
            {
                "name": "minecraft:become_butterfly_fish",
                "info": ""
            },
            {
                "name": "minecraft:become_cichlid",
                "info": ""
            },
            {
                "name": "minecraft:become_clownfish",
                "info": ""
            },
            {
                "name": "minecraft:become_cc_betta",
                "info": ""
            },
            {
                "name": "minecraft:become_dog_fish",
                "info": ""
            },
            {
                "name": "minecraft:become_e_red_snapper",
                "info": ""
            },
            {
                "name": "minecraft:become_goat_fish",
                "info": ""
            },
            {
                "name": "minecraft:become_moorish_idol",
                "info": ""
            },
            {
                "name": "minecraft:become_ornate_butterfly",
                "info": ""
            },
            {
                "name": "minecraft:become_parrot_fish",
                "info": ""
            },
            {
                "name": "minecraft:become_queen_angel_fish",
                "info": ""
            },
            {
                "name": "minecraft:become_red_cichlid",
                "info": ""
            },
            {
                "name": "minecraft:become_red_lipped_benny",
                "info": ""
            },
            {
                "name": "minecraft:become_red_snapper",
                "info": ""
            },
            {
                "name": "minecraft:become_threadfin",
                "info": ""
            },
            {
                "name": "minecraft:become_tomato_clown",
                "info": ""
            },
            {
                "name": "minecraft:become_triggerfish",
                "info": ""
            },
            {
                "name": "minecraft:become_yellow_tang",
                "info": ""
            },
            {
                "name": "minecraft:become_yellow_tail_parrot",
                "info": ""
            }
        ]
    },
    {
        "name": "turtle",
        "info": "海龟",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_born",
                "info": ""
            },
            {
                "name": "minecraft:ageable_grow_up",
                "info": ""
            },
            {
                "name": "minecraft:become_pregnant",
                "info": ""
            },
            {
                "name": "minecraft:go_lay_egg",
                "info": ""
            },
            {
                "name": "minecraft:laid_egg",
                "info": ""
            }
        ]
    },
    {
        "name": "vex",
        "info": "恼鬼"
    },
    {
        "name": "villager",
        "info": "村民",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "become_witch",
                "info": ""
            },
            {
                "name": "become_zombie",
                "info": ""
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_transformed",
                "info": ""
            },
            {
                "name": "minecraft:entity_born",
                "info": ""
            },
            {
                "name": "minecraft:spawn_farmer",
                "info": ""
            },
            {
                "name": "minecraft:spawn_librarian",
                "info": ""
            },
            {
                "name": "minecraft:spawn_cleric",
                "info": ""
            },
            {
                "name": "minecraft:spawn_armorer",
                "info": ""
            },
            {
                "name": "minecraft:spawn_butcher",
                "info": ""
            },
            {
                "name": "minecraft:ageable_grow_up",
                "info": ""
            },
            {
                "name": "minecraft:become_cleric",
                "info": ""
            }
        ]
    },
    {
        "name": "vindicator",
        "info": "卫道士",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:spawn_for_raid",
                "info": ""
            },
            {
                "name": "minecraft:start_celebrating",
                "info": ""
            },
            {
                "name": "minecraft:stop_celebrating",
                "info": ""
            },
            {
                "name": "minecraft:spawn_as_patrol_follower",
                "info": ""
            },
            {
                "name": "minecraft:spawn_as_illager_captain",
                "info": ""
            },
            {
                "name": "minecraft:promote_to_illager_captain",
                "info": ""
            },
            {
                "name": "minecraft:promote_to_patrol_captain",
                "info": ""
            },
            {
                "name": "minecraft:become_aggro",
                "info": ""
            },
            {
                "name": "minecraft:stop_aggro",
                "info": ""
            },
            {
                "name": "minecraft:start_johnny",
                "info": ""
            },
            {
                "name": "minecraft:stop_johnny",
                "info": ""
            },
            {
                "name": "minecraft:raid_expired",
                "info": ""
            }
        ]
    },
    {
        "name": "wandering_trader",
        "info": "流浪商人",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:become_calm",
                "info": ""
            },
            {
                "name": "minecraft:scheduled",
                "info": ""
            },
            {
                "name": "minecraft:start_despawn",
                "info": ""
            },
            {
                "name": "minecraft:become_scared",
                "info": ""
            }
        ]
    },
    {
        "name": "witch",
        "info": "女巫",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:spawn_for_raid",
                "info": ""
            },
            {
                "name": "minecraft:start_celebrating",
                "info": ""
            },
            {
                "name": "minecraft:stop_celebrating",
                "info": ""
            },
            {
                "name": "minecraft:raid_expired",
                "info": ""
            }
        ]
    },
    {
        "name": "wither",
        "info": "凋灵",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            }
        ]
    },
    {
        "name": "wither_skeleton",
        "info": "凋灵骷髅",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            }
        ]
    },
    {
        "name": "wither_skull",
        "info": "凋灵之首",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:explode",
                "info": ""
            }
        ]
    },
    {
        "name": "wither_skull_dangerous",
        "info": "蓝色凋灵之首",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:explode",
                "info": ""
            }
        ]
    },
    {
        "name": "wolf",
        "info": "狼",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_born",
                "info": ""
            },
            {
                "name": "minecraft:ageable_grow_up",
                "info": ""
            },
            {
                "name": "minecraft:on_tame",
                "info": ""
            },
            {
                "name": "minecraft:become_angry",
                "info": ""
            },
            {
                "name": "minecraft:on_calm",
                "info": ""
            },
            {
                "name": "minecraft:ageable_set_baby",
                "info": ""
            }
        ]
    },
    {
        "name": "xp_bottle",
        "info": "附魔之瓶"
    },
    {
        "name": "xp_orb",
        "info": "经验球"
    },
    {
        "name": "zoglin",
        "info": "僵尸疣猪兽",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_transformed",
                "info": ""
            },
            {
                "name": "minecraft:as_adult",
                "info": ""
            },
            {
                "name": "minecraft:as_baby",
                "info": ""
            }
        ]
    },
    {
        "name": "zombie",
        "info": "僵尸",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:as_adult",
                "info": ""
            },
            {
                "name": "minecraft:as_baby",
                "info": ""
            },
            {
                "name": "minecraft:start_transforming",
                "info": ""
            },
            {
                "name": "minecraft:stop_transforming",
                "info": ""
            },
            {
                "name": "minecraft:convert_to_drowned",
                "info": ""
            }
        ]
    },
    {
        "name": "zombie_horse",
        "info": "僵尸马",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:ageable_grow_up",
                "info": ""
            }
        ]
    },
    {
        "name": "zombie_pigman",
        "info": "僵尸猪灵",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_transformed",
                "info": ""
            },
            {
                "name": "minecraft:become_angry",
                "info": ""
            },
            {
                "name": "minecraft:on_calm",
                "info": ""
            },
            {
                "name": "minecraft:spawn_as_strider_jockey",
                "info": ""
            }
        ]
    },
    {
        "name": "zombie_villager",
        "info": "僵尸村民",
        "event": [
            {
                "template": {
                    "input": {
                        "text": "{name} "
                    }
                }
            },
            {
                "name": "minecraft:entity_spawned",
                "info": ""
            },
            {
                "name": "minecraft:entity_transformed",
                "info": ""
            },
            {
                "name": "minecraft:become_cleric",
                "info": ""
            },
            {
                "name": "villager_converted",
                "info": ""
            },
            {
                "name": "from_village",
                "info": ""
            }
        ]
    }
]