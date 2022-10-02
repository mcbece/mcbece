import { WebOption } from "@/core/lib/WebOption.class.js"

import option from "./option.js"
import userData from "./userData.js"

export default {
    storage: {
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
        async initFun({ "storage:option": option, "storage:userData": userData }) {
            await WebOption.initAll(option, userData)
        }
    },
}
