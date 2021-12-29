const { MessageEmbed } = require("discord.js")
const client = require("../app")
const colors = require("./colors")
const data = require("../data.json")

// const formatSkills = (emoji, name, l_value, h_value, n_value, m_value, message) => {
//     let body
//     if (l_value >= m_value) {
//         body = "Maxed**"
//     } else if (!h_value) {
//         body = "Locked**"
//     } else {
//         body = `${((h_value / n_value) * 100).toFixed(1)}%** to level ${+l_value + 1}\n**${formatNumbers(h_value)} / ${formatNumbers2(n_value)}**`
//     }
//     return [
//         `${emoji} ${name}`,
//         `**Level ${l_value}**\n**${body}`,
//         true
//     ]
// }

// const formatSlayers = (emoji, name, l_value, h_value, n_value, m_value) => {
//     if (l_value == 0 || !h_value) {
//         body = `0%** to level ${+l_value + 1}\n**0 / ${formatNumbers2(n_value)}**`
//     } else if (l_value >= m_value) {
//         body = "Maxed**"
//     } else {
//         body = `${((h_value / n_value) * 100).toFixed(1)}%** to level ${+l_value + 1}\n**${formatNumbers(h_value)} / ${formatNumbers2(n_value)}**`
//     }
//     return [
//         `${emoji} ${name}`,
//         `**Level ${l_value}**\n**${body}`,
//         true
//     ]
// }

// const formatInfo = (emoji, name, body) => [
//     `${emoji} ${name}`,
//     body,
//     true
// ]

// const formatHelp = (name, expl) => [
//     name,
//     expl,
//     true
// ]

// const formatTimers = (emoji, name, body) => [
//     `${emoji} ${name}`,
//     `**${body}**`,
//     true
// ]

// const utils = {
//     SkillsEmbed: (name, profile, farmingL, miningL, combatL, foragingL, fishingL, enchantingL, alchemyL, carpentryL, runecraftingL, tamingL, thumbnail, farmingH, farmingN, miningH, miningN, combatH, combatN, foragingH, foragingN, fishingH, fishingN, enchantingH, enchantingN, alchemyH, alchemyN, carpentryH, carpentryN, runecraftingH, runecraftingN, tamingH, tamingN, message) => {
//         Profile.findOne({
//             discordID: message.author.id
//         }, async(err, res) => {
//             const apiKey = "9151ebae-e860-4346-8913-633317c85b58"
//             if (err) return message.channel.send(utils.BasicEmbed("Error", colors.Red, err))
//             let embed = new Discord.MessageEmbed()
//                 .setTitle(`**Skills (${name} on ${profile})**`)
//                 .setColor(colors.Cyan)
//                 .setDescription(`Average Skill Level: **${((+farmingL + +miningL + +combatL + +foragingL + +fishingL + +enchantingL + +alchemyL + +tamingL)/8).toFixed(2)}**`)
//                 .setThumbnail(thumbnail)
//                 .addField(...formatSkills("<:Farming:719349059562897438>", "Farming", farmingL, farmingH, farmingN, 50, message))
//                 .addField(...formatSkills("<:Mining:719349059546251354>", "Mining", miningL, miningH, miningN, 50, message))
//                 .addField(...formatSkills("<:Combat:719349059533668374>", "Combat", combatL, combatH, combatN, 50, message))
//                 .addField(...formatSkills("<:Foraging:719349059143598091>", "Foraging", foragingL, foragingH, foragingN, 50, message))
//                 .addField(...formatSkills("<:Fishing:719349059185278998>", "Fishing", fishingL, fishingH, fishingN, 50, message))
//                 .addField(...formatSkills("<:Enchanting:719349059487268994>", "Enchanting", enchantingL, enchantingH, enchantingN, 50, message))
//                 .addField(...formatSkills("<:Alchemy:719349059441393674>", "Alchemy", alchemyL, alchemyH, alchemyN, 50, message))
//                 .addField(...formatSkills("<:Carpentry:719349059261038594>", "Carpentry", carpentryL, carpentryH, carpentryN, 25, message))
//                 .addField(...formatSkills("<:Runecrafting:719349059269427211>", "Runecrafting", runecraftingL, runecraftingH, runecraftingN, 25, message))
//                 .addField(...formatSkills("<:Taming:719349059579805757>", "Taming", tamingL, tamingH, tamingN, 50, message))
//             return message.channel.send(embed)
//         })
//     },
//     SlayersEmbed: (name, profile, revL, tarL, svenL, thumbnail, revH, revN, tarH, tarN, svenH, svenN) => {
//         let embed = new Discord.MessageEmbed()
//             .setTitle(`**Slayers (${name} on ${profile})**`)
//             .setColor(colors.Cyan)
//             .setDescription(`Average Slayer Level: **${((+revL+ +tarL+ +svenL)/3).toFixed(2)}**`)
//             .setThumbnail(thumbnail)
//             .addField(...formatSlayers("<:Revenant:719599242238230641>", "Revenant", revL, revH, revN, 9))
//             .addField(...formatSlayers("<:Tarantula:719599242490151062>", "Tarantula", tarL, tarH, tarN, 9))
//             .addField(...formatSlayers("<:Sven:719599241856548904>", "Sven", svenL, svenH, svenN, 9))
//         return embed
//     },
//     TimersEmbed: (tz, soj, sf, da, mb, bi, ny) => {
//         let embed = new Discord.MessageEmbed()
//             .setTitle("**Timers**")
//             .setColor(colors.Cyan)
//             .addField(...formatTimers("<:Zoo:728734342305677443>", "Travelling Zoo", tz))
//             .addField(...formatTimers("<:Jerry:728734342276317224>", "Season of Jerry", soj))
//             .addField(...formatTimers("<:Spooky:728734342313934928>", "Spooky Festival", sf))
//             .addField(...formatTimers("<:Dark:728734342796279818>", "Dark Auction", da))
//             .addField(...formatTimers("<:Magma:728734341785452656>", "Magma Boss", mb))
//             .addField(...formatTimers("<:Interest:728734341772869708>", "Bank Interest", bi))
//             .addField(...formatTimers("<:New:728734341714411590>", "New Year", ny))
//             .setFooter("Thanks to InventiveTalent for the API")
//         return embed
//     }
// }

const formatInfo = (emoji, name, body) => [
    `${emoji} ${name}`,
    body,
    true
]

String.prototype.capitalize = function() {
    return this.toLowerCase().replace(/_/g, " ").replace(/(^|\s)([a-z])/g, function(m, p1, p2) { return p1 + p2.toUpperCase() })
}

module.exports = {
    currencyFormat: (n) => {
        if (n >= 1000000000) n = `${(n/1000000000).toFixed(1)}b` //billions
        else if (n >= 1000000) n = `${(n/1000000).toFixed(1)}m` //millions
        else if (n >= 1000) n = `${(n/1000).toFixed(1)}k` //thousands
        else n.toFixed(1) //hundreds
        return n
    },
    percentFormat: (n) => {
        return (n * 100).toFixed() + "%"
    },
    getLatestProfile: (profiles, uuid) => {
        let lastSaves = [],
            profilesArr = [],
            profileNames = []
        Object.keys(profiles).forEach(profile => {
                lastSaves.push(profiles[profile].members[uuid].last_save)
                profilesArr.push(profiles[profile])
                profileNames.push(profiles[profile].cute_name)
            })
            //get last updated array through index
        return [profilesArr[lastSaves.indexOf(Math.max(...lastSaves))], profileNames[lastSaves.indexOf(Math.max(...lastSaves))]]
    },
    Error: (e) => {
        return new MessageEmbed()
            .setTitle("Error")
            .setDescription(e)
            .setColor(colors.red)
    },
    Warning: (e) => {
        return new MessageEmbed()
            .setTitle("Warning")
            .setDescription(e)
            .setColor(colors.yellow)
    },
    Success: (e) => {
        return new MessageEmbed()
            .setTitle("Success")
            .setDescription(e)
            .setColor(colors.lime)
    },
    Help: () => {
        let desc = ""
        Array.from(client.module.commands).forEach(e => {
            if (e[1][0]) desc += `[\`${process.env.PREFIX + e[0]}\` - \`${process.env.PREFIX + e[1][0]}\`]\n`
        })

        return new MessageEmbed()
            .setTitle("Help")
            .setDescription(desc)
            .setColor(colors.cyan)
    },
    Info: (name, profile, thumbnail, fairy, purse, bank) => {
        return new MessageEmbed()
            .setTitle(`Info (${name} on ${profile})`)
            .setColor(colors.cyan)
            .setThumbnail(thumbnail)
            .addField(...formatInfo(data.fairyEmoji, "Fairy souls", `${fairy}`))
            .addField(...formatInfo(data.coinEmoji, "Purse", `**${module.exports.currencyFormat(purse)}** coins`))
            .addField(...formatInfo(data.bankEmoji, "Bank", `${bank}`))
    },
    Pets: (name, profile, thumbnail, pets, stats) => {
        let embed = new MessageEmbed()
            .setTitle(`Pets (${name} on ${profile})`)
            .setColor(colors.cyan)
            .setThumbnail(thumbnail)

        let totalExp = 0,
            fishMilestone,
            mineMilestone
        Object.keys(pets).forEach(pet => {
            totalExp += pets[pet].exp
            let petField
            let cumu = JSON.parse(JSON.stringify(data))[`expCumu${pets[pet].tier}`]
            let need = JSON.parse(JSON.stringify(data))[`expNeed${pets[pet].tier}`]
            for (let x in cumu) {
                if (pets[pet].exp < cumu[x]) {
                    petField = `Level **${x}**
                    **${module.exports.percentFormat((pets[pet].exp - cumu[x - 1]) / need[x])}** to level **${+x + 1}**
                    **${module.exports.currencyFormat(pets[pet].exp - cumu[x - 1])}** / **${module.exports.currencyFormat(need[x])}**`
                    break
                }
            }
            if (petField == undefined) petField = "**Maxed**"
            embed.addField(pets[pet].type.capitalize(), petField, true)

            //get lvl from exp and add as field
            //get % progress to next level
            //display exp / needed
        })

        //fishing milestone
        for (let x in data.milestoneFish) {
            if (stats.pet_milestone_sea_creatures_killed < data.milestoneFish[x]) {
                fishMilestone = `${stats.pet_milestone_sea_creatures_killed} / ${data.milestoneFish[x]} (${data.milestoneTier[x]})`
                break
            }
        }

        //mining milestone
        for (let x in data.milestoneMine) {
            if (stats.pet_milestone_ores_mined < data.milestoneMine[x]) {
                mineMilestone = `${stats.pet_milestone_ores_mined} / ${data.milestoneMine[x]} (${data.milestoneTier[x]})`
                break
            }
        }

        //formatting
        if (fishMilestone == undefined) fishMilestone = "Maxed (Legendary)" //if maxed
        if (mineMilestone == undefined) mineMilestone = "Maxed (Legendary)" //if maxed
        embed.setDescription(`Total Exp: **${module.exports.currencyFormat(totalExp)}**\nFishing Milestone: **${fishMilestone}**\nMining Milestone: **${mineMilestone}**`)
        return embed
    }
}