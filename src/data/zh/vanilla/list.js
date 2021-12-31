let entity = require("./list/entity.json")
let block = require("./list/block.json")
let item = require("./list/item.json")
let particle_emitter = require("./list/particle_emitter.json")
let sound = require("./list/sound.json")
let music = require("./list/music.json")
let summonable_entity = require("./list/summonable_entity.json")
let animation = require("./list/animation.json")
let effect = require("./list/effect.json")
let enchantment = require("./list/enchantment.json")
let fog = require("./list/fog.json")
let entity_family = require("./list/entity_family.json")
let location = require("./list/location.json")


let command = require("./list/command.json")
let commands = require("./list/commands.json")
let selector = require("./list/selector.json")
let coordinate = require("./list/coordinate.json")
let rotation = require("./list/rotation.json")
let difficulty = require("./list/difficulty.json")
let boolean = require("./list/boolean.json")
let ability = require("./list/ability.json")
// let gamemode = require("./list/gamemode.json")
// let gamerule = require("./list/gamerule.json")



module.exports = {
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
    entity,
    block,
    item,
    particle_emitter,
    sound,
    music,
    summonable_entity,
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
    
    
    test: [
        {
            
        },
        {
            "name": "test"
        }
    ]
}