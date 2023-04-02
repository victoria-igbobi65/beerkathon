const express = require('express');
const authenticate = require('../middlewares/authenticate');
const protect = require('../middlewares/protect');
const userController = require('../controllers/users')

const meRouter = express.Router();

meRouter
    .route('/')
    .get( authenticate, protect(["user"]), userController.me )


module.exports={ meRouter }