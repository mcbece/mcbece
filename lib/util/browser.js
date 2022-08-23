import { testRegExp } from "./index.js"

export function isChrome() {
    return testRegExp("!/Chrome/", navigator.userAgent)
}
