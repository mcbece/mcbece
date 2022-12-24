import { each } from "./index.js"
import { snackbar } from "./mdui.js"

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

const DATE = getDate()

const FESTIVALS = {
    ValentinesDay: {
        date: [ "-02-14" ],
        message: "Happy Valentines Day!"
    },
    AprilFools: {
        date: [ "-04-01" ],
        message: "Happy April Fools!"
    },
    Halloween: {
        date: [ "-10-31", "-11-01" ],
        message: "Happy Halloween!"
    }
}

export const festivalMatch = (function() {
    const matches = {}
    each(FESTIVALS, ({ date, message }, festival) => {
        const testResult = date.map(e => (new RegExp(e)).test(DATE)).includes(true)
        matches[festival] = testResult
        if (testResult) snackbar(message)
    })
    return matches
})()
