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
