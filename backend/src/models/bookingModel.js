import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    trainId : {
        type:Number
    },
    from_station : {
        type:Number
    },
    to_station : {
        type:Number
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    seatId : {
        type:Number
    },
    status : {
        type: String,
        enum: ['confirmed','waiting']
    },
    date: Date
});

const Booking = mongoose.model("Booking",bookingSchema);

export {Booking};