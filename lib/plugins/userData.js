export default async function(app, user) {
    app.config.add({
        userData: {
            history: {
                maxLength: 10000
            }
        }
    })
    
    return user
    
    .addItem({
        name: "history",
        storageModel: true,
        maxLength: app.config.get("userData.history.maxLength")
        // callback(...args) {
        //     console.debug("userData: history -> add", args[1], "to", args[0])
        // }
    })
    .addItem({
        name: "love",
        storageModel: true
        // callback(...args) {
        //     console.debug("userData: love -> add", args[1], "to", args[0])
        // }
    })
}
