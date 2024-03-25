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
    seatsBooked : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    date: Date
});

const StationToSeat = mongoose.model("StationToSeat",stationToseat);

export {StationToSeat};