const { StatusCodes } = require('http-status-codes')
const catchAsync = require("../errors/catchAsync");
const { getallUsers } = require('../services/auth');

exports.getEmployees = catchAsync( async( req, res ) => {

    const users = await getallUsers()
    res.status( StatusCodes.OK ).json({
        status: true,
        nbhits: users.length,
        users: users
    })
})