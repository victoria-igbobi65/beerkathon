const { StatusCodes } = require("http-status-codes");
const catchAsync = require("../errors/catchAsync");
const { getUser } = require("../services/auth");
const { AppError } = require("../errors/AppError");


module.exports = catchAsync( async( req, res, next ) => {

    const id = req.params.id;

    const found = await getUser({ _id: id })
    if ( !found ){
        throw new AppError(`User with ID: ${ id } doesn't exist!`, StatusCodes.NOT_FOUND )
    }
    next()
})