import mongoose from "mongoose";

const trainSchema = new mongoose.Schema({
    name : {
        type:String,
        unique:true
    },
    trainNumber : {
        type:Number,
        unique:true
    },
    seatCount : {
        type:Number
    },
    coachCount : {
        type:Number
    },
    runsOnDays : [{
        type:Number
    }],
    intermediateStations : [{
        type:Number
    }],
});

const Train = mongoose.model("Train",trainSchema);

export {Train};