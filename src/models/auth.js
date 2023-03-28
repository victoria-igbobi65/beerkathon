const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Please provide a valid email address!"],
        unique: true
    },
    password: {
        type: String,
        select: false
    },
    isMealAvailable: {
        type: Boolean,
        default: true
    }
})

const userModel = mongoose.model('user', userSchema)
module.exports = { userModel }