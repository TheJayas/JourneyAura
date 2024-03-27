import mongoose from "mongoose";

const stationToseat = new mongoose.Schema({
    trainId : {
        type:Number
    },
    stationId : {
        type:Number
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