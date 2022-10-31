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

export const festivals = {
    ValentinesDay: /-02-14$/.test(getDate()),
    AprilFools: /-04-01$/.test(getDate()),
    Halloween: /-10-31$/.test(getDate()) || /-11-01$/.test(getDate())
}
