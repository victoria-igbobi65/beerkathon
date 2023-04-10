const express = require('express')

const authController = require('../controllers/auth')
const { signupDto, loginDto } = require('../validators/auth');
const { userExists } = require('../middlewares/verify');
const authenticate = require('../middlewares/authenticate')
const protect = require('../middlewares/protect')
const authRouter = express.Router();

authRouter
    .route('/signup')
    .post( authenticate, protect(["admin"]), signupDto, userExists, authController.signup )

authRouter
    .route('/vendor/signup')
    .post( authController.signup )

authRouter
    .route('/login')
    .post( loginDto, authController.login )

authRouter
    .route('/admin/login')
    .post( loginDto, authController.login )

authRouter
    .route('/vendor/login')
    .post( loginDto, authController.login )

module.exports={ authRouter }