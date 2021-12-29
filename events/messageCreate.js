const prefix = process.env.PREFIX
const utils = require("../library/utils")
const colors = require("../library/colors")
const client = require("../app")
var apiL = 0

setInterval(() => {
    apiL = 0
}, 60000)

module.exports = async(client, message, args, member) => {
    if (!message.content.startsWith(prefix) || message.author.bot || !message.guild) return
    args = message.content.slice(prefix.length).split(/ +/)
    if (!args[0]) return
    const command = args.shift().toLowerCase() //command
    let cmd = client.commands.get(command) //function
    if (cmd[0]) cmd = cmd[1]
    if (message.content.startsWith("d!skills") || message.content.startsWith("d!slayers") || message.content.startsWith("d!pets") || message.content.startsWith("d!info")) apiL++
        if (apiL >= 120) return message.channel.send(utils.BasicEmbed("Error", colors.Red, "The API has been used 120 times in the last minute. Please wait a minute"))
    if (!cmd) return
    console.log(`Author "${message.author.username}" | Command "${message}"`)
    cmd.run(client, message, args, member)
}