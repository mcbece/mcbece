import { register } from "/lib/register-service-worker/index.js"
import { sleepAsync } from "../core/util/common.js"

// https://gitee.com/projectxero/idlistweb/blob/master/src/plugins/pwa.js
export class PWAManager {
    constructor(url, option, _on = {}) {
        if (!("serviceWorker" in navigator)) {
            this._noServiceWorker = true
            return
        }
        register(url, {
            registrationOptions: option,
            ready: reg => {
                this.activeWorker = reg.active
                this.ready = true
                _on.ready?.call(this, reg)
            },
            registered: reg => {
                this.registration = reg
                _on.registered?.call(this, reg)
            },
            updated: reg => {
                this.updatedWorker = reg.waiting
                this.updateReady = true
                _on.updated?.call(this, reg)
            },
            updatefound: reg => {
                this.updateFound = reg.installing != null
                _on.updatefound?.call(this, reg)
            },
            error: err => {
                console.error(err)
                _on.error?.call(this, err)
            }
        })
        window.addEventListener("beforeinstallprompt", event => {
            event.preventDefault()
            this.installPrompt = event
            this.installReady = true
        })
        let refreshing = false
        navigator.serviceWorker.addEventListener("controllerchange", () => {
            if (refreshing) return
            refreshing = true
            window.location.reload()
        })
    }
    promptInstall() {
        const installPrompt = this.installPrompt
        this.installPrompt = null
        installPrompt.prompt()
        return installPrompt.userChoice
    }
    forceUpdate() {
        if (this.updateReady) {
            this.updatedWorker.postMessage({ type: "SKIP_WAITING" })
            this.updateReady = false
        }
    }
    checkUpdate() {
        if (this.registration) {
            this.updateFound = false
            return this.registration.update()
                .then(() => sleepAsync(2000))
                .then(() => this.updateFound)
        }
    }
}







/** 
 * 加载页面
 * 
 * ready 事件
 * 
 * registered 事件
 * 
 * 如果有正在 waiting 的 sw
 *     updated 事件
 * 
 * ==========
 * 
 * sw 更新后
 * 
 * 刷新页面 或 reg.update
 * 
 * 如果是刷新页面，依次有 read，registered 事件
 * 
 * updatefound 事件
 * 
 * updated 事件
 * 
 * 重启页面
 * 
 * ready 事件
 * 
 * registered 事件
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */
