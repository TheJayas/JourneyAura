import mongoose from "mongoose";

const passengerSchema = new mongoose.Schema({
    name : {
        type: String,
        required:[true,"Please enter passenger's name"]
    },
    dob : {
        type:Date,
        required:[true,"Please enter passenger's date of birth"]
    },
    berthPreference : {
        type:String,
        required:[true,"Please enter passenger's berth preference"],
        enum: ['lower','middle','upper','side lower','side upper']
    },
    mealPreference : {
        type:String,
        required:[true,"Please enter passenger's meal preference"],
        enum:['veg','non-veg']
    },
    govtId : {
        type:Number,
        required:[true,"Please enter passenger's government id"]
    }
});

const Passenger = mongoose.model("Passenger",passengerSchema);

export {Passenger};