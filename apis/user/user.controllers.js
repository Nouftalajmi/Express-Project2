const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const User = require('../../db/models/User');
require("dotenv").config()
const hashPassword = async (password, next) => {
    try {
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds)
        return hashPassword
    } catch (error) {
        next(error)
    }

}
const generateToken = (user) => {
    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXP
    })
    return token
}
const signup = async (req, res, next) => {
    try {
        const { password } = req.body
        req.body.password = await hashPassword(password, next)
        // const hashPassword = await hashPassword(password, next)

        const user = await User.create(req.body)
        const token = generateToken(user)
        return res.json({ token })
    } catch (error) {
        next(error)
    }
}

const signin = async (req, res, next) => {
    try {

        const token = await generateToken(req.user)
        return res.json({ token })
    } catch (error) {
        next(error)
    }
}

module.exports = { signin, signup }