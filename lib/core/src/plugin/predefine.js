import { WebOption } from "../../lib/WebOption.class.js"

import optionCreater from "./plugins/option.js"
import userDataCreater from "./plugins/userData.js"
import pwaCreater from "./plugins/pwa.js"
import spriteCreater from "./plugins/sprite.js"

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
    sprite: {
        plugin: {
            sprite: spriteCreater
        }
    }
}
