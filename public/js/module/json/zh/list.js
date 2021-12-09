import { json as command } from "./list/command.json.js"
import { json as location } from "./list/location.json.js"
import { json as commands } from "./list/commands.json.js"
import { json as selector } from "./list/selector.json.js"
import { json as coordinate } from "./list/coordinate.json.js"
import { json as rotation } from "./list/rotation.json.js"
import { json as effect } from "./list/effect.json.js"
import { json as enchantment } from "./list/enchantment.json.js"
// import { json as entity } from "./list/entity.json.js"
// import { json as summonable_entity } from "./list/summonable_entity.json.js"
import { json as difficulty } from "./list/difficulty.json.js"
import { json as block } from "./list/block.json.js"
import { json as ability } from "./list/ability.json.js"
import { json as boolean } from "./list/boolean.json.js"
// import { json as fog } from "./list/fog.json.js"
import { json as gamemode } from "./list/gamemode.json.js"
// import { json as gamerule } from "./list/gamerule.json.js"
// import { json as animation } from "./list/animation.json.js"
import { json as item } from "./list/item.json.js"

// entity[0].summonable = summonable_entity

export let list = {
    next: [
        {
            "template": {
                "input": {
                    "replace": "none",
                    "text": " "
                }
            }
        },
        {
            "name": "",
            "info": "下一项"
        }
    ],
    command: command,
    location: location,
    commands: commands,
    selector: selector,
    coordinate: coordinate,
    rotation: rotation,
    effect: effect,
    enchantment: enchantment,
    // entity: entity,
    difficulty: difficulty,
    block: block,
    boolean: boolean,
    ability: ability,
    // fog: fog,
    gamemode: gamemode,
    // gamerule: gamerule,
    // animation: animation,
    item: item,
    test: [
        {
            
        },
        {
            "name": "test"
        }
    ]
}