const mongoose = require("mongoose")

const registerSchema = mongoose.Schema({
    discordID: String,
    minecraftID: String
})

module.exports = mongoose.model("Register", registerSchema)