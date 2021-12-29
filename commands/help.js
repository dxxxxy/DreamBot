//h
const utils = require("../library/utils")
const colors = require("../library/colors")

exports.run = (client, message, args) => {
    message.channel.send({
        embeds: [utils.Help()]
    })
}