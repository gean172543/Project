const User = require('../models/subscriber')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
exports.Login = async (req, res, next) => {
  // pass in request data here to create user from user schema
  try {
    const aa = req.body.username
    const user = await User.findOne({ username: req.body.username })
    console.log(aa);
    if (user) {
      console.log('Found User');
    }
    if (!user) {
      //req.flash('msg', 'อีเมลไม่ถูกต้อง')
      console.log('Notfound User');
      res.redirect('/login')
    }
    const validated = await bcrypt.compare(req.body.password, user.password)
    if (validated === false) {
      //req.flash('msg', 'รหัสผ่านไม่ถูกต้อง')
      res.redirect('back')
    }
    const admin = user.isAdmin
    if (admin === true) {
      res.redirect('/admin')
    } else { 
      res.redirect('/index2') 
      console.log('Login Success');
    }
    // if user can't be created, throw an error
  } catch (err) {
    next(err)
  }
}

// const signToken = id => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES_IN
//   })
// }

// const createUserToken = async (user, code, req, res) => {
//   const token = signToken(user._id)

//   // cookie settings
//   res.cookie('jwt', token, {
//     expires: new Date(Date.now() + 10 * 1000),
//     httpOnly: true
//   })

//   // remove user password from output
//   user.password = undefined
//   res.redirect('/login')
// }


exports.Register = async (req, res, next) => {
  // pass in request data here to create user from user schema
  try {
    const salt = await bcrypt.genSalt(10)
    const hashPass = await bcrypt.hash(req.body.password, salt)
    const newUser = await User.create({
      name: req.body.name,
      username: req.body.username,
      password: hashPass

    })
    res.redirect('/login')
    // createUserToken(newUser, 201, req, res)
    // if user can't be created, throw an error
  } catch (err) {
    next(err)
    res.redirect('/register')
  }
}

exports.RegisterAdmin = async (req, res, next) => {
  // pass in request data here to create user from user schema
  try {
    const salt = await bcrypt.genSalt(10)
    const hashPass = await bcrypt.hash(req.body.password, salt)
    const newUser = await User.create({
      name: req.body.name,
      username: req.body.username,
      password: hashPass

    })
    res.redirect('/admin')
    // createUserToken(newUser, 201, req, res)
    // if user can't be created, throw an error
  } catch (err) {
    next(err)
    res.redirect('/member_add')
  }
}