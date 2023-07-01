const { model, Schema } = require('mongoose')

const UserSchema = new Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String },
    password: { type: String, required: true },
    image: { type: String },
    isStaff: { type: Boolean, default: false },



})

module.exports = model('User', UserSchema)