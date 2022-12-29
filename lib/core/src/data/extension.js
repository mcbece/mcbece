import { each } from "@/util/index.js"

export const loadExtensionPacks = core => function() {
    const packs = core.plugin.get(/^(.+):userData$/).getItemVal("extensions")
    each(packs, pack => {
        if (!pack.__enable) return
        each(pack.content ?? {}, (branches, lang) => {
            each(branches, (content, branch) => {
                if (
                    (lang === this.lang || lang === "*") &&
                    (branch === this.branch || branch === "*")
                ) this.set(content)
            })
        })
    })
}
