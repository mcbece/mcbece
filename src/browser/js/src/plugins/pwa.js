import { PWAManager } from "../../lib/PWAManager.class.js"
import { importDefault } from "../../_core/util/common.js"

export default async function (app) {
    try {
        const env = await importDefault("/api/processEnv.NODE_ENV")
        if (env === "production") return new __PWA__(app, "/service-worker.js")
    } catch (err) {
        console.warn("Could not find `NODE_ENV` in your environment.")
    }
}

class __PWA__ extends PWAManager {
    constructor(app, url, option) {
        super(url, option, {
            ready: () => {
                console.debug("SW: on ready")
            },
            registered: () => {
                console.debug("SW: on registered")
            },
            updated: () => {
                console.debug("SW: on updated")
                this._haveNewVersion()
            },
            updatefound: () => {
                console.debug("SW: on updatefound")
            }
        })
        this.__app = app
    }
    install() {
        if (this.installReady) this.promptInstall()
    }
    update() {
        if (this.updateReady) {
            _page.dialogs.pwa.close()
            mdui.confirm(
                "确定更新吗，这将会<strong>刷新页面</strong>",
                () => this.forceUpdate()
            )
        }
    }
    check() {
        this.checkUpdate().then(result => {
            if (!result) {
                if (this.updateReady) this._haveNewVersion()
                else snackbar("已是最新版")
            }
        })
    }
    _haveNewVersion() {
        snackbar("检测到新版本，立即更新？", {
            buttonText: "yes",
            onButtonClick: () => this.update()
        })
    }
}

function snackbar(message, option) {
    mdui.snackbar({
        message,
        position: window._LITE_MODELL ? "bottom" : "left-top",
        timeout: 2000,
        ...option
    })
}
