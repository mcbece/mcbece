import { toString, trimString } from "@/util/index.js"

export default async function(core) {
    
    // Usage: renderer.get("sprite", { style: "margin-right: 8px;" })
    
    core.config.add({
        list: {
            renderer: {
                sprite: {
                    handlerFun(item, _, { style }) {
                        const spriteConfig = item.sprite
                        if (spriteConfig) {
                            const img = spriteConfig.img
                            const height = spriteConfig.height ?? spriteConfig.size
                            const width = spriteConfig.width ?? spriteConfig.size
                            const imgWidth = spriteConfig.imgWidth
                            const pos = spriteConfig.pos - 1
                            return {
                                style: compute(height, width, img, imgWidth, pos) + toString(spriteConfig.style, "") + toString(style, ""),
                                className: toString(spriteConfig.className, "")
                            }
                        }
                    },
                    callbackFun({ style, className }) {
                        return `<span class="${className}" style="${style}"></span>`
                    }
                }
            },
            /* replacer: { // 这块大概不会用到的
                "Sprite:": {
                    directReturn(spriteConfig) {
                        const [ height, width, img, imgWidth, pos, className, style ] = spriteConfig.split("|")
                        return `<span class="${toString(className, "")}" style="${compute(height, width, img, imgWidth, pos - 1) + toString(style, "")}"></span>`
                    },
                    indirectReturn: ""
                }
            } */
        }
    })
}

function compute(height, width, img, imgWidth, pos) {
    const tiles = imgWidth / width
    const left = pos % tiles * width
    const top = Math.floor( pos / tiles ) * height
    return trimString(`
        display: inline-block;
        height: ${height}px;
        width: ${width}px;
        background-image: url(${img});
        background-position: -${left}px -${top}px;
    `)
}
