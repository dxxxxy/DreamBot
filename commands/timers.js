//t
const utils = require("../library/utils")
const { get } = require("axios").default

exports.run = async(client, message, args) => {
    //inventivetalent api timers
    let zoo = await (await get("https://hypixel-api.inventivetalent.org/api/skyblock/zoo/estimate")).data
    let jerry = await (await get("https://hypixel-api.inventivetalent.org/api/skyblock/winter/estimate")).data
    let spooky = await (await get("https://hypixel-api.inventivetalent.org/api/skyblock/spookyFestival/estimate")).data
    let auction = await (await get("https://hypixel-api.inventivetalent.org/api/skyblock/darkauction/estimate")).data
    let magma = await (await get("https://hypixel-api.inventivetalent.org/api/skyblock/bosstimer/magma/estimatedSpawn")).data
    let interest = await (await get("https://hypixel-api.inventivetalent.org/api/skyblock/bank/interest/estimate")).data
    let newyear = await (await get("https://hypixel-api.inventivetalent.org/api/skyblock/newyear/estimate")).data

    //send res
    message.channel.send({
        embeds: [utils.Timers([zoo, jerry, spooky, auction, magma, interest, newyear])]
    })
}