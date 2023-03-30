const { StatusCodes } = require('http-status-codes')
const { AppError } = require("../errors/AppError");
const catchAsync = require("../errors/catchAsync");
const { getUser } = require("../services/auth");
const { decodeToken } = require("../utils/helper");


module.exports =  catchAsync( async( req, res, next) => {
    const token = req.cookies.refresh_token;

    if ( !token ){
        throw new AppError("You are not logged in!", StatusCodes.FORBIDDEN);
    }

    const userId = (await decodeToken(token)).id;
    if (!userId){
        throw new AppError("Invalid token!", StatusCodes.FORBIDDEN );
    }

    const user = await getUser({ _id: userId })
    if( !user ){
        throw new AppError('User no longer exists!', StatusCodes.FORBIDDEN )
    }

    req.user = userId;
    next()
})