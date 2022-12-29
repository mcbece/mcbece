import { stringToNode } from "@/util/index.js"
import { AudioPlayer } from "@/lib/AudioPlayer.class.js"

export default async function(core) {
    
    // Usage: renderer.get("media", { only: "image" })
    
    core.config.add({
        list: {
            renderer: {
                media: {
                    handlerFun(item, { only }) {
                        const media = item.media
                        if (media && (!only || media.type === only)) return media
                    },
                    callbackFun({ type, src }) {
                        if (type === "image") return stringToNode(`<img src="${src}" />`)
                        else if (type === "audio") {
                            const srcArr = Array.isArray(src) ? src : [src]
                            return (new AudioPlayer(srcArr)).audios
                        } else return stringToNode(`<span>${src}</span>`)
                    }
                }
            }
        }
    })
}
