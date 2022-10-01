export const copy = app => function() {
    const value = app.config.$input.value
    navigator.clipboard.writeText(value).then(() => {
        app.event.emit("app.input.copy", value)
    }).catch(console.error)
}
