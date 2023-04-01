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
    userId: {
        type: mongoose.Types.ObjectId,
        required: [true, 'userId is required!']
    },
    ticketId: {
        type: String,
        required: [true, 'Please provide ticket Id']
    },
    status: {
        type: String,
        enum: ["used", "unused"],
        default: "unused"
    }
}, { timestamps: true })


const ticketModel = mongoose.model('ticket', ticketSchema )
module.exports={ ticketModel }