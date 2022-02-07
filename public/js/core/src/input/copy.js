export function copy() {
    const { $input, _components: { snackbar } } = this.config
    $input.select()
    $input.setSelectionRange(0, $input.value.length)
    document.execCommand("copy")
    snackbar("已复制")
}