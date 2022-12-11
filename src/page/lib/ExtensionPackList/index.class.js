import deepCopy from "fast-copy"
import { stringToNode, asyncEach, importDefault, each } from "@/util/index.js"
import { snackbar, confirm } from "@/util/mdui.js"
import { VirtualList } from "../VirtualList.class.js"
import { DetailDialog } from "./DetailDialog.class.js"
import { InputDialog } from "./InputDialog.class.js"
import { Updater } from "./Updater.class.js"

const ITEM_HEIGHT = 78

export class ExtensionPackList extends VirtualList {
    constructor($list) {
        super({
            id: "extensions",
            $list,
            renderer: items => {
                return items.map(({ cont: item, i }) => {
                    const node = stringToNode(`
                        <div class="mdui-list-item mdui-ripple" id=${i} style="height: ${ITEM_HEIGHT}px;">
                            <div class="mdui-list-item-content">
                                <div class="mdui-list-item-title">${item.name + ( item.__internal ? "（内部）" : "" )}</div>
                                <div class="mdui-list-item-text mdui-list-item-two-line">By ${item.author} - v${item.version.join(".")}<br />${item.description}</div>
                            </div>
                        </div>
                    `)
                    if (item.__enable) node.classList.add("mdui-list-item-active")
                    node.addEventListener("click", () => {
                        const mainDialog = _page.dialogs[this.id]
                        mainDialog.close()
                        const detailDialog = new DetailDialog(item, this)
                    })
                    return node
                })
            },
            itemHeight: ITEM_HEIGHT
        })
        this.updater = new Updater(this)
        
        app.event.once("app.data.init", async () => {
            const store = app._userData._getItem(this.id)
            
            // Set internal packs from `app.config.data.extensionPacks`
            const internalPacks = app.config.get("data.extensionPacks")
            if (internalPacks && internalPacks.length) {
                await asyncEach(internalPacks, async pack => {
                    let packData
                    if (typeof pack === "string") packData = await importDefault(pack)
                    else packData = pack
                    packData.__internal = true
                    if (store.hasByIndex(packData.id)) {
                        const oldData = store.getByIndex(packData.id)
                        packData.__enable = oldData.__enable
                        store.setByIndex(packData.id, packData)
                    } else store.addData(packData)
                })
            }
            
            // Init pack content
            const packs = store.data
            await asyncEach(packs, async pack => {
                if (!pack.__internal) {
                    const { __file: file, __url: url, __enable: enable } = pack
                    const packData = await importDefault(URL.createObjectURL(file))
                    packData.__file = file
                    packData.__url = url
                    packData.__enable = enable
                    store.setByIndex(pack.id, packData)
                }
            })
            
            await app._userData.done()
        })
    }
    new() {
        const mainDialog = _page.dialogs[this.id]
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
        app.event.emit("app.reoption")
    }
    add(data) {
        app._userData.setItemVal(this.id, data).done().then(() => snackbar("添加成功"))
        this.reload()
    }
    remove(data, detailDialog) {
        const mainDialog = _page.dialogs[this.id]
        detailDialog.close()
        confirm({
            message: "确认删除？",
            onConfirm: () => {
                app._userData.deleteStoreData(this.id, data).done().then(() => snackbar("已删除"))  // TODO 可撤回
                this.reload()
                detailDialog.close().destroy({ thenOpen: mainDialog })
            },
            onCancel: () => {
                detailDialog.open()
            }
        })
    }
    clear() {
        const mainDialog = _page.dialogs[this.id]
        mainDialog.close()
        confirm({
            message: "确认删除全部外部扩展包并禁用全部内部扩展包？",
            onConfirm: () => {
                const store = app._userData._getItem(this.id)
                each(store.data, pack => {
                    if (!pack.__internal) store.delData(pack)
                    else pack.__enable = false
                })
                app._userData.done().then(() => snackbar("已全部删除"))
                mainDialog.open()
                this.reload()
            },
            onCancel: () => {
                mainDialog.open()
            }
        })
    }
    toggleEnable(data, detailDialog) {
        const mainDialog = _page.dialogs[this.id]
        detailDialog.close()
        const keyword = data.__enable ? "禁用" : "启用"
        confirm({
            message: `确认${keyword}？`,
            onConfirm: () => {
                const newData = deepCopy(data)
                newData.__enable = !data.__enable
                this.updater.update({ newData, index: newData.id, message: `已${keyword}`, extendEnableState: false })
                this.reload()
                detailDialog.close().destroy({ thenOpen: mainDialog })
            },
            onCancel: () => {
                detailDialog.open()
            }
        })
    }
}

/** Test
const tmpl = i => ({
    id: `io.github.pfis1737.pack_test_${i}`,
    name: `Test - ${i}`,
    author: "PFiS1737",
    version: [
        0,
        0,
        1
    ],
    description: "测试包 - 1",
    homepage: `https://github.com/pfis2737#${i}`,
    bugs: "pfis1737@qq.com",
    content: {}
})

for (let i = 0; i < 100; i++) app._userData.setItemVal("extensions", tmpl(i))
app._userData.done()
*/
