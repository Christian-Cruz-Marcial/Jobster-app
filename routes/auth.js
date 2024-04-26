const express = require('express')
const router = express.Router()
const authinticateUser = require('../middleware/authentication')
const testUser  = require('../middleware/testUser')
const { register, login, updateUser } = require('../controllers/auth')

const rateLimiter = require('express-rate-limit')
const apiLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {msg:'Too any requests from this IP, please wait 15 minutes'},
})

router.post('/register', apiLimiter, register)
router.post('/login', apiLimiter, login)
router.patch('/updateUser', authinticateUser, testUser, updateUser)


module.exports = router
