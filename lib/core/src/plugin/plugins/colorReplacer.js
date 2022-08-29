export default async function(app) {
    
    // Usage: {Color: red}
    
    app.config.set({
        list: {
            replacer: {
                "Color:": {
                    directReturn(color) {
                        return `<span style="display: inline-block; width: 10px; height: 10px; background-color: ${color}; margin: 0 4px; border: 1px solid black;"></span>`
                    },
                    indirectReturn: ""
                }
            }
        }
    })
}