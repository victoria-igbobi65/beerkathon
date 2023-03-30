const express = require('express')
const ticketController = require('../controllers/ticket')
const authenticateUser = require('../middlewares/authenticate');
const { eligible } = require('../middlewares/eligibile');


const ticketRouter = express.Router();

ticketRouter
    .route('/')
    .get( authenticateUser, eligible, ticketController.ticket )


module.exports={ ticketRouter }