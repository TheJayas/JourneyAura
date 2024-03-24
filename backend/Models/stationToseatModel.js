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

export default mongoose.model("StationToSeat",stationToseat);