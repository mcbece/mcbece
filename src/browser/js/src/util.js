import { testRegExp } from "../core/util/common.js"

export function getDate() {
    const _date = new Date()
    const month = _date.getMonth() + 1
    const date = _date.getDate()
    return [
        _date.getFullYear(),
        (month < 10) ? ("0" + month) : month,
        (date < 10) ? ("0" + date) : date
    ].join("-")
}

export function isAprilFools() {
    return /-04-01$/.test(getDate())
}

export function isChrome() {
    return testRegExp("!/Chrome/", navigator.userAgent)
}

export function hasLoved(cont) {
    return app._userData._getItem("love").hasData(cont)
}
