const { ticketModel } = require("../models/ticket")
const { date } = require("../utils/helper")


const saveTicket = async( object ) => {
    return ticketModel.create( object )
}

const updateTicketStatus = async( id, status ) => {
    return ticketModel.findOneAndUpdate(id, { $set: { status }}, { new: true, runValidators: true })
}

const getTicket = async( object ) => {
    return ticketModel.findOne( object )
}

const getTickets = async( object ) => {
    return ticketModel.find( object.query )
                .sort( object.sortBy )
                .skip( object.skip )
                .limit( object.limit )
}

const topMeal = async() => {
    
    return ticketModel.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: date().startOfWeek,
                },
            },
        },
        {
            $group: {
                _id: "$meal",
                count: { $sum: 1 }
            }
        },
        {
            $sort:{
                count: -1
            }
        },
    ]);
}

const orderStats = async() => {

    return ticketModel.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: date().month,
                },
            },
        },
        {
            $group: {
                _id: {
                    $dateToString: {
                        format: "%Y-%m-%d",
                        date: "$createdAt",
                    },
                },
                count: {
                    $sum: 1,
                },
            },
        },
    ]);
}

module.exports={ saveTicket, updateTicketStatus, getTicket, getTickets, topMeal, orderStats }