const express = require('express')
const userController = require('../controllers/users')
const authenticate = require('../middlewares/authenticate')
const protect = require('../middlewares/protect')
const validateId = require('../middlewares/validateUserId')
const userRouter = express.Router()

userRouter
    .route('/')
    .get( authenticate, protect(["admin"]), userController.getEmployees )

userRouter
    .route('/:id')
    .delete( authenticate, protect(["admin"]), validateId, userController.deleteUser )

module.exports={ userRouter }