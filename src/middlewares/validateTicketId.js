const { StatusCodes } = require("http-status-codes");
const catchAsync = require("../errors/catchAsync");
const { getTicket } = require("../services/ticket");
const { AppError } = require("../errors/AppError");


module.exports = catchAsync( async( req, res, next ) => {

    const id = req.params.id;
    const found = await getTicket({ _id: id })

    if( !found ){
        throw new AppError('Order doesn\'t exist!', StatusCodes.NOT_FOUND )
    }

    next();
})