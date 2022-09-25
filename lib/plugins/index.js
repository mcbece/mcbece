import { WebOption } from "@/core/lib/WebOption.class.js"

import optionCreater from "./option.js"
import userDataCreater from "./userData.js"
import pwaCreater from "./pwa.js"
import spriteRenderer from "./spriteRenderer.js"
import mediaRenderer from "./mediaRenderer.js"
import colorReplacer from "./colorReplacer.js"

export const predefinePlugin = {
    allStorage: {
        plugin: {
            option: optionCreater,
            userData: userDataCreater
        },
        async init({ option, userData }) {
            await WebOption.initAll(option, userData)
        }
    },
    option: {
        plugin: {
            option: optionCreater
        },
        async init({ option }) {
            await WebOption.initAll(option)
        }
    },
    userData: {
        plugin: {
            userData: userDataCreater
        },
        async init({ userData }) {
            await WebOption.initAll(userData)
        }
    },
    pwa: {
        plugin: {
            pwa: pwaCreater
        }
    },
    spriteRenderer: {
        plugin: { spriteRenderer }
    },
    mediaRenderer: {
        plugin: { mediaRenderer }
    },
    colorReplacer: {
        plugin: { colorReplacer }
    }
}
