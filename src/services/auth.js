const { userModel } = require("../models/auth")


const addUser = async( object ) => {
    return userModel.create( object )
}

const getUser = async( object ) => {
    return userModel.findOne( object ).select("+password")
}

module.exports = { addUser, getUser }