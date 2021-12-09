// 并不想写qwq

page.debug = {
    writeToInput (text) {
        if (typeof text === "number") {
            inputEle.value = inputEle.value.split("")[inputEle.value.split("")]
        } else {
            inputEle.value += text
        }
    },
    debug () {
        let log = ""
        window.onerror = (text, url, line, column) => {
            this.debug(`${text}\n    at ${url} : ${line} : ${column}`)
        }
        // TODO: ...
        console.log("Debug finished")
        console.log({log})
    }
}

