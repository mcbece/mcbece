import { WebOption } from "../../lib/WebOption.class.js"

import optionCreater from "./plugins/option.js"
import userDataCreater from "./plugins/userData.js"
import pwaCreater from "./plugins/pwa.js"
import spriteRenderer from "./plugins/spriteRenderer.js"
import mediaRenderer from "./plugins/mediaRenderer.js"
import colorReplacer from "./plugins/colorReplacer.js"

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
