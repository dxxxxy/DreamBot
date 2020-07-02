const utils = require("../library/utils.js")
const colors = require("../library/colors.js")
const Register = require("../models/register.js")
const fetch = require("node-fetch")
const talkedRecently = new Set()

const formatNumbers = (n) => {
    let body
    if (n >= 1000000) {
        body = `${(n/1000000).toFixed(1)}m`
    } else if (n >= 1000) {
        body = `${(n/1000).toFixed(1)}k`
    } else {
        body = n
    }
    return body
}

exports.run = async(client, message, args) => {
    var lastSaves = [],
        profileID = [],
        profileName = []
    if (talkedRecently.has(message.author.id)) return message.channel.send(utils.BasicEmbed("Cooldown", colors.Yellow, "Please wait 1 minute before using this command again!"))
    talkedRecently.add(message.author.id);
    setTimeout(() => {
        talkedRecently.delete(message.author.id)
    }, 60000)
    if (!args[0]) {
        Register.findOne({
            userID: message.author.id
        }, async(err, res) => {
            if (!res) return message.channel.send(utils.BasicEmbed("Error", colors.Yellow, "Please register using d!register <IGN>!"))
            if (err) return message.channel.send(utils.BasicEmbed("Error", colors.Red, err))
            profileArr = await fetch(`https://api.hypixel.net/Skyblock/profiles?key=${process.env.APIKEY}&uuid=${res.userUUID}`)
                .then(res2 => res2.json())
                .then(json => json.profiles)
            Object.keys(profileArr).forEach(profile => {
                lastSaves.push(profileArr[profile].members[res.userUUID].last_save)
                profileID.push(profileArr[profile].profile_id)
                profileName.push(profileArr[profile].cute_name)
            })
            currentProfile = profileID[lastSaves.indexOf(Math.max(...lastSaves))]
            findProfile = await fetch(`https://api.hypixel.net/skyblock/profile?key=${process.env.APIKEY}&profile=${currentProfile}`)
                .then(res2 => res2.json())
                .then(json => json.profile)
            findName = await fetch(`https://mcapi.ca/player/profile/${res.userUUID}`)
                .then(res2 => res2.json())
                .then(json => json.name)
            message.channel.send(utils.InfoEmbed(findName, profileName[lastSaves.indexOf(Math.max(...lastSaves))], `https://visage.surgeplay.com/full/${res.userUUID}.png`, !findProfile.members[res.userUUID].fairy_souls_collected ? "**0 / 201**" : `**${findProfile.members[res.userUUID].fairy_souls_collected} / 201**`, (findProfile.members[res.userUUID].coin_purse).toFixed(1), !findProfile.banking ? "API disabled" : `**${formatNumbers(findProfile.banking.balance)}** coins`))
        })
    } else {
        findUUID = await fetch(`https://api.minetools.eu/uuid/${args[0]}`)
            .then(res2 => res2.json())
            .then(json => json.id)
        profileArr = await fetch(`https://api.hypixel.net/Skyblock/profiles?key=${process.env.APIKEY}&uuid=${findUUID}`)
            .then(res2 => res2.json())
            .then(json => json.profiles)
        Object.keys(profileArr).forEach(profile => {
            lastSaves.push(profileArr[profile].members[findUUID].last_save)
            profileID.push(profileArr[profile].profile_id)
            profileName.push(profileArr[profile].cute_name)
        })
        currentProfile = profileID[lastSaves.indexOf(Math.max(...lastSaves))]
        findProfile = await fetch(`https://api.hypixel.net/skyblock/profile?key=${process.env.APIKEY}&profile=${currentProfile}`)
            .then(res2 => res2.json())
            .then(json => json.profile)
        findName = await fetch(`https://mcapi.ca/player/profile/${findUUID}`)
            .then(res2 => res2.json())
            .then(json => json.name)
        message.channel.send(utils.InfoEmbed(findName, profileName[lastSaves.indexOf(Math.max(...lastSaves))], `https://visage.surgeplay.com/full/${findUUID}.png`, !findProfile.members[findUUID].fairy_souls_collected ? "**0 / 201**" : `**${findProfile.members[findUUID].fairy_souls_collected} / 201**`, (findProfile.members[findUUID].coin_purse).toFixed(1), !findProfile.banking ? "API disabled" : `**${formatNumbers(findProfile.banking.balance)}** coins`))
    }
}