import mongoose from "mongoose";

const bankAccSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    accNo : {
        type: Number,
        unique: true,
        required: true
    },
    balance : {
        type: Number
    },
    phonenumber : {
        type: Number
    }
});

const BankAcc = mongoose.model("BankAcc",bankAccSchema);

export {BankAcc};