const { userModel } = require("../models/auth")


const addUser = async( object ) => {
    return userModel.create( object )
}

const getUser = async( object ) => {
    return userModel.findOne( object ).select("+password +isAdmin")
}

const getallUsers = async() => {
    return userModel.find({ isAdmin: false })
}

module.exports = { addUser, getUser, getallUsers }