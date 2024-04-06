import mongoose from "mongoose";

const stationSchema = new mongoose.Schema({
    stationName : {
        type : String,
    },
    stationNumber : {
        type : Number,
    },
    platformCount : {
        type : Number,
    },
    state : {
        type : String,
    },
});

const Station = mongoose.model("Station",stationSchema);

export {Station};