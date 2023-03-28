const express = require('express')

const authController = require('../controllers/auth')
const { signupDto } = require('../validators/auth');
const { userExists } = require('../middlewares/verify');
const authRouter = express.Router();

authRouter
    .route('/signup')
    .post( signupDto, userExists, authController.signup )


module.exports={ authRouter }