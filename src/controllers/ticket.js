const { StatusCodes } = require('http-status-codes')
const catchAsync = require("../errors/catchAsync");
const { generateTicket } = require("../utils/helper");
const { saveTicket, updateTicketStatus, getTicket, getTickets } = require('../services/ticket');


exports.ticket = catchAsync( async( req, res ) => {

    const { meal, price } = req.body;
    const user = req.user;

    const ticket = generateTicket()
    await saveTicket({ meal: meal, price: price, employeeId : user.employeeId, ticketId: ticket });

    /* update ticket availability status */
    user.ticketAvailable = false;
    await user.save()

    res.status( StatusCodes.OK ).json({
        data: ticket 
    })
})

exports.updateTicket = catchAsync( async( req, res ) => {

    const mealTicketId = req.params.id, status = "served"
    const updatedTicket = await updateTicketStatus( mealTicketId, status )

    res.status( StatusCodes.OK ).json({
        status: true,
        data: updatedTicket
    })

})

exports.allOrders = catchAsync( async( req, res ) => {

    const orders = await getTickets()
    res.status( StatusCodes.OK ).json({
        status: true,
        nbhits: orders.length,
        data: orders
    })
})