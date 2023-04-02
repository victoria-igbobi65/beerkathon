const { userModel } = require("../models/auth")


const addUser = async( object ) => {
    return userModel.create( object )
}

const getUser = async( object ) => {
    return userModel.findOne( object ).select("+password +isAdmin +user_type")
}

const getallUsers = async() => {
    return userModel.find({ user_type: "user" })
}

const deleteaUser = async( object ) => {
    return userModel.findByIdAndDelete( object )
}  

module.exports = { addUser, getUser, getallUsers, deleteaUser }