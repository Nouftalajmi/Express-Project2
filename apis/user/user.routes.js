const express = require('express')
const { signin, signup } = require('./user.controllers')
const uploader = require('../../middlewares/uploader')
const passport = require('passport')


const router = express.Router()

router.post('/signin', passport.authenticate('local', { session: false }), signin)
// passport.authenticate('local', { session: false })
// signup
router.post('/signup', uploader.single('image'), signup)

module.exports = router