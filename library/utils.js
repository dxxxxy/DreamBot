// const Discord = require("discord.js")
// const colors = require("../library/colors.js")
// const Profile = require("../models/register.js")
// const fetch = (url) =>
//     import ("node-fetch").then(({ default: fetch }) => fetch(url))
// const all_xp_cap = [5, 15, 200, 1000, 5000, 20000, 100000, 400000, 1000000]
// const wolf_xp_cap = [10, 25, 250, 1500, 5000, 20000, 100000, 400000, 1000000]

const { MessageEmbed } = require("discord.js")
const client = require("../app.js")
const colors = require("./colors")

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

// const formatNumbers = (n) => {
//     let body
//     if (n >= 1000000000) {
//         body = `${(n/1000000000).toFixed(1)}b`
//     } else if (n >= 1000000) {
//         body = `${(n/1000000).toFixed(1)}m`
//     } else if (n >= 1000) {
//         body = `${(n/1000).toFixed(1)}k`
//     } else {
//         body = n
//     }
//     return body
// }

// const formatNumbers2 = (n) => {
//     let body
//     if (n >= 1000000) {
//         body = `${(n/1000000)}m`
//     } else if (n >= 1000) {
//         body = `${(n/1000)}k`
//     } else {
//         body = n
//     }
//     return body
// }

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
//     InfoEmbed: (name, profile, thumbnail, fairy, purse, bank) => {
//         let embed = new Discord.MessageEmbed()
//             .setTitle(`**Info (${name} on ${profile})**`)
//             .setColor(colors.Cyan)
//             .setThumbnail(thumbnail)
//             .addField(...formatInfo("<:Fairy:725462792206811187>", "Fairy souls", `${fairy}`))
//             .addField(...formatInfo("<:Purse:725463522858762241>", "Purse", `**${formatNumbers(purse)}** coins`))
//             .addField(...formatInfo("<:Bank:725463101318889562>", "Bank", `${bank}`))
//         return embed
//     },
//     BasicEmbed: (title, color, desc) => {
//         let embed = new Discord.MessageEmbed()
//             .setTitle(`**${title}**`)
//             .setColor(color)
//             .setDescription(desc)
//         return embed
//     },
//     HelpEmbed: () => {
//         let embed = new Discord.MessageEmbed()
//             .setTitle("**Help**")
//             .setColor(colors.Cyan)
//             .setDescription("Please take note that **[] means required**, while **<> means optional**. To use commands without **<>**, please register yourself with the command **d!register**.")
//             .addField(...formatHelp("d!register [IGN]", "Register your name"))
//             .addField(...formatHelp("d!skills <IGN>", "View skills"))
//             .addField(...formatHelp("d!slayers <IGN>", "View slayers"))
//             .addField(...formatHelp("d!pets <IGN>", "View pets"))
//             .addField(...formatHelp("d!info <IGN>", "View basic info"))
//             .addField(...formatHelp("d!timers", "Timers before events start"))
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
//     },
//     CD: 1
// }

const formatInfo = (emoji, name, body) => [
    `${emoji} ${name}`,
    body,
    true
]

module.exports = {
    currencyFormat: (n) => {
        if (n >= 1000000000) n = `${(n/1000000000).toFixed(1)}b` //billions
        else if (n >= 1000000) n = `${(n/1000000).toFixed(1)}m` //millions
        else if (n >= 1000) n = `${(n/1000).toFixed(1)}k` //thousands
        else n.toFixed(1) //hundreds
        return n
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
            .addField(...formatInfo("<:Fairy:725462792206811187>", "Fairy souls", `${fairy}`))
            .addField(...formatInfo("<:Coins:925691357656412160>", "Purse", `**${module.exports.currencyFormat(purse)}** coins`))
            .addField(...formatInfo("<:Bank:725463101318889562>", "Bank", `${bank}`))
    }
}