import { stringToNode } from "@util/index.js"

export default async function(app) {
    
    // Usage: renderer.get("media", { only: "image" })
    
    app.config.set({
        list: {
            renderer: {
                media: {
                    handlerFun(item, { only }) {
                        const media = item.media
                        if (media && (!only || media.type === only)) return media
                    },
                    callbackFun({ type, src }) {
                        if (type === "image") return stringToNode(`<img src="${src}" />`)
                        else if (type === "audio") return stringToNode(`<audio src="${src}" controls></audio>`)
                        else return stringToNode(`<span>${src}</span>`)
                    }
                }
            }
        }
    })
}
