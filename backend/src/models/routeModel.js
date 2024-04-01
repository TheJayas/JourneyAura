import mongoose from "mongoose";

const routeSchema = new mongoose.Schema({
    routeId : {
        type:Number
    },
    trainId : {
        type:Number
    },
    stationId : {
        type:Number
    },
    arrivalTime : {
        type: Date,
    },
    departureTime : {
        type: Date,
    },
    date : Date
});

const Route = mongoose.model("Route",routeSchema);

export {Route};