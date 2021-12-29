//i
const utils = require("../library/utils.js")
const colors = require("../library/colors")
const Register = require("../models/register")
const data = require("../data.json")

const fetch = (url) =>
    import ("node-fetch").then(({ default: fetch }) => fetch(url))
    // const talkedRecently = new Set()

exports.run = (client, message, args) => {
    var lastSaves = [],
        profileID = [],
        profileName = []
        // if (talkedRecently.has(message.author.id)) return message.channel.send(utils.BasicEmbed("Cooldown", colors.Yellow, "Please wait 1 minute before using this command again!"))
        // talkedRecently.add(message.author.id)
        // setTimeout(() => {
        //     talkedRecently.delete(message.author.id)
        // }, utils.CD)
    if (!args[0]) {
        //search database using discord id
        Register.findOne({
            discordID: message.author.id
        }, (err, res) => {
            if (!res) return message.channel.send({ embeds: [utils.Error("Please register using d!register <IGN>")] })
            if (err) return message.channel.send({ embeds: [utils.Error(err)] })
                //fetch all the profiles in an array
            fetch(`https://api.hypixel.net/Skyblock/profiles?key=${process.env.APIKEY}&uuid=${res.minecraftID}`)
                .then(res2 => res2.json())
                .then(profileArr => {
                    //cycle through array while saving all lastSaves
                    Object.keys(profileArr.profiles).forEach(profile => {
                            lastSaves.push(profileArr.profiles[profile].members[res.minecraftID].last_save)
                            profileID.push(profileArr.profiles[profile].profile_id)
                            profileName.push(profileArr.profiles[profile].cute_name)
                        })
                        //get last updated array through index
                    currentProfile = profileID[lastSaves.indexOf(Math.max(...lastSaves))]

                    //get the profile info
                    fetch(`https://api.hypixel.net/skyblock/profile?key=${process.env.APIKEY}&profile=${currentProfile}`)
                        .then(res3 => res3.json())
                        .then(findProfile => {
                            fetch(`https://api.minetools.eu/uuid/${res.minecraftID}`)
                                .then(res4 => res4.json())
                                .then(findName => {
                                    let user = findProfile.profile.members[res.minecraftID]
                                    message.channel.send({
                                        embeds: [utils.Info(findName.name, profileName[lastSaves.indexOf(Math.max(...lastSaves))], `https://visage.surgeplay.com/full/${res.minecraftID}.png`, !user.fairy_souls_collected ? `**0 / ${data.fairySouls}**` : `**${user.fairy_souls_collected} / ${data.fairySouls}**`, user.coin_purse.toFixed(1), !findProfile.profile.banking ? "API disabled" : `**${utils.currencyFormat(findProfile.profile.banking.balance)}** coins`)]
                                    })
                                })
                        })
                })
        })
    } else {
        fetch(`https://api.minetools.eu/uuid/${args[0]}`)
            .then(res => res.json())
            .then(findUUID => {
                if (!findUUID.id) return message.channel.send({ embeds: [utils.Error("This IGN could not be resolved")] })
                fetch(`https://api.hypixel.net/Skyblock/profiles?key=${process.env.APIKEY}&uuid=${findUUID.id}`)
                    .then(res2 => res2.json())
                    .then(profileArr => {
                        //cycle through array while saving all lastSaves
                        Object.keys(profileArr.profiles).forEach(profile => {
                                lastSaves.push(profileArr.profiles[profile].members[findUUID.id].last_save)
                                profileID.push(profileArr.profiles[profile].profile_id)
                                profileName.push(profileArr.profiles[profile].cute_name)
                            })
                            //get last updated array through index
                        currentProfile = profileID[lastSaves.indexOf(Math.max(...lastSaves))]

                        //get the profile info
                        fetch(`https://api.hypixel.net/skyblock/profile?key=${process.env.APIKEY}&profile=${currentProfile}`)
                            .then(res3 => res3.json())
                            .then(findProfile => {
                                fetch(`https://api.minetools.eu/uuid/${findUUID.id}`)
                                    .then(res4 => res4.json())
                                    .then(findName => {
                                        let user = findProfile.profile.members[findUUID.id]
                                        message.channel.send({
                                            embeds: [utils.Info(findName.name, profileName[lastSaves.indexOf(Math.max(...lastSaves))], `https://visage.surgeplay.com/full/${findUUID.id}.png`, !user.fairy_souls_collected ? "**0 / 228**" : `**${user.fairy_souls_collected} / 228**`, (user.coin_purse).toFixed(1), !findProfile.profile.banking ? "API disabled" : `**${utils.currencyFormat(findProfile.profile.banking.balance)}** coins`)]
                                        })
                                    })
                            })
                    })
            })

    }
}