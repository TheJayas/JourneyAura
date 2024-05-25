import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    paymentStatus : {
        type : String,
        required : true,
    },
    paymentAmount : {
        type : Number,
        required : true,
    },
    paymentDate : {
        type : Date,
        required : true,
    },
    paymentTime : {
        type : String,
        required : true,
    },
    paymentUser : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    paymentTrain : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Train',
        required : true,
    },
});