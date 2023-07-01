const LocalStrategy = require('passport-local').Strategy
const User = require('../db/models/User')
const bcrypt = require('bcrypt')
const JwtStrategy = require('passport-jwt').Strategy
const { fromAuthHeaderAsBearerToken } = require('passport-jwt').ExtractJwt
require('dotenv').config()

const localStrategy = new LocalStrategy({
    usernameField: "username",
    passwordField: "password",

}, async (username, password, done) => {
    try {
        const foundUser = await User.findOne({
            username: username
        })
        if (!foundUser) return done({ message: "username or password is wrong" })

        const passwordMatch = await bcrypt.compare(password, foundUser.password)
        if (!passwordMatch) return done({ message: "username or password is wrong!! " })
        // req.user = foundUser
        done(null, foundUser)
    } catch (error) {
        done(error)
    }
})



const jwtStrategy = new JwtStrategy({
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY
}, async (jwt_payload, done) => {
    try {
        const foundUser = await User.findOne({
            username: jwt_payload.username
        })
        if (!foundUser) return done(null, false)
        done(null, foundUser)
    } catch (error) {
        done(error)
    }
})

module.exports = { localStrategy, jwtStrategy }