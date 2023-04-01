const express = require('express')
const ticketController = require('../controllers/ticket')
const authenticateUser = require('../middlewares/authenticate');
const validateTicketId = require('../middlewares/validateTicketId')
const protect = require('../middlewares/protect')
const { eligible } = require('../middlewares/eligibile');


const ticketRouter = express.Router();

ticketRouter
    .route('/')
    .post( authenticateUser, protect(["user"]), eligible, ticketController.ticket )
    .get( authenticateUser, protect(['admin', 'vendor']), ticketController.allOrders )


ticketRouter
    .route('/:id')
    .patch( authenticateUser, protect(["vendor"]), validateTicketId, ticketController.updateTicket )


module.exports={ ticketRouter }