const { ticketModel } = require("../models/ticket")


const saveTicket = async( object ) => {
    return ticketModel.create( object )
}

module.exports={ saveTicket }