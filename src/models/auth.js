const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const userSchema = new Schema({
    employeeId: {
        type: String,
        required: [true, "please provide employee ID number!"],
        unique: true
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
    user_type: {
        type: String,
        default: "user",
        enum: ["user", "admin", "vendor"],
        select: false
    }
})


userSchema.pre("save", async function ( next ) {
    // run thiis function if password wasmodified
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.correctPassword = async ( candidatePassword, userPassword) => {
    return await bcrypt.compare(candidatePassword, userPassword);
    
}; 

const userModel = mongoose.model('user', userSchema)
module.exports = { userModel }