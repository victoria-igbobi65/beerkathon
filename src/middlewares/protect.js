const { StatusCodes } = require('http-status-codes')
const catchAsync = require("../errors/catchAsync");
const { getUser } = require('../services/auth');
const { AppError } = require('../errors/AppError');
const { decodeToken } = require('../utils/helper');


module.exports = catchAsync( async( req, res, next) => {
    const token = req.cookies.refresh_token;

    if (!token) {
        throw new AppError("You are not logged in!", StatusCodes.UNAUTHORIZED);
    }
    const userId = (await decodeToken(token)).id;
    const user = await getUser({ _id: userId })

    if ( !user.isAdmin){
        throw new AppError('Unauthorized action!', StatusCodes.UNAUTHORIZED )
    }

    next()
})