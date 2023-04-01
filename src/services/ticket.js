const { ticketModel } = require("../models/ticket")


const saveTicket = async( object ) => {
    return ticketModel.create( object )
}

const updateTicketStatus = async( id, status ) => {
    return ticketModel.findOneAndUpdate(id, { $set: { status }}, { new: true, runValidators: true })
}

const getTicket = async( object ) => {
    return ticketModel.findOne( object )
}

const getTickets = async() => {
    return ticketModel.find({})
}

module.exports={ saveTicket, updateTicketStatus, getTicket, getTickets }