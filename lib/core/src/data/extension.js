import { each } from "@/util/index.js"

export const loadExtensionPacks = app => function() {
    const { LANG, BRANCH } = app
    if (app.plugin.has(/^(.+):userData$/)) {
        const store = app.plugin.get(/^(.+):userData$/)
        const packs = store.getItemVal("extensions")
        each(packs, pack => {
            if (!pack.__enable) return
            each(pack.content ?? {}, (branches, lang) => {
                each(branches, (content, branch) => {
                    if (
                        (lang === LANG || lang === "*") &&
                        (branch === BRANCH || branch === "*")
                    ) this.set(LANG, content)
                })
            })
        })
    }
}
