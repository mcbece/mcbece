import option from "./option.js"
import userData from "./userData.js"
import pwa from "./pwa.js"
import spriteRenderer from "./spriteRenderer.js"
import mediaRenderer from "./mediaRenderer.js"
import colorReplacer from "./colorReplacer.js"

export default {
    storage_extend: {
        extend: [ "storage:option", "storage:userData" ],
        plugin: [
            {
                id: "option",
                creater: option
            },
            {
                id: "userData",
                creater: userData
            }
        ]
    },
    pwa: {
        plugin: [
            {
                id: "pwa",
                creater: pwa
            }
        ]
    },
    spriteRenderer: {
        plugin: [
            {
                id: "spriteRenderer",
                creater: spriteRenderer
            }
        ]
    },
    mediaRenderer: {
        plugin: [
            {
                id: "mediaRenderer",
                creater: mediaRenderer
            }
        ]
    },
    colorReplacer: {
        plugin: [
            {
                id: "colorReplacer",
                creater: colorReplacer
            }
        ]
    }
}
