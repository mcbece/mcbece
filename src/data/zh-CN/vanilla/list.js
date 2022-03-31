import entity from "./list/entity.json.js"
import block from "./list/block.json.js"
import item from "./list/item.json.js"
import particle_emitter from "./list/particle_emitter.json.js"
import sound from "./list/sound.json.js"
import music from "./list/music.json.js"
import animation from "./list/animation.json.js"
import effect from "./list/effect.json.js"
import enchantment from "./list/enchantment.json.js"
import fog from "./list/fog.json.js"
import entity_family from "./list/entity_family.json.js"
import location from "./list/location.json.js"
import command from "./list/command.json.js"
import commands from "./list/commands.json.js"
import selector from "./list/selector.json.js"
import coordinate from "./list/coordinate.json.js"
import rotation from "./list/rotation.json.js"
import difficulty from "./list/difficulty.json.js"
import boolean from "./list/boolean.json.js"
import ability from "./list/ability.json.js"
// import gamemode from "./list/gamemode.json.js"
// import gamerule from "./list/gamerule.json.js"

export default {
    next: [
        {
            "option": {
                "searchable": false
            },
            "template": {
                "input": {
                    "replace": "none",
                    "text": " "
                }
            },
            "__app_list__": true
        },
        {
            "name": "",
            "info": "下一项"
        }
    ],
    entity,
    block,
    item,
    particle_emitter,
    sound,
    music,
    animation,
    effect,
    enchantment,
    fog,
    entity_family,
    location,
    command,
    commands,
    selector,
    coordinate,
    rotation,
    difficulty,
    boolean,
    ability,
    // gamemode,
    // gamerule,
    
    another1000_1: sound,
    another1000_2: sound,
    another1000_3: sound,
    another1000_4: sound,
    another1000_5: sound,
    another1000_6: sound,
    another1000_7: sound,
    another1000_8: sound,
    another1000_9: sound,
}