const { StatusCodes } = require('http-status-codes')
const catchAsync = require("../errors/catchAsync");
const { generateTicket, APIFEATURES, date } = require("../utils/helper");
const { saveTicket, updateTicketStatus, getTickets, topMeal, orderStats } = require('../services/ticket');



exports.ticket = catchAsync( async( req, res ) => {

    const { meal, price, category } = req.body;
    const user = req.user;

    const ticket = generateTicket()
    await saveTicket({ meal: meal, price: price, category: category, employeeId : user.employeeId, ticketId: ticket });

    /* update ticket availability status */
    user.ticketAvailable = false;
    await user.save()

    res.status( StatusCodes.OK ).json({
        data: ticket 
    })
})

exports.updateTicket = catchAsync( async( req, res ) => {

    const mealTicketId = req.params.id, status = "served"
    await updateTicketStatus( mealTicketId, status )

    res.status( StatusCodes.OK ).json({
        status: true,
        msg: "Meal status update successful!"
    })

})

exports.allOrders = catchAsync( async( req, res ) => {

    const query = APIFEATURES( false, { ...req.query } )
    const orders = await getTickets( query )

    res.status( StatusCodes.OK ).json({
        status: true,
        nbhits: orders.length,
        data: orders
    })
})

exports.topFiveMealOfWeek = catchAsync( async( req, res) => {
    const weekTopMeal = await topMeal()

    res.status( StatusCodes.OK ).json({
        status: true,
        nbhits: weekTopMeal.length,
        data: weekTopMeal
    })
})


exports.dailyOrders = catchAsync( async( req, res ) => {
    
    const query = APIFEATURES( false, { ...req.query } );
    const orders = await getTickets( query )

    res.status( StatusCodes.OK ).json({
        status: true,
        nbhits: orders.length,
        data: orders
    })
})


exports.orderStats = catchAsync( async( req, res) => {

    const stats = await orderStats()
    res.status( StatusCodes.OK ).json({
        status: true,
        data: stats
    })
})