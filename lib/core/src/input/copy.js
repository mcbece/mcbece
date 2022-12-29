export const copy = core => function() {
    const value = core.config.$input.value
    navigator.clipboard.writeText(value).then(() => {
        core.event.emit("core.input.copy", value)
    }).catch(console.error)
}
