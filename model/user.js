const mongoose = require("mongoose")
const { Schema } = mongoose;

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    date: Date,
    id: String
})

module.exports = mongoose.model("User",userSchema)

