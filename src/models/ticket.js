const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const ticketSchema = new Schema({
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