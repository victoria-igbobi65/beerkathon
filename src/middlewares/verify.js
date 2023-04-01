const { StatusCodes } = require('http-status-codes')
const { AppError } = require("../errors/AppError");
const catchAsync = require("../errors/catchAsync")
const { getUser } = require("../services/auth")


const userExists = catchAsync( async( req, res, next ) => {
    
    const { email, id } = req.body;
    const found = await getUser({ $or: [{ employeeId: id }, { email: email }]})

    if ( found ){
        throw new AppError(`Employee exists!`, StatusCodes.CONFLICT );
    }
    next();
})

module.exports={ userExists }