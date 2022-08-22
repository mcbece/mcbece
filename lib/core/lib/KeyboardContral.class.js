export class KeyboardContral {
    constructor(app) {
        this.__app = app
        this.$list = app.config.$list
    }
    active = 0
    get maxLen() {
        return this.__app.list.__vs.data.length - 1
    }
    get $item() { 
        return this.$list.querySelector(`[id="${this.active}"]`)
    }
    reload() {
        this.__app.list.__vs.data[this._active].active = false
        this.__app.list.__vs.data[this.active].active = true
        this.__app.list.reload()
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
