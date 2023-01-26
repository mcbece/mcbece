import { fileURLToPath } from "node:url"
import nodePath from "node:path"

export function getFilename(importMeta) {
    return fileURLToPath(importMeta.url)
}

export function getDirname(importMeta) {
    return nodePath.dirname(getFilename(importMeta))
}

export function resolvePath(path, importMeta) {
    return nodePath.resolve(getDirname(importMeta), path)
}
