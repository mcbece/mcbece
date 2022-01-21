const fs = require("fs")
const axios = require("axios")

module.exports = (url, callback) => {
    let content = fs.readFileSync(url).toString()
    axios.post("https://api.github.com/markdown", {
        text: content
    }).then(({ data }) => callback(data)).catch(console.error)
}