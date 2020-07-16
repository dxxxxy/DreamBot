const prefix = process.env.PREFIX
const utils = require("../library/utils")
const colors = require("../library/colors")
var apiL = 0

setInterval(() => {
    apiL = 0
}, 60000)

module.exports = async(client, message, args, member) => {
    if (!message.content.startsWith(prefix) || message.author.bot || !message.guild) return
    args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()
    const cmd = client.commands.get(command)
    if (message.content.startsWith("d!skills") || message.content.startsWith("d!slayers"), message.content.startsWith("d!pets"), message.content.startsWith("d!info")) apiL++
        if (apiL >= 120) {
            if (message.content.startsWith("d!skills") || message.content.startsWith("d!slayers"), message.content.startsWith("d!pets"), message.content.startsWith("d!info")) {
                return message.channel.send(utils.BasicEmbed("Error", colors.Red, "The API has been used 120 times in the last minute. Please wait a minute"))
            }
        }
    if (!cmd) return
    cmd.run(client, message, args, member)
}