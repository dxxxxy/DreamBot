require("dotenv").config()
const { Client, Collection, Intents } = require("discord.js")
const fs = require("fs")
const intents = new Intents(32767)
const client = new Client({ intents })

client.commands = new Collection()

//bind files to events
fs.readdir("./events/", (err, files) => {
    if (err) return console.error
    files.forEach(file => {
        if (!file.endsWith(".js")) return
        const evt = require(`./events/${file}`)
        let evtName = file.split(".")[0]
        client.on(evtName, evt.bind(null, client))
    })
})

//bind files to commands
fs.readdir("./commands/", async(err, files) => {
    if (err) return console.error
    files.forEach(file => {
        if (!file.endsWith(".js")) return
        let props = require(`./commands/${file}`)
            //check for aliases
        fs.readFile(`./commands/${file}`, "utf-8", (err, data) => {
            //if alias is found, register is aswell as the normal one
            if (!data.split("\n").shift().replaceAll("//", "") == "") {
                client.commands.set(data.split("\n").shift().replaceAll("//", "").trim(), props)
            }
            client.commands.set(file.split(".")[0], [data.split("\n").shift().replaceAll("//", "").trim(), props])
        })
    })
})

client.login(process.env.TOKEN)

exports.module = client