import { each } from "@/util/index.js"
import { KeyboardContral } from "../../lib/KeyboardContral.class.js"

export const initKeyboardContral = core => function() {
    const contral =  new KeyboardContral(core)
    const { $input } = core.config
    
    $input.addEventListener("keydown", e => {
        if (isKey("Enter", "Tab")) {
            if (core.state === "load") contral.click()
            else if (core.state === "finish") this.copy()
        } else if (isKey("ArrowUp")) {
            contral.up()
        } else if (isKey("ArrowDown")) {
            contral.down()
        }
        
        function isKey(...keys) {
            const output = []
            each(keys, key => output.push(e.key === key))
            return output.includes(true)
        }
    })
    
    return contral
}
