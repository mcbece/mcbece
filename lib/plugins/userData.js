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
        callback(...args) {
            console.debug("userData: history -> add", args[1], "to", args[0])
        },
        storageModel: true,
        maxLength: app.config.get("userData.history.maxLength")
    })
    .addItem({
        name: "love",
        callback(...args) {
            console.debug("userData: love -> add", args[1], "to", args[0])
        },
        storageModel: true
    })
}
