const { StatusCodes } = require('http-status-codes')
const catchAsync = require("../errors/catchAsync");
const { getallUsers, deleteaUser } = require('../services/auth');

exports.getEmployees = catchAsync( async( req, res ) => {

    const users = await getallUsers()
    res.status( StatusCodes.OK ).json({
        status: true,
        nbhits: users.length,
        users: users
    })
})

exports.deleteUser = catchAsync( async( req, res ) => {

    const userId = req.params.id
    await deleteaUser({ _id: userId })

    res.status( StatusCodes.NO_CONTENT ).json({
        status: true,
        msg: null
    })
})

exports.me = catchAsync( async( req, res ) => {

    const user = req.user;
    user.password = undefined, user.user_type = undefined
    res.status( StatusCodes.OK ).json({
        status: true,
        data: user
    })
})