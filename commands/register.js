//r
const utils = require("../library/utils.js")
const colors = require("../library/colors.js")
const { get } = require("axios").default
const Register = require("../models/register.js")

exports.run = async(client, message, args) => {
    if (!args[0]) return message.channel.send(utils.BasicEmbed("Warning", colors.Yellow, "No IGN provided"))
    uuid = await fetch(`https://api.minetools.eu/uuid/${args[0]}`)
        .then(res => res.json())
        .then(json => json.id)
        .catch(err => {
            return message.channel.send(utils.BasicEmbed("Error", colors.Red, err))
        })
    if (!uuid) return message.channel.send(utils.BasicEmbed("Error", colors.Red, "The name that you entered does not exist"))
    Register.findOne({
        discordID: message.author.id
    }, (err, res) => {
        if (err) message.channel.send(utils.BasicEmbed("Error", colors.Red, err))
        if (!res) {
            const newRegister = new Register({
                discordID: message.author.id,
                minecraftID: uuid,
            })
            message.channel.send(utils.BasicEmbed("Success", colors.Green, "You have been registered!"))
            return newRegister.save()
        }
        message.channel.send(utils.BasicEmbed("Warning", colors.Yellow, "You're already registered!"))
    })
}