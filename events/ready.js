const mongoose = require("mongoose")

module.exports = async(client) => {
    mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
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
    client.user.setActivity(`over ${client.users.cache.size - 1} users | v1.3`, { type: "WATCHING" })
    setInterval(() => { client.user.setActivity(`over ${client.users.cache.size-1} users | v1.3`, { type: "WATCHING" }) }, 60000)
}