import fs from "fs"
import axios from "axios"

export default function(url, callback) {
    const content = fs.readFileSync(url).toString()
    axios.post("https://api.github.com/markdown", {
        text: content
    }).then(({ data }) => callback(data)).catch(console.error)
}
