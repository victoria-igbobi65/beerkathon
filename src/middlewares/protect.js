const { StatusCodes } = require('http-status-codes')
const catchAsync = require("../errors/catchAsync");
const { getUser } = require('../services/auth');
const { AppError } = require('../errors/AppError');
const { decodeToken } = require('../utils/helper');


module.exports = ( roles ) => {
    return catchAsync(async (req, res, next) => {
        
        const user = req.user;
        if( !roles.includes( user.user_type )){
            throw new AppError('Unauthorized action!', StatusCodes.UNAUTHORIZED )
        }
        
        next();
    });
}