const { StatusCodes } = require('http-status-codes')
const catchAsync = require("../errors/catchAsync");
const { getUser } = require("../services/auth");
const { generateTicket } = require("../utils/helper");
const { saveTicket } = require('../services/ticket');


exports.ticket = catchAsync( async( req, res ) => {

    const { meal, price } = req.body;
    const userId = req.user;
    const user = await getUser({ _id: userId })

    const ticket = generateTicket()
    await saveTicket({ meal: meal, price: price, userId : userId, ticketId: ticket });

    /* update ticket availability status */
    user.ticketAvailable = false;
    await user.save()

    res.status( StatusCodes.OK ).json({
        ticket: ticket 
    })
})