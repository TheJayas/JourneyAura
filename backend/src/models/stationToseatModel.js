import mongoose from "mongoose";

const stationToseat = new mongoose.Schema({
    trainId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Train'
    },
    stationId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Station'
    },
    seatsBooked: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        seatNumber: Number
    }],
    

    date: Date
});

const StationToSeat = mongoose.model("StationToSeat",stationToseat);

export {StationToSeat};