const { StatusCodes } = require('http-status-codes')
const catchAsync = require("../errors/catchAsync");
const { AppError } = require('../errors/AppError');
const { getUser } = require('../services/auth');


const eligible = catchAsync( async( req, res, next ) => {
    
    const user = req.user;

    if ( !user.ticketAvailable ){
        throw new AppError("Check back tomorrow for tickets!", StatusCodes.BAD_REQUEST )
    }
    next();
})

module.exports={ eligible }