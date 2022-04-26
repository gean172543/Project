const express = require('express')
const authController = require('./../controllers/authController')
const router = express.Router()

router.post('/login', authController.Login)
router.post('/register', authController.Register)
router.post('/registerAdmin', authController.RegisterAdmin)
module.exports = router