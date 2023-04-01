const express = require('express')
const userController = require('../controllers/users')

const protect = require('../middlewares/protect')
const userRouter = express.Router()

userRouter
    .route('/')
    .get( protect, userController.getEmployees )

module.exports={ userRouter }