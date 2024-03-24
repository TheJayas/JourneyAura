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

export default mongoose.model("Train",trainSchema);