import { each } from "@/util/index.js"
import { KeyboardContral } from "../../lib/KeyboardContral.class.js"

export const initKeyboard = app => function() {
    const contral =  new KeyboardContral(app)
    const { $input } = app.config
    
    $input.addEventListener("keydown", e => {
        if (isKey("Enter", "Tab")) {
            if (app.state === "load") contral.click()
            else if (app.state === "finish") app.input.copy()  // 由于 index 里 this 不能正常绑定，所以干脆直接用 app.input
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
