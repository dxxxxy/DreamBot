//h
const utils = require("../library/utils")

exports.run = (client, message, args) => {
    message.channel.send({
        embeds: [utils.Help()]
    })
}