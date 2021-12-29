//r
const utils = require("../library/utils")
const { get } = require("axios").default
const Register = require("../models/register")

exports.run = async(client, message, args) => {
    if (!args[0]) return message.channel.send({
        embeds: [utils.Error("No IGN provided")]
    })

    uuid = await (await get(`https://api.minetools.eu/uuid/${args[0]}`)).data.id
    if (!uuid) return message.channel.send({
        embeds: [utils.Error("IGN does not exist")]
    })

    Register.findOne({ discordID: message.author.id }, (err, res) => {
        if (err) message.channel.send({
            embeds: [utils.Error(err)]
        })
        if (!res) {
            const newRegister = new Register({
                discordID: message.author.id,
                minecraftID: uuid,
            })
            message.channel.send({
                embeds: [utils.Success("You have been registered")]
            })
            return newRegister.save()
        }
        message.channel.send({
            embeds: [utils.Warning("You're already registered")]
        })
    })
}