import { each } from "@util/index.js"
import { KeyboardContral } from "../../lib/KeyboardContral.class.js"

export function initKeyboard() {
    const contral =  new KeyboardContral(this)
    const { $input } = this.config
    
    $input.addEventListener("keydown", e => {
        if (isKey("Enter", "Tab")) {
            if (this.state === "load") contral.click()
            else if (this.state === "finish") this.input.copy()
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
