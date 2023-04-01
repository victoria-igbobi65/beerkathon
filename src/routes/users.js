const express = require('express')
const userController = require('../controllers/users')

const protect = require('../middlewares/protect')
const validateId = require('../middlewares/validate')
const userRouter = express.Router()

userRouter
    .route('/')
    .get( protect, userController.getEmployees )

userRouter
    .route('/:id')
    .delete( protect, validateId, userController.deleteUser )

module.exports={ userRouter }