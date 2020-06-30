const utils = require("../library/utils.js")
const colors = require("../library/colors.js")

exports.run = async(client, message, args) => {
    message.channel.send(utils.BasicEmbed("Invite", colors.Cyan, "**Invite Link:** https://discord.com/api/oauth2/authorize?client_id=717535883552751647&permissions=8&scope=bot"))
}