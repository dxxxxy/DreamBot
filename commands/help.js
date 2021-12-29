//h
const utils = require("../library/utils.js")
const colors = require("../library/colors.js")

exports.run = async(client, message, args) => {
    message.channel.send({ embeds: [utils.HelpEmbed()] })
}