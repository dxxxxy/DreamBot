const mongoose = require("mongoose")

const registerSchema = mongoose.Schema({
    userID: String,
    userUUID: String
})

module.exports = mongoose.model("Register", registerSchema)