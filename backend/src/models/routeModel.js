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
        type: String,
    },
    departureTime : {
        type: String,
    },
    day : [{
        type:Number
    }]
});

const Route = mongoose.model("Route",routeSchema);

export {Route};