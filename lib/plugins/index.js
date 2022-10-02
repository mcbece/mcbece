import { WebOption } from "@/core/lib/WebOption.class.js"

import option from "./option.js"
import userData from "./userData.js"
import pwa from "./pwa.js"
import spriteRenderer from "./spriteRenderer.js"
import mediaRenderer from "./mediaRenderer.js"
import colorReplacer from "./colorReplacer.js"

export default {
    allStorage: {
        conflicts: [ "option:option", "userData:userData" ],
        plugin: [
            {
                id: "option",
                creater: option
            },
            {
                id: "userData",
                creater: userData
            }
        ],
        async initFun({ "allStorage:option": option, "allStorage:userData": userData }) {
            await WebOption.initAll(option, userData)
        }
    },
    option: {
        conflicts: [ "userData:userData", "allStorage:option", "allStorage:userData" ],
        plugin: [
            {
                id: "option",
                creater: option
            }
        ],
        async initFun({ "option:option": option }) {
            await WebOption.initAll(option)
        }
    },
    userData: {
        conflicts: [ "option:option", "allStorage:option", "allStorage:userData" ],
        plugin: [
            {
                id: "userData",
                creater: userData
            }
        ],
        async initFun({ "userData:userData": userData }) {
            await WebOption.initAll(userData)
        }
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
