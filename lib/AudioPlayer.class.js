import { each } from "./util/index.js"

export class AudioPlayer {
    constructor(srcArr, { loop = false } = {}) {
        this._audios = srcArr.map(src => {
            const url = typeof src === "object" ? src.url : src
            const { volume = 1 } = typeof src === "object" ? src : {}
            const audio = new Audio(url)
            audio.preload = "metadata"
            audio.controls = true
            audio.volume = volume
            audio.loop = loop
            audio.style.width = "100%"
            audio.addEventListener("play", () => {
                if (this.playing && this.playing !== audio) this.stop()
                this.playing = audio
            })
            return audio
        })
    }
    start(index = 0) {
        this._audios[index].play()
    }
    stop() {
        this.playing.pause()
        this.playing.currentTime = 0
    }
    get audios() {
        const audios = new DocumentFragment()
        each(this._audios, audio => audios.appendChild(audio))
        return audios
    }
}
