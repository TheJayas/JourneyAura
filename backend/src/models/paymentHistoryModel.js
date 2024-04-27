import mongoose from "mongoose";

const paymentHistorySchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    amount : {
        type: Number
    },
    date : {
        type: Date
    },
    toAccNo : {
        type: Number
    },
    status : {
        type: String,
        enum: ['success','failed']
    }
});

const PaymentHistory = mongoose.model("PaymentHistory",paymentHistorySchema);

export {PaymentHistory};