require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const authRouter = require('./routes/login')
const bodyParser = require('body-parser')
app.set('views', './views')
app.set ('view-engine', 'ejs')
app.use(express.static('public'))

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open',() => console.log('Connected to Database'))

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers', subscribersRouter)

app.get("/",(req, res) =>{
    res.render("index.ejs");
  });
app.get('/login',(req,res) =>{
    res.render('login.ejs')
})

app.get('/register',(req,res) =>{
  res.render('register.ejs')
})
app.get('/sparkall',(req,res) =>{
  res.render('sparkall.ejs')
})
app.get('/room1',(req,res) =>{
  res.render('room1.ejs')
})
app.get('/room2',(req,res) =>{
  res.render('room2.ejs')
})
app.get('/index2',(req,res) =>{
  res.render('index2.ejs')
})
app.get('/admin',(req,res) =>{
  res.render('admin.ejs')
})
app.get('/member_add',(req,res) =>{
  res.render('member_add.ejs')
})
app.get('/room',(req,res) =>{
  res.render('room.ejs')
})
app.get('/room_add',(req,res) =>{
  res.render('room_add.ejs')
})
app.get('/managerroom',(req,res) =>{
  res.render('managerroom.ejs')
})

app.post('/register',(req,res) =>{})

app.post('/sparkall',(req,res) =>{})
app.post('/room1',(req,res) =>{})
app.post('/room2',(req,res) =>{})
app.post('/index2',(req,res)=>{})
app.post('/admin',(req,res)=>{})
app.post('/member_add',(req,res)=>{})
app.post('/room',(req,res)=>{})
app.post('/room_add',(req,res)=>{})
app.post('/managerroom',(req,res)=>{})

app.use('/auth/', authRouter)


app.listen(5000 , () => console.log('Server Started'))