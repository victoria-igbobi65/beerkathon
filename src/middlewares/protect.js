const { StatusCodes } = require('http-status-codes')
const catchAsync = require("../errors/catchAsync");
const { getUser } = require('../services/auth');
const { AppError } = require('../errors/AppError');
const { decodeToken } = require('../utils/helper');


module.exports = catchAsync( async( req, res, next) => {
    const token = req.cookies.refresh_token;

    if (!token) {
        throw new AppError("You are not logged in!", StatusCodes.FORBIDDEN );
    }
    const userId = (await decodeToken(token)).id;

    if( !userId){
        throw new AppError("Invalid token!", StatusCodes.FORBIDDEN )
    }
    const user = await getUser({ _id: userId })

    if ( user && !user.isAdmin){
        throw new AppError('Unauthorized action!', StatusCodes.UNAUTHORIZED )
    }

    next()
})