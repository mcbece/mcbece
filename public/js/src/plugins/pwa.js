import { PWAManager } from "../../lib/PWAManager.class.js"
import { importDefault } from "../../core/util/common.js"

export default async function (app) {
    try {
        const env = await importDefault("/api/processEnv.NODE_ENV")
        if (env === "production") return new __PWA__(app, "/service-worker.js")
    } catch (err) {
        console.warn("Could not find `NODE_ENV` in your environment.", err)
    }
}

class __PWA__ extends PWAManager {
    constructor(app, url, option) {
        super(url, option, {
            ready: () => {
                console.log("SW: on ready")
            },
            registered: () => {
                console.log("SW: on registered")
            },
            updated: () => {
                console.log("SW: on updated")
                this._haveNewVersion()
            },
            updatefound: () => {
                console.log("SW: on updatefound")
            }
        })
        this._app = app
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
                else this._alreadyLatest()
            }
        })
    }
    _haveNewVersion() {
        mdui.snackbar({
            message: "检测到新版本，立即更新？",
            position: this._app._snackbarPosition,
            timeout: 2000,
            buttonText: "yes",
            onButtonClick: () => this.update()
        })
    }
    _alreadyLatest() {
        mdui.snackbar({
            message: "已是最新版",
            position: this._app._snackbarPosition,
            timeout: 2000
        })
    }
}