const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const ticketSchema = new Schema({
    meal:{
        type: String,
        required:[true, 'Meal name required!']
    },
    price: {
        type: String,
        required: [true, "Meal price required!"]
    },
    category:{
        type: String,
        required: [true, "Meal category required!"]
    },
    employeeId: {
        type: String,
        required: [true, 'employee ID is required!']
    },
    ticketId: {
        type: String,
        required: [true, 'Please provide ticket Id']
    },
    status: {
        type: String,
        enum: ["in progress", "served"],
        default: "in progress"
    }
}, { timestamps: true })


const ticketModel = mongoose.model('ticket', ticketSchema )
module.exports={ ticketModel }