import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    trainId : {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Train'
    },
    from_station : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Station'
    },
    to_station : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Station'
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    seatId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StationToSeat'
    },
    status : {
        type: String,
        enum: ['confirmed','waiting']
    },
    date: Date
});

const Booking = mongoose.model("Booking",bookingSchema);

export {Booking};