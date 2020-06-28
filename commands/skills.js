const utils = require("../library/utils.js")
const colors = require("../library/colors.js")
const Register = require("../models/register.js")
const fetch = require("node-fetch")
const talkedRecently = new Set()
const all_xp_cap = [50, 175, 375, 675, 1175, 1925, 2925, 4425, 6425, 9925, 14925, 22425, 32425, 47425, 67425, 97425, 147425, 222425, 322425, 522425, 822425, 1222425, 1722425, 2322425, 3022425, 3822425, 4722425, 5722425, 6822425, 8022425, 9322425, 10722425, 12222425, 13822425, 15522425, 17322425, 19222425, 21222425, 23322425, 25522425, 27822425, 30222425, 32722425, 35322425, 38072425, 40972425, 44072425, 47472245, 51172245, 55172245]
const runecrafting_xp_cap = [50, 150, 275, 435, 635, 885, 1200, 1600, 2100, 2725, 3510, 4510, 5760, 7325, 9325, 11825, 14950, 18950, 23950, 30200, 38050, 47850, 60100, 75400, 75401]
const all_xp_need = [50, 125, 200, 300, 500, 750, 1000, 1500, 2000, 3500, 5000, 7500, 10000, 15000, 20000, 30000, 50000, 75000, 100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000, 1000000, 1100000, 1200000, 1300000, 1400000, 1500000, 1600000, 1700000, 1800000, 1900000, 2000000, 2100000, 2200000, 2300000, 2400000, 2500000, 2600000, 2750000, 2900000, 3100000, 3400000, 3700000, 4000000]
const runecrafting_xp_need = [50, 100, 125, 160, 200, 250, 315, 400, 500, 625, 785, 1000, 1250, 1600, 2000, 2465, 3125, 4000, 5000, 6200, 7800, 9800, 12200, 15300, 15301]

const getLvl = (skill, xp) => {
    for (let i in skill) {
        if (!xp) return 0
        if (xp < skill[i]) return i
    }
    return (skill.length).toString()
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
            if (!res) return message.channel.send(utils.BasicEmbed("No Profile Found", colors.Yellow, "Make sure to set your profile with **d!setprofile <IGN>** before viewing your skills!"))
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
                .then(json => json.profile.members[res.userUUID])
            var farmingL = getLvl(all_xp_cap, Math.floor(findProfile.experience_skill_farming)),
                miningL = getLvl(all_xp_cap, Math.floor(findProfile.experience_skill_mining)),
                combatL = getLvl(all_xp_cap, Math.floor(findProfile.experience_skill_combat)),
                foragingL = getLvl(all_xp_cap, Math.floor(findProfile.experience_skill_foraging)),
                fishingL = getLvl(all_xp_cap, Math.floor(findProfile.experience_skill_fishing)),
                enchantingL = getLvl(all_xp_cap, Math.floor(findProfile.experience_skill_enchanting)),
                alchemyL = getLvl(all_xp_cap, Math.floor(findProfile.experience_skill_alchemy)),
                carpentryL = getLvl(all_xp_cap, Math.floor(findProfile.experience_skill_carpentry)),
                runecraftingL = getLvl(runecrafting_xp_cap, Math.floor(findProfile.experience_skill_runecrafting)),
                tamingL = getLvl(all_xp_cap, Math.floor(findProfile.experience_skill_taming))
            if (!farmingL && !miningL && !combatL && !foragingL && !fishingL && !enchantingL && !alchemyL && !carpentryL && !runecraftingL && !tamingL) return message.channel.send(utils.BasicEmbed("Error", colors.Red, "Please enable your api!"))
            findName = await fetch(`https://mcapi.ca/player/profile/${res.userUUID}`)
                .then(res2 => res2.json())
                .then(json => json.name)
            utils.SkillsEmbed(findName, profileName[lastSaves.indexOf(Math.max(...lastSaves))], farmingL, miningL, combatL, foragingL, fishingL, enchantingL, alchemyL, carpentryL, runecraftingL, tamingL, `https://visage.surgeplay.com/full/${res.userUUID}.png`, (Math.floor(findProfile.experience_skill_farming - all_xp_cap[farmingL - 1])), (all_xp_need[farmingL]), (Math.floor(findProfile.experience_skill_mining - all_xp_cap[miningL - 1])), (all_xp_need[miningL]), (Math.floor(findProfile.experience_skill_combat - all_xp_cap[combatL - 1])), (all_xp_need[combatL]), (Math.floor(findProfile.experience_skill_foraging - all_xp_cap[foragingL - 1])), (all_xp_need[foragingL]), (Math.floor(findProfile.experience_skill_fishing - all_xp_cap[fishingL - 1])), (all_xp_need[fishingL]), (Math.floor(findProfile.experience_skill_enchanting - all_xp_cap[enchantingL - 1])), (all_xp_need[enchantingL]), (Math.floor(findProfile.experience_skill_alchemy - all_xp_cap[alchemyL - 1])), (all_xp_need[alchemyL]), (Math.floor(findProfile.experience_skill_carpentry - all_xp_cap[carpentryL - 1])), (all_xp_need[carpentryL]), (Math.floor(findProfile.experience_skill_runecrafting - runecrafting_xp_cap[runecraftingL - 1])), (runecrafting_xp_need[runecraftingL]), (Math.floor(findProfile.experience_skill_taming - all_xp_cap[tamingL - 1])), (all_xp_need[tamingL]), message)
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
            .then(json => json.profile.members[findUUID])
        var farmingL = getLvl(all_xp_cap, Math.floor(findProfile.experience_skill_farming)),
            miningL = getLvl(all_xp_cap, Math.floor(findProfile.experience_skill_mining)),
            combatL = getLvl(all_xp_cap, Math.floor(findProfile.experience_skill_combat)),
            foragingL = getLvl(all_xp_cap, Math.floor(findProfile.experience_skill_foraging)),
            fishingL = getLvl(all_xp_cap, Math.floor(findProfile.experience_skill_fishing)),
            enchantingL = getLvl(all_xp_cap, Math.floor(findProfile.experience_skill_enchanting)),
            alchemyL = getLvl(all_xp_cap, Math.floor(findProfile.experience_skill_alchemy)),
            carpentryL = getLvl(all_xp_cap, Math.floor(findProfile.experience_skill_carpentry)),
            runecraftingL = getLvl(runecrafting_xp_cap, Math.floor(findProfile.experience_skill_runecrafting)),
            tamingL = getLvl(all_xp_cap, Math.floor(findProfile.experience_skill_taming))
        if (!farmingL && !miningL && !combatL && !foragingL && !fishingL && !enchantingL && !alchemyL && !carpentryL && !runecraftingL && !tamingL) return message.channel.send(utils.BasicEmbed("Error", colors.Red, "Please enable your api!"))
        findName = await fetch(`https://mcapi.ca/player/profile/${findUUID}`)
            .then(res2 => res2.json())
            .then(json => json.name)
        utils.SkillsEmbed(findName, profileName[lastSaves.indexOf(Math.max(...lastSaves))], farmingL, miningL, combatL, foragingL, fishingL, enchantingL, alchemyL, carpentryL, runecraftingL, tamingL, `https://visage.surgeplay.com/full/${findUUID}.png`, (Math.floor(findProfile.experience_skill_farming - all_xp_cap[farmingL - 1])), (all_xp_need[farmingL]), (Math.floor(findProfile.experience_skill_mining - all_xp_cap[miningL - 1])), (all_xp_need[miningL]), (Math.floor(findProfile.experience_skill_combat - all_xp_cap[combatL - 1])), (all_xp_need[combatL]), (Math.floor(findProfile.experience_skill_foraging - all_xp_cap[foragingL - 1])), (all_xp_need[foragingL]), (Math.floor(findProfile.experience_skill_fishing - all_xp_cap[fishingL - 1])), (all_xp_need[fishingL]), (Math.floor(findProfile.experience_skill_enchanting - all_xp_cap[enchantingL - 1])), (all_xp_need[enchantingL]), (Math.floor(findProfile.experience_skill_alchemy - all_xp_cap[alchemyL - 1])), (all_xp_need[alchemyL]), (Math.floor(findProfile.experience_skill_carpentry - all_xp_cap[carpentryL - 1])), (all_xp_need[carpentryL]), (Math.floor(findProfile.experience_skill_runecrafting - runecrafting_xp_cap[runecraftingL - 1])), (runecrafting_xp_need[runecraftingL]), (Math.floor(findProfile.experience_skill_taming - all_xp_cap[tamingL - 1])), (all_xp_need[tamingL]), message)
    }
}