export default async function(core, user) {
    core.config.add({
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
        maxLength: core.config.get("userData.history.maxLength")
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
