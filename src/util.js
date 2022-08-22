import { fileURLToPath } from "url"
import nodePath from "path"

export function getFilename(importMeta) {
    return fileURLToPath(importMeta.url)
}

export function getDirname(importMeta) {
    return nodePath.dirname(getFilename(importMeta))
}

export function resolvePath(path, importMeta) {
    return nodePath.resolve(getDirname(importMeta), path)
}
