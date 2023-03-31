const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const userSchema = new Schema({
    _id: {
        type: String,
        required: [true, "please provide employee ID number!"],
    },
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
    ticketAvailable: {
        type: Boolean,
        default: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})


userSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.correctPassword = async ( candidatePassword, userPassword) => {
    return await bcrypt.compare(candidatePassword, userPassword);
}; 

const userModel = mongoose.model('user', userSchema)
module.exports = { userModel }