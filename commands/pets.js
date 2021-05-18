const utils = require("../library/utils.js")
const colors = require("../library/colors.js")
const Register = require("../models/register.js")
const fetch = require("node-fetch")
const { MessageEmbed } = require("discord.js")
const talkedRecently = new Set()

const rC = ":white_circle:"
const rU = ":green_circle:"
const rR = ":blue_circle:"
const rE = ":purple_circle:"
const rL = ":yellow_circle:"

const expCC = [0, 100, 210, 330, 460, 605, 765, 940, 1130, 1340, 1570, 1820, 2095, 2395, 2725, 3085, 3485, 3925, 4415, 4955, 5555, 6215, 6945, 7745, 8625, 9585, 10635, 11785, 13045, 14425, 15935, 17585, 19385, 21345, 23475, 25785, 28285, 30985, 33905, 37065, 40485, 44185, 48185, 52535, 57285, 62485, 68185, 74485, 81485, 89285, 97985, 107685, 118485, 130485, 143785, 158485, 174685, 192485, 211985, 233285, 256485, 281685, 309085, 338885, 371285, 406485, 444685, 486085, 530885, 579285, 631485, 687685, 748085, 812885, 882285, 956485, 1035685, 1120385, 1211085, 1308285, 1412485, 1524185, 1643885, 1772085, 1909285, 2055985, 2212685, 2380385, 2560085, 2752785, 2959485, 3181185, 3418885, 3673585, 3946285, 4237985, 4549685, 4883385, 5241085, 5624785]
const expCU = [0, 175, 365, 575, 805, 1055, 1330, 1630, 1960, 2320, 2720, 3160, 3650, 4190, 4790, 5450, 6180, 6980, 7860, 8820, 9870, 11020, 12280, 13660, 15170, 16820, 18620, 20580, 22710, 25020, 27520, 30220, 33140, 36300, 39720, 43420, 47420, 51770, 56520, 61720, 67420, 73720, 80720, 88520, 97220, 106920, 117720, 129720, 143020, 157720, 173920, 191720, 211220, 232520, 255720, 280920, 308320, 338120, 370520, 405720, 443920, 485320, 530120, 578520, 630720, 686920, 747320, 812120, 881520, 955720, 1034920, 1119620, 1210320, 1307520, 1411720, 1523420, 1643120, 1771320, 1908520, 2055220, 2211920, 2379620, 2559320, 2752020, 2958720, 3180420, 3418120, 3672820, 3945520, 4237220, 4548920, 4882620, 5240320, 5624020, 6035720, 6477420, 6954120, 7470820, 8032520, 8644220]
const expCR = [0, 275, 575, 905, 1265, 1665, 2105, 2595, 3135, 3735, 4395, 5125, 5925, 6805, 7765, 8815, 9965, 11225, 12605, 14115, 15765, 17565, 19525, 21655, 23965, 26465, 29165, 32085, 35245, 38665, 42365, 46365, 50715, 55465, 60665, 66365, 72665, 79665, 87465, 96165, 105865, 116665, 128665, 141965, 156665, 172865, 190665, 210165, 231465, 254665, 279865, 307265, 337065, 369465, 404665, 442865, 484265, 529065, 577465, 629665, 685865, 746265, 811065, 880465, 954665, 1033865, 1118565, 1209265, 1306465, 1410665, 1522365, 1642065, 1770265, 1907465, 2054165, 2210865, 2378565, 2558265, 2750965, 2957665, 3179365, 3417065, 3671765, 3944465, 4236165, 4547865, 4881565, 5239265, 5622965, 6034665, 6476365, 6953065, 7469765, 8031465, 8643165, 9309865, 10036565, 10828265, 11689965, 12626665, ]
const expCE = [0, 440, 930, 1470, 2070, 2730, 3460, 4260, 5140, 6100, 7150, 8300, 9560, 10940, 12450, 14100, 15900, 17860, 19990, 22300, 24800, 27500, 30420, 33580, 37000, 40700, 44700, 49050, 53800, 59000, 64700, 71000, 78000, 85800, 94500, 104200, 115000, 127000, 140300, 155000, 171200, 189000, 208500, 229800, 253000, 278200, 305600, 335400, 367800, 403000, 441200, 482600, 527400, 575800, 628000, 684200, 744600, 809400, 878800, 953000, 1032200, 1116900, 1207600, 1304800, 1409000, 1520700, 1640400, 1768600, 1905800, 2052500, 2209200, 2376900, 2556600, 2749300, 2956000, 3177700, 3415400, 3670100, 3942800, 4234500, 4546200, 4879900, 5237600, 5621300, 6033000, 6474700, 6951400, 7468100, 8029800, 8641500, 9308200, 10034900, 10826600, 11688300, 12625000, 13641700, 14743400, 15935100, 17221800, 18608500]
const expCL = [0, 660, 1390, 2190, 3070, 4030, 5080, 6230, 7490, 8870, 10380, 12030, 13830, 15790, 17920, 20230, 22730, 25430, 28350, 31510, 34930, 38630, 42630, 46980, 51730, 56930, 62630, 68930, 75930, 83730, 92430, 102130, 112930, 124930, 138230, 152930, 169130, 186930, 206430, 227730, 250930, 276130, 303530, 333330, 365730, 400930, 439130, 480530, 525330, 573730, 625930, 682130, 742530, 807330, 876730, 950930, 1030130, 1114830, 1205530, 1302730, 1406930, 1518630, 1638330, 1766530, 1903730, 2050430, 2207130, 2374830, 2554530, 2747230, 2953930, 3175630, 3413330, 3668030, 3940730, 4232430, 4544130, 4877830, 5235530, 5619230, 6030930, 6472630, 6949330, 7466030, 8027730, 8639430, 9306130, 10032830, 10824530, 11686230, 12622930, 13639630, 14741330, 15933030, 17219730, 18606430, 20103130, 21719830, 23466530, 25353230]

const expNC = [0, 100, 110, 120, 130, 145, 160, 175, 190, 210, 230, 250, 275, 300, 330, 360, 400, 440, 490, 540, 600, 660, 730, 800, 880, 960, 1050, 1150, 1260, 1380, 1510, 1650, 1800, 1960, 2130, 2310, 2500, 2700, 2920, 3160, 3420, 3700, 4000, 4350, 4750, 5200, 5700, 6300, 7000, 7800, 8700, 9700, 10800, 12000, 13300, 14700, 16200, 17800, 19500, 21300, 23200, 25200, 27400, 29800, 32400, 35200, 38200, 41400, 44800, 48400, 52200, 56200, 60400, 64800, 69400, 74200, 79200, 84700, 90700, 97200, 104200, 111700, 119700, 128200, 137200, 146700, 156700, 167700, 179700, 192700, 206700, 221700, 237700, 254700, 272700, 291700, 311700, 333700, 357700, 383700]
const expNU = [0, 175, 190, 210, 230, 250, 275, 300, 330, 360, 400, 440, 490, 540, 600, 660, 730, 800, 880, 960, 1050, 1150, 1260, 1380, 1510, 1650, 1800, 1960, 2130, 2310, 2500, 2700, 2920, 3160, 3420, 3700, 4000, 4350, 4750, 5200, 5700, 6300, 7000, 7800, 8700, 9700, 10800, 12000, 13300, 14700, 16200, 17800, 19500, 21300, 23200, 25200, 27400, 29800, 32400, 35200, 38200, 41400, 44800, 48400, 52200, 56200, 60400, 64800, 69400, 74200, 79200, 84700, 90700, 97200, 104200, 111700, 119700, 128200, 137200, 146700, 156700, 167700, 179700, 192700, 206700, 221700, 237700, 254700, 272700, 291700, 311700, 333700, 357700, 383700, 411700, 441700, 476700, 516700, 561700, 611700]
const expNR = [0, 275, 300, 330, 360, 400, 440, 490, 540, 600, 660, 730, 800, 880, 960, 1050, 1150, 1260, 1380, 1510, 1650, 1800, 1960, 2130, 2310, 2500, 2700, 2920, 3160, 3420, 3700, 4000, 4350, 4750, 5200, 5700, 6300, 7000, 7800, 8700, 9700, 10800, 12000, 13300, 14700, 16200, 17800, 19500, 21300, 23200, 25200, 27400, 29800, 32400, 35200, 38200, 41400, 44800, 48400, 52200, 56200, 60400, 64800, 69400, 74200, 79200, 84700, 90700, 97200, 104200, 111700, 119700, 128200, 137200, 146700, 156700, 167700, 179700, 192700, 206700, 221700, 237700, 254700, 272700, 291700, 311700, 333700, 357700, 383700, 411700, 441700, 476700, 516700, 561700, 611700, 666700, 726700, 791700, 861700, 936700]
const expNE = [0, 440, 490, 540, 600, 660, 730, 800, 880, 960, 1050, 1150, 1260, 1380, 1510, 1650, 1800, 1960, 2130, 2310, 2500, 2700, 2920, 3160, 3420, 3700, 4000, 4350, 4750, 5200, 5700, 6300, 7000, 7800, 8700, 9700, 10800, 12000, 13300, 14700, 16200, 17800, 19500, 21300, 23200, 25200, 27400, 29800, 32400, 35200, 38200, 41400, 44800, 48400, 52200, 56200, 60400, 64800, 69400, 74200, 79200, 84700, 90700, 97200, 104200, 111700, 119700, 128200, 137200, 146700, 156700, 167700, 179700, 192700, 206700, 221700, 237700, 254700, 272700, 291700, 311700, 333700, 357700, 383700, 411700, 441700, 476700, 516700, 561700, 611700, 666700, 726700, 791700, 861700, 936700, 1016700, 1101700, 1191700, 1286700, 1386700]
const expNL = [0, 660, 730, 800, 880, 960, 1050, 1150, 1260, 1380, 1510, 1650, 1800, 1960, 2130, 2310, 2500, 2700, 2920, 3160, 3420, 3700, 4000, 4350, 4750, 5200, 5700, 6300, 7000, 7800, 8700, 9700, 10800, 12000, 13300, 14700, 16200, 17800, 19500, 21300, 23200, 25200, 27400, 29800, 32400, 35200, 38200, 41400, 44800, 48400, 52200, 56200, 60400, 64800, 69400, 74200, 79200, 84700, 90700, 97200, 104200, 111700, 119700, 128200, 137200, 146700, 156700, 167700, 179700, 192700, 206700, 221700, 237700, 254700, 272700, 291700, 311700, 333700, 357700, 383700, 411700, 441700, 476700, 516700, 561700, 611700, 666700, 726700, 791700, 861700, 936700, 1016700, 1101700, 1191700, 1286700, 1386700, 1496700, 1616700, 1746700, 1886700]

const milestoneF = [250, 1000, 2500, 5000, 10000]
const milestoneM = [2500, 7500, 20000, 100000, 250000]

const getLvl = (pet, xp) => {
    for (let i in pet) {
        if (xp < pet[i]) return i
    }
    return (pet.length).toString()
}

const getLvl2 = (pet, xp) => {
    for (let i in pet) {
        if (xp < pet[i]) return pet[i]
    }
    return (pet.length).toString()
}

String.prototype.capitalize = function() {
    return this.toLowerCase().replace(/_/g, " ").replace(/(^|\s)([a-z])/g, function(m, p1, p2) { return p1 + p2.toUpperCase() })
}

const expType = (pet) => {
    let type
    switch (pet.tier) {
        case "COMMON":
            type = expCC
            break
        case "UNCOMMON":
            type = expCU
            break
        case "RARE":
            type = expCR
            break
        case "EPIC":
            type = expCE
            break
        case "LEGENDARY":
            type = expCL
            break
    }
    return type
}


const expNtype = (pet) => {
    let body
    switch (pet.tier) {
        case "COMMON":
            body = expNC
            break
        case "UNCOMMON":
            body = expNU
            break
        case "RARE":
            body = expNR
            break
        case "EPIC":
            body = expNE
            break
        case "LEGENDARY":
            body = expNL
            break
    }
    return body
}

const rarity = (pet) => {
    let emoji
    switch (pet.tier) {
        case "COMMON":
            emoji = rC
            break
        case "UNCOMMON":
            emoji = rU
            break
        case "RARE":
            emoji = rR
            break
        case "EPIC":
            emoji = rE
            break
        case "LEGENDARY":
            emoji = rL
            break
    }
    return emoji
}

const formatNumbers = (n) => {
    let body
    if (n >= 1000000000) {
        body = `${(n/1000000000).toFixed(1)}b`
    } else if (n >= 1000000) {
        body = `${(n/1000000).toFixed(1)}m`
    } else if (n >= 1000) {
        body = `${(n/1000).toFixed(1)}k`
    } else {
        body = n.toFixed(1)
    }
    return body
}

exports.run = async(client, message, args) => {
    var lastSaves = [],
        profileID = [],
        profileName = [],
        totalExp = 0
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
                .then(json => json.profile.members[res.userUUID])
            findName = await fetch(`https://api.minetools.eu/uuid/${res.userUUID}`)
                .then(res2 => res2.json())
                .then(json => json.name)
            let embed = new MessageEmbed()
                .setTitle(`**Pets (${findName} on ${profileName[lastSaves.indexOf(Math.max(...lastSaves))]}**)`)
                .setColor(colors.Cyan)
                .setThumbnail(`https://visage.surgeplay.com/full/${res.userUUID}.png`)
            Object.keys(findProfile.pets).forEach(pet => {
                totalExp += +findProfile.pets[pet].exp
                embed.addField(`${(findProfile.pets[pet].type).capitalize()} ${rarity(findProfile.pets[pet])}`, getLvl(expType(findProfile.pets[pet]), findProfile.pets[pet].exp) == 100 ? "**Maxed**" : `**Level ${getLvl(expType(findProfile.pets[pet]), findProfile.pets[pet].exp)}\n${(((((+findProfile.pets[pet].exp) - +expType(findProfile.pets[pet])[getLvl(expType(findProfile.pets[pet]), findProfile.pets[pet].exp) - 1])/(expNtype(findProfile.pets[pet])[getLvl(expType(findProfile.pets[pet]), findProfile.pets[pet].exp)])))*100).toFixed(1)}%** to level ${+getLvl(expType(findProfile.pets[pet]), findProfile.pets[pet].exp)+1}\n**${formatNumbers((+findProfile.pets[pet].exp) - +expType(findProfile.pets[pet])[getLvl(expType(findProfile.pets[pet]), findProfile.pets[pet].exp) - 1])} / ${formatNumbers(expNtype(findProfile.pets[pet])[getLvl(expType(findProfile.pets[pet]), findProfile.pets[pet].exp)])}**`, true)
            })
            embed.setDescription(`**Total exp:** ${formatNumbers(totalExp)}\n**<:Fish:733145290395090984> Fishing Milestone:** ${findProfile.stats.pet_milestone_sea_creatures_killed} / ${getLvl2(milestoneF, findProfile.stats.pet_milestone_sea_creatures_killed)}\n**<:Mine:733145290307141642> Mining Milestone:** ${findProfile.stats.pet_milestone_ores_mined} / ${getLvl2(milestoneM, findProfile.stats.pet_milestone_ores_mined)}`)
            message.channel.send(embed)
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
        findName = await fetch(`https://api.minetools.eu/uuid/${findUUID}`)
            .then(res2 => res2.json())
            .then(json => json.name)
        let embed = new MessageEmbed()
            .setTitle(`**Pets (${findName} on ${profileName[lastSaves.indexOf(Math.max(...lastSaves))]}**)`)
            .setColor(colors.Cyan)
            .setThumbnail(`https://visage.surgeplay.com/full/${findUUID}.png`)
        Object.keys(findProfile.pets).forEach(pet => {
            totalExp += +findProfile.pets[pet].exp
            embed.addField(`${(findProfile.pets[pet].type).capitalize()} ${rarity(findProfile.pets[pet])}`, getLvl(expType(findProfile.pets[pet]), findProfile.pets[pet].exp) == 100 ? "**Maxed**" : `**Level ${getLvl(expType(findProfile.pets[pet]), findProfile.pets[pet].exp)}\n${(((((+findProfile.pets[pet].exp) - +expType(findProfile.pets[pet])[getLvl(expType(findProfile.pets[pet]), findProfile.pets[pet].exp) - 1])/(expNtype(findProfile.pets[pet])[getLvl(expType(findProfile.pets[pet]), findProfile.pets[pet].exp)])))*100).toFixed(1)}%** to level ${+getLvl(expType(findProfile.pets[pet]), findProfile.pets[pet].exp)+1}\n**${formatNumbers((+findProfile.pets[pet].exp) - +expType(findProfile.pets[pet])[getLvl(expType(findProfile.pets[pet]), findProfile.pets[pet].exp) - 1])} / ${formatNumbers(expNtype(findProfile.pets[pet])[getLvl(expType(findProfile.pets[pet]), findProfile.pets[pet].exp)])}**`, true)
        })
        embed.setDescription(`**Total exp:** ${formatNumbers(totalExp)}\n**<:Fish:733145290395090984> Fishing Milestone:** ${findProfile.stats.pet_milestone_sea_creatures_killed} / ${getLvl2(milestoneF, findProfile.stats.pet_milestone_sea_creatures_killed)}\n**<:Mine:733145290307141642> Mining Milestone:** ${findProfile.stats.pet_milestone_ores_mined} / ${getLvl2(milestoneM, findProfile.stats.pet_milestone_ores_mined)}`)
        message.channel.send(embed)
    }
}