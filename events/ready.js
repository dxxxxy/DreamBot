const mongoose = require("mongoose")
const package = require("../package.json")


module.exports = async(client) => {
    console.log(`Client ${client.user.tag}`)

    //database connection
    mongoose.connect(process.env.DATABASE)
    mongoose.connection.on("connected", () => console.log("Mongoose connection successfully opened!"))
    mongoose.connection.on("err", err => console.error(`Mongoose connection error:\n${err.stack}`))
    mongoose.connection.on("disconnected", () => console.log("Mongoose connection disconnected"))

    //status
    client.user.setActivity(`over ${client.users.cache.size}u | ${client.guilds.cache.size}g | v${package.version}`, { type: "WATCHING" }) //call first time immediately
    setInterval(() => { client.user.setActivity(`over ${client.users.cache.size}u | ${client.guilds.cache.size}g | v${package.version}`, { type: "WATCHING" }) }, 30000) //then update it every 30s
}