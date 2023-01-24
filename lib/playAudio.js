import { arrayClassify, each, objectMap } from "./util/index.js"
import { dialog } from "./util/mdui.js"
import { AudioPlayer } from "./AudioPlayer.class.js"

export function playAudio_v1(srcArr) {
    const player = new AudioPlayer(srcArr)
    const $dialog = dialog({
        title: "音频预览",
        content: player.audios,
        buttons: [
            {
                text: "合并",
                onClick: () => playAudio_v2(srcArr)
            },
            {
                text: "关闭"
            }
        ],
        onOpen() {
            player.start()
        },
        onClose() {
            player.stop()
        }
    })
}

export function playAudio_v2(srcArr) {
    const urlArr = srcArr.map(src => typeof src === "object" ? src.url : src)
    const classified = arrayClassify(urlArr, item => `audio/${item.split(".").at(-1)}`)
    Promise.all(
        Object.values(
            objectMap(classified, (urls, type) => {
                return {
                    value: Promise.all(
                        urls.map(url => fetch(url).then(e => e.blob()))
                    ).then(blobs => {
                        const blob = new Blob(blobs, { type })
                        return URL.createObjectURL(blob)
                    })
                }
            })
        )
    ).then(blobURLs => {
        const player = new AudioPlayer(blobURLs)
        const $dialog = dialog({
            title: "音频预览",
            content: player.audios,
            buttons: [
                {
                    text: "分离",
                    onClick: () => playAudio_v1(srcArr)
                },
                {
                    text: "关闭"
                }
            ],
            onOpen() {
                player.start()
            },
            onClose() {
                player.stop()
            }
        })
    })
}
