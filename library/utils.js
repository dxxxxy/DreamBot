const { MessageEmbed } = require("discord.js")
const client = require("../app")
const colors = require("./colors")
const data = require("../data.json")

String.prototype.capitalize = function() {
    return this.toLowerCase().replace(/_/g, " ").replace(/(^|\s)([a-z])/g, function(m, p1, p2) { return p1 + p2.toUpperCase() })
}

Object.prototype.nameOf = function() {
    return this.toString().replace(/[ |\(\)=>]/g, '');
}

module.exports = {
        currencyFormat: (n) => {
            if (n >= 1000000000) n = `${(n/1000000000).toFixed(2)}b` //billions
            else if (n >= 1000000) n = `${(n/1000000).toFixed(2)}m` //millions
            else if (n >= 1000) n = `${(n/1000).toFixed(1)}k` //thousands
            else n = n.toFixed(1) //hundreds
            return n
        },
        percentFormat: (n) => {
            return (n * 100).toFixed(1) + "%"
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
                .addField(`${data.fairyEmoji} Fairy souls`, `${fairy}`, true)
                .addField(`${data.coinEmoji} Purse`, `**${module.exports.currencyFormat(purse)}** coins`, true)
                .addField(`${data.bankEmoji} Bank`, `${bank}`, true)
        },
        Pets: (name, profile, thumbnail, pets, stats) => {
                let embed = new MessageEmbed()
                    .setTitle(`Pets (${name} on ${profile})`)
                    .setColor(colors.cyan)
                    .setThumbnail(thumbnail)

                let totalExp = 0,
                    fishMilestone,
                    mineMilestone,
                    i = 0

                pets.sort((a, b) => b.exp - a.exp) //from highest to lowest
                    //get pets stats
                Object.keys(pets).forEach(pet => {
                    totalExp += pets[pet].exp
                    let petField

                    if (i >= 25) {
                        return
                    }
                    i++
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
                    if (petField == undefined) petField = `Level **100**\n**${module.exports.currencyFormat(pets[pet].exp)}**`
                        //add info as field
                    embed.addField(`${JSON.parse(JSON.stringify(data))[pets[pet].tier]} ${pets[pet].type.capitalize()}`, petField, true)
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
                embed.setDescription(`Total Exp: **${module.exports.currencyFormat(totalExp)}**
        Fishing Milestone: **${fishMilestone}**
        Mining Milestone: **${mineMilestone}**${i >= 24 ? `\nOnly showing first **25** of **${pets.length}** pets` : ""}\nOrdered by **highest**`)
        return embed
    },
    Register: () => {
        return new MessageEmbed()
            .setTitle("Not registered")
            .setColor(colors.yellow)
            .setDescription(`Please register using ${process.env.PREFIX}register <ign>`)
    },
    Timers: (timerArray) => {
        let embed = new MessageEmbed()
            .setTitle("Timers")
            .setColor(colors.cyan)
            .setFooter({ text: "Thanks to InventiveTalent for the API", iconURL: "https://avatars.githubusercontent.com/u/6525296?v=4" })
            //"Thanks to InventiveTalent for the API", "https://avatars.githubusercontent.com/u/6525296?v=4"

        timerArray.forEach(timer => {
            let name = timer.type.replace(/[A-Z-_\&](?=[a-z0-9]+)|[A-Z-_\&]+(?![a-z0-9])/g, ' $&').trim().capitalize()
            embed.addField(`${JSON.parse(JSON.stringify(data))[timer.type]} ${name}`, `**${timer.estimateRelative}**`, true)
        })
        return embed
    },
    Slayers: (name, profile, thumbnail, slayer) => {
        let embed = new MessageEmbed()
            .setTitle(`Slayers (${name} on ${profile})`)
            .setColor(colors.cyan)
            .setThumbnail(thumbnail)

        let totalExp = 0,
            i = 0,
            levels = 0
        Object.keys(slayer).forEach(boss => {
            let field
            if (!slayer[boss].hasOwnProperty("xp")) return
            totalExp += slayer[boss].xp
            let need = JSON.parse(JSON.stringify(data))[boss]

            let emoji = JSON.parse(JSON.stringify(data))[JSON.parse(JSON.stringify(data))[boss.toUpperCase()]]
            for (let x in need) {
                if (slayer[boss].xp < need[x]) {
                    levels += +x
                    i++

                    field = [`${emoji} ${JSON.parse(JSON.stringify(data))[boss.toUpperCase()]}`, `Level **${x}**
                    **${module.exports.percentFormat(slayer[boss].xp / need[x])}** to level **${+x + 1}**
                    **${module.exports.currencyFormat(slayer[boss].xp)}** / **${module.exports.currencyFormat(need[x])}**`, true]

                    break
                }

            }
            if (field == undefined) field = [`${emoji} ${JSON.parse(JSON.stringify(data))[boss.toUpperCase()]}`, `Level **9**\n**${module.exports.currencyFormat(slayer[boss].xp)}**`, true]
            embed.addField(...field)
        })

        embed.setDescription(`Slayer Average: **${(levels / i).toFixed(2)}**
        Total Exp: **${module.exports.currencyFormat(totalExp)}**`)

        return embed
    },       
    Skills: (name, profile, thumbnail, stats) => {
        let embed = new MessageEmbed()
            .setTitle(`Skills (${name} on ${profile})`)
            .setColor(colors.cyan)
            .setThumbnail(thumbnail)

        let totalExp = 0,
            i = 0,
            levels = 0

        Object.keys(stats).slice().forEach(stat => {
            if (!stat.includes("experience_skill")) {
                delete stats[stat]
            }
        })

        // stats = Object.entries(stats).sort((a,b) => b[1]-a[1])

        Object.entries(stats).sort((a,b) => b[1]-a[1]).forEach(stat => {
                //[ 'experience', 'skill', 'runecrafting' ]
                let skillName = stat[0].split("_")[2]
                let skillField
                console.log(skillName, stat, stat[0], stat[1])
                totalExp += stat[1]
                let cumu = JSON.parse(JSON.stringify(data))[skillName != "runecrafting" && skillName != "social" ? "expAllCumu" : `exp${skillName.capitalize()}Cumu`]
                let need = JSON.parse(JSON.stringify(data))[skillName != "runecrafting" && skillName != "social" ? "expAllNeed" : `exp${skillName.capitalize()}Need`]
                for (let x in cumu) {
                    if (stat[1] < cumu[x]) {
                        levels += +x
                        i++
                        console.log(stats[0], stat[1])
                        skillField = `Level **${x}**
                        **${module.exports.percentFormat((stat[1] - cumu[x - 1]) / need[x])}** to level **${+x + 1}**
                        **${module.exports.currencyFormat(stat[1] - cumu[x - 1])}** / **${module.exports.currencyFormat(need[x])}**`
                        break
                    }
                }
                if (skillField == undefined) skillField = `Level **${Object.keys(cumu).length}**\n**${module.exports.currencyFormat(stat[1])}**`
                    //add info as field
                embed.addField(`${JSON.parse(JSON.stringify(data))[skillName]} ${skillName.capitalize()}`, skillField, true)
        })

        embed.setDescription(`Skill Average: **${(levels / i).toFixed(2)}**
        Total Exp: **${module.exports.currencyFormat(totalExp)}**
        Ordered by **highest**`)

        return embed
    }
}