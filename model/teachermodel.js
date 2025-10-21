const mongoose = require ('mongoose')
const {Schema} = mongoose;

const teacherSchema = new Schema({
    teachername: String,
    teacherdepartment : String,
    teacherid: String,
    teacherphonenumber: String
})

module.exports = mongoose.model("Teacher",teacherSchema)