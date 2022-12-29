export class KeyboardContral {
    constructor(core) {
        this.__core = core
        this.$list = core.config.$list
    }
    active = 0
    get maxLen() {
        return this.__core.list.__vs.data.length - 1
    }
    get $item() { 
        return this.$list.querySelector(`[id="${this.active}"]`)
    }
    reload() {
        this.__core.list.__vs.data[this._active].active = false
        this.__core.list.__vs.data[this.active].active = true
        this.__core.list.reload()
        const $item = this.$item
        if ($item) $item.scrollIntoView({
            behavior: "smooth",
            block: "center"
        })
    }
    up() {
        this._active = this.active
        this.active--
        if (this.active < 0) this.active = 0
        this.reload()
    }
    down() {
        this._active = this.active
        this.active++
        if (this.active > this.maxLen) this.active = this.maxLen
        this.reload()
    }
    click() {
        const $item = this.$item
        if ($item) $item.click()
    }
    clear() {
        this.active = 0
        this._active = 0
    }
}
