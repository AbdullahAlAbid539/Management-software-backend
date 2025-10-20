const mongoose = require("mongoose")
const { Schema } = mongoose;

const studentSchema = new Schema({
    studentname:String,
    department: String,
    studentid: String,
    phonenumber: String,
    result: String
})

module.exports = mongoose.model("Student",studentSchema)