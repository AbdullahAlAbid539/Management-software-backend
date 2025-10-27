const express = require ('express')
const mongoose = require('mongoose');
const User = require('./model/user')
const Student = require('./model/studentmodel')
const Teacher = require('./model/teachermodel')
var cors = require('cors');



// This is email verify message section
// const nodemailer = require("nodemailer");


const app = express()

// This is email verify message section

// const transporter = nodemailer.createTransport({
//   host: "smtp.ethereal.email",
//   port: 587,
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: "maddison53@ethereal.email",
//     pass: "jn7jnAPss4f63QBp6D",
//   },
// });
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://mng:sn7Zhef8oA591vNn@cluster0.np3i0c9.mongodb.net/mng?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected!'))


app.post('/account',async (req, res) => {


  let isUserexists = await User.findOne({email: req.body.email})

  if(isUserexists){
    return res.send(`${req.body.email} already exist`)
  }

  let isuser = await User.findOne({id:req.body.id})

  if(isuser){
    return res.send(`${req.body.id} already exists Please Enter Your Correct id`)
  }


    let user = new User({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        date:req.body.date,
        id:req.body.id
    }).save()
     res.send({
      username:isUserexists.username,
      email:isUserexists.email
     })
})

app.post('/login',async (req, res) => {


  let isUserexists = await User.findOne({email: req.body.email})
  let isuser = await User.findOne({id: req.body.id})

  if(!isUserexists){
    return res.send(`${req.body.email} not found`)
  }
  if(isUserexists.password !== req.body.password){
    return res.send(`Invalid Password`)
  }

  if(!isuser){
    return res.send(`${req.body.id} is doesnot found Please enter your correct id`)
  }
     res.send({
      username:isUserexists.username,
      email:isUserexists.email
     })
})

app.post('/studentdetail',async(req,res)=>{
  let student = new Student({
    studentname:req.body.studentname,
    department:req.body.department,
    studentid:req.body.studentid,
    phonenumber:req.body.phonenumber,
    result:req.body.result
  }).save()
  res.send("Student Data Added successfully")
})

app.post('/teacherdetail',async(req,res)=>{
  let teacher = new Teacher({
    teachername: req.body.teachername,
    teacherdepartment: req.body.teacherdepartment,
    teacherid: req.body.teacherid,
    teacherphonenumber: req.body.teacherphonenumber
  }).save()
  res.send("Teacher Data Added Succesfully")
})


app.get('/teacherlist',async(req,res)=>{
  let data = await Teacher.find({})
  res.send(data)
})
app.get('/teacher/:id',async(req,res)=>{
  console.log(req.params.id)
  let data = await Teacher.find({_id:req.params.id})
  res.send(data)
})
app.post('/deleteteacherdata',async(req,res)=>{
  let data = await Teacher.findByIdAndDelete({_id: req.body.id})
  res.send("Deleted")
})

app.get('/studentlist',async(req,res)=>{
  let data = await Student.find({})
  res.send(data)
})
app.get('/student/:id',async(req,res)=>{
  console.log(req.params.id)
  let data = await Student.find({_id:req.params.id})
  res.send(data)
})
app.post('/deletestudentdata',async(req,res)=>{
  let data = await Student.findByIdAndDelete({_id: req.body.id})
  res.send("Deleted")
})


app.listen(5000)