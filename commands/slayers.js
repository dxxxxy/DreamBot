//sl
const utils = require("../library/utils.js")
const colors = require("../library/colors.js")
const Register = require("../models/register.js")
const { get } = require("axios").default
const talkedRecently = new Set()
const all_xp_cap = [5, 15, 200, 1000, 5000, 20000, 100000, 400000, 1000000]
const wolf_xp_cap = [10, 25, 250, 1500, 5000, 20000, 100000, 400000, 1000000]

const getLvl = (skill, xp) => {
    for (let i in skill)
        if (xp < skill[i]) return i
    return (skill.length).toString()
}

exports.run = async(client, message, args) => {
    var lastSaves = [],
        profileID = [],
        profileName = []
    if (talkedRecently.has(message.author.id)) return message.channel.send(utils.BasicEmbed("Cooldown", colors.Yellow, "Please wait 1 minute before using this command again!"))
    talkedRecently.add(message.author.id)
    setTimeout(() => {
        talkedRecently.delete(message.author.id)
    }, utils.CD)
    if (!args[0]) {
        Register.findOne({
            discordID: message.author.id
        }, async(err, res) => {
            if (!res) return message.channel.send(utils.BasicEmbed("Error", colors.Yellow, "Please register using d!register <IGN>!"))
            if (err) return message.channel.send(utils.BasicEmbed("Error", colors.Red, err))
            profileArr = await fetch(`https://api.hypixel.net/Skyblock/profiles?key=${process.env.APIKEY}&uuid=${res.minecraftID}`)
                .then(res2 => res2.json())
                .then(json => json.profiles)
            Object.keys(profileArr).forEach(profile => {
                lastSaves.push(profileArr[profile].members[res.minecraftID].last_save)
                profileID.push(profileArr[profile].profile_id)
                profileName.push(profileArr[profile].cute_name)
            })
            currentProfile = profileID[lastSaves.indexOf(Math.max(...lastSaves))]
            findProfile = await fetch(`https://api.hypixel.net/skyblock/profile?key=${process.env.APIKEY}&profile=${currentProfile}`)
                .then(res2 => res2.json())
                .then(json => json.profile.members[res.minecraftID])
            var revL = getLvl(all_xp_cap, Math.floor(findProfile.slayer_bosses.zombie.xp)),
                tarL = getLvl(all_xp_cap, Math.floor(findProfile.slayer_bosses.spider.xp)),
                svenL = getLvl(wolf_xp_cap, Math.floor(findProfile.slayer_bosses.wolf.xp))
            findName = await fetch(`https://api.minetools.eu/uuid/${res.minecraftID}`)
                .then(res2 => res2.json())
                .then(json => json.name)
            message.channel.send(utils.SlayersEmbed(findName, profileName[lastSaves.indexOf(Math.max(...lastSaves))], !findProfile.slayer_bosses.zombie.xp ? revL = 0 : revL, !findProfile.slayer_bosses.spider.xp ? tarL = 0 : tarL, !findProfile.slayer_bosses.wolf.xp ? svenL = 0 : svenL, `https://visage.surgeplay.com/full/${res.minecraftID}.png`, (findProfile.slayer_bosses.zombie.xp), all_xp_cap[revL], (findProfile.slayer_bosses.spider.xp), all_xp_cap[tarL], (findProfile.slayer_bosses.wolf.xp), wolf_xp_cap[svenL], (findProfile.slayer_bosses.zombie.xp), (findProfile.slayer_bosses.spider.xp), (findProfile.slayer_bosses.wolf.xp)))
        })
    } else {
        findUUID = await fetch(`https://api.minetools.eu/uuid/${args[0]}`)
            .then(res2 => res2.json())
            .then(json => json.id)
        if (!findUUID) return message.channel.send(utils.BasicEmbed("Error", colors.Red, "This IGN does not exist!"))
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
            .then(json => json.profile.members[findUUID])
        var revL = getLvl(all_xp_cap, Math.floor(findProfile.slayer_bosses.zombie.xp)),
            tarL = getLvl(all_xp_cap, Math.floor(findProfile.slayer_bosses.spider.xp)),
            svenL = getLvl(wolf_xp_cap, Math.floor(findProfile.slayer_bosses.wolf.xp))
        findName = await fetch(`https://api.minetools.eu/uuid/${findUUID}`)
            .then(res2 => res2.json())
            .then(json => json.name)
        message.channel.send(utils.SlayersEmbed(findName, profileName[lastSaves.indexOf(Math.max(...lastSaves))], !findProfile.slayer_bosses.zombie.xp ? revL = 0 : revL, !findProfile.slayer_bosses.spider.xp ? tarL = 0 : tarL, !findProfile.slayer_bosses.wolf.xp ? svenL = 0 : svenL, `https://visage.surgeplay.com/full/${findUUID}.png`, (findProfile.slayer_bosses.zombie.xp), all_xp_cap[revL], (findProfile.slayer_bosses.spider.xp), all_xp_cap[tarL], (findProfile.slayer_bosses.wolf.xp), wolf_xp_cap[svenL], (findProfile.slayer_bosses.zombie.xp), (findProfile.slayer_bosses.spider.xp), (findProfile.slayer_bosses.wolf.xp)))
    }
}