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

    console.log( userId )
    res.status( StatusCodes.NO_CONTENT ).json({
        status: true,
        msg: null
    })
})