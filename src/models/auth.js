const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Please provide a valid email address!"],
        unique: true
    },
    password: {
        type: String,
        select: false,
        required: [true, "Please provide password!"],
    },
    isMealAvailable: {
        type: Boolean,
        default: true
    }
})


userSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const userModel = mongoose.model('user', userSchema)
module.exports = { userModel }