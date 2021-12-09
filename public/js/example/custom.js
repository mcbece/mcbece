/**
 * 建议使用 js 代替 json
 * 格式如下
 * 
 * 此外，该文件中的其他 js 均会被执行
 * 你可以直接调用 page.json.(...) 来修改自己不满意的内容
 * 
 * 不支持使用 Module
 */

customJson = {
    zh: {
        list: {
            player: [
                {
                    template: {
                        input: {
                            text: "{name} "
                        }
                    }
                },
                {
                    name: "PFiS1737",
                    info: "作者名称 :-)"
                }
            ]
            // other list ...
        }
        // grammar: { ... }
    }
    // other languages ...
}

inputEle.classList.remove("minecraft-font")