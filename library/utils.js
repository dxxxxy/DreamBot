const { MessageEmbed } = require("discord.js")
const client = require("../app")
const colors = require("./colors")
const data = require("../data.json")

String.prototype.capitalize = function() {
    return this.toLowerCase().replace(/_/g, " ").replace(/(^|\s)([a-z])/g, function(m, p1, p2) {
        return p1 + p2.toUpperCase()
    })
}

Number.prototype.format = function() {
    //this is immutable, so we gotta assign it to something
    let n = this
    if (this >= 1000000000) n = `${(this / 1000000000).toFixed(2)}b` //billions
    else if (this >= 1000000) n = `${(this / 1000000).toFixed(2)}m` //millions
    else if (this >= 1000) n = `${(this / 1000).toFixed(1)}k` //thousands
    else n = this.toFixed(1) //hundreds
    return n
}

Number.prototype.percent = function() {
    return (this * 100).toFixed(1) + "%"
}

//export functions
module.exports = {
        getLatestProfile: (profiles, uuid) => {
            let lastSaves = [],
                profilesArr = [],
                profileNames = []

            //go over each profileName, get the latest save and use the index of that to retrieve the profileName and the profileName
            Object.keys(profiles).forEach(profileName => {
                lastSaves.push(profiles[profileName].members[uuid].last_save)
                profilesArr.push(profiles[profileName])
                profileNames.push(profiles[profileName].cute_userName)
            })

            return [profilesArr[lastSaves.indexOf(Math.max(...lastSaves))], profileNames[lastSaves.indexOf(Math.max(...lastSaves))]]
        },
        Error: (d) => {
            return new MessageEmbed()
                .setTitle("Error")
                .setDescription(d)
                .setColor(colors.red)
        },
        Warning: (d) => {
            return new MessageEmbed()
                .setTitle("Warning")
                .setDescription(d)
                .setColor(colors.yellow)
        },
        Success: (d) => {
            return new MessageEmbed()
                .setTitle("Success")
                .setDescription(d)
                .setColor(colors.lime)
        },
        Help: () => {
            let d = ""

            //for each command, check if its the native command (not alias, so no duplicates, because alias is also registered as a command) and print the normal command and its alias
            Array.from(client.module.commands).forEach(e => {
                if (e[1][0]) d += `[\`${process.env.PREFIX + e[0]}\` - \`${process.env.PREFIX + e[1][0]}\`]\n`
            })

            return new MessageEmbed()
                .setTitle("Help")
                .setDescription(d)
                .setColor(colors.cyan)
        },
        Info: (userName, profileName, thumbnail, user, profile) => {
                return new MessageEmbed()
                    .setTitle(`Info (${userName} on ${profileName})`)
                    .setColor(colors.cyan)
                    .setThumbnail(thumbnail)
                    .addField(`${data.fairyEmoji} Fairy souls`, `${!user.fairy_souls_collected ? `**0 / ${data.fairySouls}**` : `**${user.fairy_souls_collected} / ${data.fairySouls}**`}`, true)
                .addField(`${data.coinEmoji} Purse`, `**${user.coin_purse.format()}** coins`, true)
                .addField(`${data.bankEmoji} Bank`, `${!profile.banking ? "API disabled" : `**${profile.banking.balance.format()}** coins`}`, true)
    },
    Pets: (userName, profileName, thumbnail, pets, stats) => {
        //basic embed
        let embed = new MessageEmbed()
            .setTitle(`Pets (${userName} on ${profileName})`)
            .setColor(colors.cyan)
            .setThumbnail(thumbnail)

        let totalExp = 0,
            fishMilestone,
            mineMilestone,
            i = 0

        pets.sort((a, b) => b.exp - a.exp) //from highest to lowest
            
        //get pet stats loop
        Object.keys(pets).forEach(pet => {
            let petField
            totalExp += pets[pet].exp //total xp

            if (i >= 25) return //discord embed limit is 25 fields
            i++ //number of pets/fields

            //get xp tables
            let cumu = JSON.parse(JSON.stringify(data))[`expCumu${pets[pet].tier}`]
            let need = JSON.parse(JSON.stringify(data))[`expNeed${pets[pet].tier}`]

            //get level and progress to next
            for (let x in cumu) {
                if (pets[pet].exp < cumu[x]) { //if xp is lower than cumulative, we found the level
                    petField = `Level **${x}**
                    **${((pets[pet].exp - cumu[x - 1]) / need[x]).percent()}** to level **${+x + 1}**
                    **${(pets[pet].exp - cumu[x - 1]).format()}** / **${need[x].format()}**`
                    break
                }
            }

            //if xp is over the last level, its maxed
            if (petField == undefined) petField = `Level **100**\n**${pets[pet].exp.format()}**`
                
            //add field
            embed.addField(`${JSON.parse(JSON.stringify(data))[pets[pet].tier]} ${pets[pet].type.capitalize()}`, petField, true)
        })

        //fishing milestone
        for (let x in data.milestoneFish) {
            if (stats.pet_milestone_sea_creatures_killed < data.milestoneFish[x]) { //if milestone is lower than cumulative, we found the level
                fishMilestone = `${stats.pet_milestone_sea_creatures_killed} / ${data.milestoneFish[x]} (${data.milestoneTier[x]})`
                break
            }
        }

        //mining milestone
        for (let x in data.milestoneMine) {
            if (stats.pet_milestone_ores_mined < data.milestoneMine[x]) { //if milestone is lower than cumulative, we found the level
                mineMilestone = `${stats.pet_milestone_ores_mined} / ${data.milestoneMine[x]} (${data.milestoneTier[x]})`
                break
            }
        }

        if (fishMilestone == undefined) fishMilestone = `${stats.pet_milestone_sea_creatures_killed} (Legendary)` //if milestone is over the last level, its maxed
        if (mineMilestone == undefined) mineMilestone = `${stats.pet_milestone_ores_mined} (Legendary)` //if milestone is over the last level, its maxed

        embed.setDescription(`Total Exp: **${totalExp.format()}**
            Fishing Milestone: **${fishMilestone}**
            Mining Milestone: **${mineMilestone}**${i >= 25 ? `\nOnly showing first **25** of **${pets.length}** pets` : ""}\nOrdered by **highest**`)

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
            .setFooter({
                text: "Thanks to InventiveTalent for the API",
                iconURL: "https://avatars.githubusercontent.com/u/6525296?v=4"
            })

        //for each timer, format the name and get emoji from json
        timerArray.forEach(timer => {
            //darkAuction => Dark Auction
            let name = timer.type.replace(/[A-Z-_\&](?=[a-z0-9]+)|[A-Z-_\&]+(?![a-z0-9])/g, ' $&').trim().capitalize()

            embed.addField(`${JSON.parse(JSON.stringify(data))[timer.type]} ${name}`, `**${timer.estimateRelative}**`, true)
        })

        return embed
    },
    Slayers: (userName, profileName, thumbnail, slayer) => {
        //basic embed
        let embed = new MessageEmbed()
            .setTitle(`Slayers (${userName} on ${profileName})`)
            .setColor(colors.cyan)
            .setThumbnail(thumbnail)

        let totalExp = 0,
            i = 0,
            levels = 0

        //get slayer stats loop
        Object.keys(slayer).forEach(boss => {
            if (!slayer[boss].hasOwnProperty("xp")) return //if slayer not started
            
            let field
            totalExp += slayer[boss].xp

            //get xp table
            let need = JSON.parse(JSON.stringify(data))[boss]

            //get emoji
            let emoji = JSON.parse(JSON.stringify(data))[JSON.parse(JSON.stringify(data))[boss.toUpperCase()]]

            //get level and progress to next
            for (let x in need) {
                if (slayer[boss].xp < need[x]) { //if xp is lower than cumulative, we found the level
                    //count for average
                    levels += +x 
                    i++

                    field = [`${emoji} ${JSON.parse(JSON.stringify(data))[boss.toUpperCase()]}`, `Level **${x}**
                    **${(slayer[boss].xp / need[x]).percent()}** to level **${+x + 1}**
                    **${slayer[boss].xp.format()}** / **${need[x].format()}**`, true]

                    break
                }
            }

            //if xp is over the last level, its maxed
            if (field == undefined) field = [`${emoji} ${JSON.parse(JSON.stringify(data))[boss.toUpperCase()]}`, `Level **9**\n**${slayer[boss].xp.format()}**`, true]
            
            //add field
            embed.addField(...field)
        })

        embed.setDescription(`Slayer Average: **${(levels / i).toFixed(2)}**
        Total Exp: **${totalExp.format()}**`)

        return embed
    },
    Skills: (userName, profileName, thumbnail, stats) => {
        //basic embed
        let embed = new MessageEmbed()
            .setTitle(`Skills (${userName} on ${profileName})`)
            .setColor(colors.cyan)
            .setThumbnail(thumbnail)

        let totalExp = 0,
            i = 0,
            levels = 0

        //filter all user stats, only leave experience
        Object.keys(stats).slice().forEach(stat => {
            if (!stat.includes("experience_skill")) {
                delete stats[stat]
            }
        })

        //api disable check
        if (Object.entries(stats).length != 0)

            //sort by highest and get skill loop
            Object.entries(stats).sort((a, b) => b[1] - a[1]).forEach(stat => {
                //[ 'experience', 'skill', 'runecrafting' ]
                let skillName = stat[0].split("_")[2]

                let skillField
                totalExp += stat[1]

                //get xp tables
                let cumu = JSON.parse(JSON.stringify(data))[skillName != "runecrafting" && skillName != "social" ? "expAllCumu" : `exp${skillName.capitalize()}Cumu`]
                let need = JSON.parse(JSON.stringify(data))[skillName != "runecrafting" && skillName != "social" ? "expAllNeed" : `exp${skillName.capitalize()}Need`]

                //get level and progress to next
                for (let x in cumu) {
                    if (stat[1] < cumu[x]) {
                        //count for average
                        levels += +x
                        i++

                        skillField = `Level **${x}**
                        **${((stat[1] - cumu[x - 1]) / need[x]).percent()}** to level **${+x + 1}**
                        **${(stat[1] - cumu[x - 1]).format()}** / **${need[x].format()}**`
                        break
                    }
                }

                //if xp is over the last level, its maxed
                if (skillField == undefined) skillField = `Level **${Object.keys(cumu).length}**\n**${stat[1].format()}**`
                
                //add field
                embed.addField(`${JSON.parse(JSON.stringify(data))[skillName]} ${skillName.capitalize()}`, skillField, true)
            })

        else return embed.setDescription("API Disabled")

        embed.setDescription(`Skill Average: **${(levels / i).toFixed(2)}**
        Total Exp: **${totalExp.format()}**
        Ordered by **highest**`)

        return embed
    }
}