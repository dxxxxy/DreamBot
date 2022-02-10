//p
const utils = require("../library/utils")
const Register = require("../models/register")
const { get } = require("axios").default

exports.run = async(client, message, args) => {
    let minecraftID

    if (!args[0]) {
        //if no args get uuid from database
        await Register.findOne({ discordID: message.author.id }, async(err, res) => {
            if (!res) return message.channel.send({ embeds: [utils.Register()] })
            if (err) return message.channel.send({ embeds: [utils.Error(err)] })
            minecraftID = await res.minecraftID
        }).clone()
    } else {
        //else get uuid from name
        minecraftID = await (await get(`https://api.minetools.eu/uuid/${args[0]}`)).data.id
    }

    if (!minecraftID) return message.channel.send({ embeds: [utils.Error("This IGN could not be resolved")] })

    //get profile
    let profiles = await (await get(`https://api.hypixel.net/skyblock/profiles?key=${process.env.APIKEY}&uuid=${minecraftID}`)).data.profiles

    if (profiles == null) return message.channel.send({ embeds: [utils.Error("No profiles found")] });

    //get profile info
    let profile = await (await get(`https://api.hypixel.net/skyblock/profile?key=${process.env.APIKEY}&profile=${utils.getLatestProfile(profiles, minecraftID)[0].profile_id}`)).data.profile

    //get user name from uuid or from query
    let name = args[0] ? args[0] : await (await get(`https://api.minetools.eu/uuid/${minecraftID}`)).data.name

    //get user data from profile
    let user = profile.members[minecraftID]

    //send res
    message.channel.send({
        //cant get cute_name from profile because hypixel is dumb so i have to get the second element of the array and iterate again sigh -> utils.getLatestProfile(profiles, minecraftID)[1]
        embeds: [utils.Pets(name, utils.getLatestProfile(profiles, minecraftID)[1], `https://visage.surgeplay.com/full/${minecraftID}.png`, user.pets, user.stats)]
    })
}