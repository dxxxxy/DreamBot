const mongoose = require("mongoose")

module.exports = async(client) => {
    mongoose.connect("mongodb+srv://DreamY:alpine@valiant-rg7zq.mongodb.net/Valiant", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    mongoose.connection.on('connected', () => {
        console.log('Mongoose connection successfully opened!')
    })

    mongoose.connection.on('err', err => {
        console.error(`Mongoose connection error: \n ${err.stack}`)
    })

    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose connection disconnected')
    })
    console.log(`Logged in as ${client.user.tag}!`)
    client.user.setActivity(`over ${client.users.cache.size - 1} users | v1.1`, { type: "WATCHING" })
    setInterval(() => { client.user.setActivity(`over ${client.users.cache.size-1} users | v1.1`, { type: "WATCHING" }) }, 60000)
}