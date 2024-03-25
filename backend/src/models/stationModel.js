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
    }
});

const Station = mongoose.model("Station",stationSchema);

export {Station};