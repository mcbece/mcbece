import { snackbar } from "@/util/mdui.js"
import { DetailDialog } from "./DetailDialog.class.js"
import { InputDialog } from "./InputDialog.class.js"

export class Updater {
    constructor(extensionPackList) {
        this.__extensionPackList = extensionPackList
        this.id = extensionPackList.id
    }
    check(newData, thisData) {
        const store = core._userData._getItem(this.id)
        const index = newData.id
        if (thisData ? thisData.id === index : true && store.hasByIndex(index)) {
            const oldData = thisData
            // ID 匹配
            if (compareVersion(newData, oldData, 0) === 0) {
                if (compareVersion(newData, oldData, 1) === 0) {
                    if (compareVersion(newData, oldData, 2) >= 0) {
                        // OK e.g. v0.1.5 -> v0.1.7
                        return ["ok", {
                            newData,
                            oldData
                        }]
                    } else {
                        // 版本落后 e.g. v0.1.5 -> v0.1.2
                        return ["error", {
                            message: "BACKWARD_VERSION",
                            oldData
                        }]
                    }
                } else if (compareVersion(newData, oldData, 1) > 0) {
                    // OK e.g. v0.1.5 -> v0.2.0
                    return ["ok", {
                        newData,
                        oldData
                    }]
                } else {
                    // 版本落后 e.g. v0.1.5 -> v0.0.8
                    return ["error", {
                        message: "BACKWARD_VERSION",
                        oldData
                    }]
                }
            } else if (compareVersion(newData, oldData, 0) > 0) {
                // 不向后兼容 e.g. v0.1.5 -> v1.0.1
                return ["error", {
                    message: "VERSION_BACKWARD_INCOMPATIBILITY",
                    oldData
                }]
            } else {
                // 版本落后 e.g. v1.0.2 -> v0.2.5
                return ["error", {
                    message: "BACKWARD_VERSION",
                    oldData
                }]
            }
        } else {
            // 未找的匹配项
            return ["unmatch"]
        }
    }
    update({ newData, message = "更新成功", extendEnableState = true, done = true }) {
        const store = core._userData._getItem(this.id)
        const index = newData.id
        const oldData = store.getByIndex(index)
        if (extendEnableState) newData.__enable = oldData.__enable
        store.setByIndex(index, newData)
        if (done) core._userData.done().then(() => {
            if (message) snackbar(message)
        }).catch(console.error)
    }
    // updateURL(newURL) {
        // TODO 支持更新某个扩展包的 URL
    // }
    // checkUpdateURL() {
        // TODO 每次页面加载，自动检查由 url 引入的扩展包是否更新
    // }
    dialog(item, detailDialog) {
        detailDialog.close()
        const inputDialog = new InputDialog({
            updateMode: true,
            title: "更新",
            item,
            onConfirmWithData: data => {
                const [ state, args ] = this.check(data, item)
                if (state === "error") {
                    const { message } = args
                    if (message === "VERSION_BACKWARD_INCOMPATIBILITY") {
                        inputDialog.alert("该版本已不再向后支持，请手动删除以前的版本后重新安装")
                    } else if (message === "BACKWARD_VERSION") {
                        inputDialog.alert("该版本落后于已安装的版本，如需安装，请删除已安装的版本")
                    }
                } else if (state === "unmatch") {
                    inputDialog.alert("扩展包识别信息（id）不一致")
                } else if (state === "ok") {
                    this.update(args)
                    inputDialog.close()
                    const newDetailDialog = new DetailDialog(data, this.__extensionPackList)
                    // 因为上面 newDetailDialog 构建后会自动打开，
                    // 再调用 inputDialog.destroy 和 detailDialog.destroy 会导致 newDetailDialog 被多次打开（同时只能打开一个，其余的请求会排队等待）
                    // inputDialog.destroy({ thenOpen: newDetailDialog.dialog })
                    // detailDialog.destroy({ thenOpen: newDetailDialog.dialog })
                    // 所以使用下面这种写法
                    newDetailDialog.dialog.$element.one("opened.mdui.dialog", () => {
                        inputDialog.destroy()
                        detailDialog.destroy()
                    })
                }
            },
            dialogOpenOnCancel: detailDialog.dialog
        })
    }
}

function compareVersion(newData, oldData, index) {
    return newData.version[index] - oldData.version[index]
}
