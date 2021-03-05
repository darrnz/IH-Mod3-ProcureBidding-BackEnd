const router = require('express').Router()
const { verifyToken } = require('../config/jwt.config')
const passport = require('../config/passport.config')
const { signin, login, loggedUser, logout } = require('../controllers/auth.controller')

router.post('/signin', signin)
router.post('/login', passport.authenticate('local'), login)
router.get('/logged', verifyToken, loggedUser)
router.get('/logout', logout)

module.exports = router