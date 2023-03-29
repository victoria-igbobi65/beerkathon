const { StatusCodes } = require('http-status-codes')
const { AppError } = require("../errors/AppError");
const { getUser, addUser } = require("../services/auth");
const { uniqueId, signToken, setCookies } = require('../utils/helper');
const catchAsync = require('../errors/catchAsync');
const { welcomeMail } = require('../utils/email/sendMail');
const transaction = require('../utils/mongooseTrans')

exports.signup = catchAsync( async( req, res) => {

    const { email } = req.body;
    const employeePassword = uniqueId()
    
    await transaction( async( session ) => {
        await addUser({ email: email, password: employeePassword });
        await welcomeMail(email, employeePassword);
    })
    
    res.status( StatusCodes.OK ).json({
        status: true,
        msg: "User registration successful!"
    })   

})

exports.login = catchAsync( async( req, res) => {

    const { email, password } = req.body;
    const user = await getUser({ email: email })

    if ( !user || !( await user.correctPassword(password, user.password ))){
        throw new AppError( 'email or password incorrect!', StatusCodes.BAD_REQUEST )
    }

    const token = signToken( user._id )
    setCookies( res, 'refresh_token', token )

    res.status( StatusCodes.OK ).json({
        status: true,
        msg: "Login successful!"
    })
})