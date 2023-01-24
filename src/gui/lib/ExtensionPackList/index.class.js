import dialogs from "../../dialogs.js"
import { stringToNode, asyncEach, importDefault, each } from "@/util/index.js"
import { snackbar, confirm } from "@/util/mdui.js"
import { VirtualList } from "../VirtualList.class.js"
import { DetailDialog } from "./DetailDialog.class.js"
import { InputDialog } from "./InputDialog.class.js"
import { Updater } from "./Updater.class.js"

const ID = "extensions"
const ITEM_HEIGHT = 78
const mainDialog = dialogs[ID]

export class ExtensionPackList extends VirtualList {
    constructor($list) {
        super({
            id: ID,
            $list,
            renderer: items => {
                return items.map(({ cont: item, i }) => {
                    const node = stringToNode(`
                        <div class="mdui-list-item mdui-ripple" id=${i} style="height: ${ITEM_HEIGHT}px;">
                            <div class="mdui-list-item-content">
                                <div class="mdui-list-item-title">${ item.name ?? "未命名" }${ item.__internal ? "（内部）" : "" }${ item.__error ? '<span class="mdui-text-color-red">（错误）</span>' : "" }</div>
                                <div class="mdui-list-item-text mdui-list-item-two-line">By ${ item.author ?? "佚名" } - v${ item.version.join(".") }<br />${ item.description ?? "" }</div>
                            </div>
                        </div>
                    `)
                    if (item.__enable) node.classList.add("mdui-list-item-active")
                    node.addEventListener("click", () => {
                        mainDialog.close()
                        const detailDialog = new DetailDialog(item, this)
                    })
                    return node
                })
            },
            itemHeight: ITEM_HEIGHT
        })
        this.updater = new Updater(this)
        this.dialog = mainDialog
        
        core.event.once("core.data.init", async () => {
            const store = core._userData._getItem(this.id)
            
            // Set internal packs from `core.config.data.extensionPacks`
            const internalPacks = core.config.get("data.extensionPacks")
            if (internalPacks?.length) {
                await asyncEach(internalPacks, async pack => {
                    let packData
                    if (typeof pack === "string") packData = await importDefault(pack)
                    else packData = pack
                    packData.__internal = true
                    if (store.hasByIndex(packData.id)) this.updater.update({ newData: packData, message: null, done: false })
                    else store.addData(packData)
                })
            }
            
            // Init pack content
            await asyncEach(store.data, async pack => {
                if (!pack.__internal) {
                    const {
                        __enable: enable,
                        __file: file,
                        __url: url
                    } = pack
                    const data = await InputDialog.initData({ file, url }, pack)
                    store.setByIndex(pack.id, data)
                }
            })
            
            await core._userData.done()
        })
    }
    new() {
        mainDialog.close()
        const inputDialog = new InputDialog({
            title: "添加",
            onConfirmWithData: data => {
                const [ state, args ] = this.updater.check(data)
                if (state === "unmatch") {
                    this.add(data)
                    inputDialog.close().destroy({ thenOpen: mainDialog })
                } else {
                    const { oldData } = args
                    inputDialog.alert(`扩展包识别信息（id）与「${oldData.name}」冲突`)
                }
            },
            dialogOpenOnCancel: mainDialog
        })
    }
    reload() {
        this.load()
        core.event.emit("core.reoption")
    }
    add(data) {
        core._userData.setItemVal(this.id, data).done().then(() => snackbar("添加成功"))
        this.reload()
    }
    clear() {
        mainDialog.close()
        confirm({
            message: "确认删除全部第三方扩展包并禁用全部内部扩展包？",
            onConfirm: () => {
                const store = core._userData._getItem(this.id)
                each(store.data, pack => {
                    if (!pack.__internal) store.delData(pack)
                    else pack.__enable = false
                })
                core._userData.done().then(() => snackbar("已全部删除"))
                mainDialog.open()
                this.reload()
            },
            onCancel: () => {
                mainDialog.open()
            }
        })
    }
}
