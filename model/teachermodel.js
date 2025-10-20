const mongoose = require ('mongoose')
const {Schema} = mongoose;

const teacherSchema = new Schema({
    teachername: String,
    department : String,
    teacherid: String,
    phonenumber: String
})

module.exports = mongoose.model("Teacher",teacherSchema)