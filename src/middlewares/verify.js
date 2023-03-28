const { StatusCodes } = require('http-status-codes')
const { AppError } = require("../errors/AppError");
const catchAsync = require("../errors/catchAsync")
const { getUser } = require("../services/auth")


const userExists = catchAsync( async( req, res, next ) => {
    const email = req.body.email;
    const found = await getUser({ email: email })

    if ( found ){
        throw new AppError(`Employee with email address exists!`, StatusCodes.CONFLICT );
    }
    next();
})

module.exports={ userExists }