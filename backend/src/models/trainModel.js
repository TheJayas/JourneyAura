import mongoose from "mongoose";

const trainSchema = new mongoose.Schema({
    name : {
        type:String,
    },
    trainNumber : {
        type:Number,
    },
    seatCount : {
        type:Number
    },
    coachCount : {
        type:Number
    },
    runsOnDays : {
        type:Number
    }
});

const Train = mongoose.model("Train",trainSchema);

export {Train};