const utils = require("../library/utils.js")
const colors = require("../library/colors.js")

exports.run = async(client, message, args) => {
    message.channel.send(utils.BasicEmbed("About", colors.Cyan, "**Hypixel API:** https://api.hypixel.net/\n**Skin API:** https://visage.surgeplay.com/\n**Minecraft API:** https://mcapi.ca/ **&** https://api.minetools.eu/"))
}