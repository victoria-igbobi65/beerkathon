const { StatusCodes } = require('http-status-codes')
const { AppError } = require("../errors/AppError");
const { getUser } = require("../services/auth");

exports.signup = async( req, res) => {
    const { email } = req.body;

    const userExists = await getUser({ email: email })

    if ( userExists ){
        throw new AppError(`Employee with email address exists!`, StatusCodes.CONFLICT )
    }
    res.status( StatusCodes.OK).json({
        email
    })
    

}