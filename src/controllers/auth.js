const { StatusCodes } = require('http-status-codes')
const { AppError } = require("../errors/AppError");
const { getUser, addUser } = require("../services/auth");
const { uniqueId } = require('../utils/helper');
const catchAsync = require('../errors/catchAsync');
const { welcomeMail } = require('../utils/email/sendMail');

exports.signup = catchAsync( async( req, res) => {

    const { email } = req.body;
    const employeePassword = uniqueId()

    await addUser({ email: email, password: employeePassword })
    await welcomeMail( email, employeePassword )
    
    res.status( StatusCodes.OK ).json({
        status: true,
        msg: "User registration successful!"
    })
    

})