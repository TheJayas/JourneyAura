import mongoose from "mongoose";

const routeSchema = new mongoose.Schema({
    routeId : {
        type:String
    },
    trainId : {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Train'
    },
    stationId : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Station'
    },
    arrivalTime : {
        type: Date,
    },
    departureTime : {
        type: Date,
    },
    date : Date
});

export default mongoose.model("Route",routeSchema);