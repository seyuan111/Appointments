const mongoose = require("mongoose")
const appointmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    update: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Appointment", appointmentSchema, "posts")