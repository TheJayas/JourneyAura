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

export default mongoose.model("Station",stationSchema);