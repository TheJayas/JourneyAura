import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    trainId : {
        type:Number
    },
    from_station : {
        type:Number
    },
    to_station : {
        type:Number
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    seatId : {
        type:Number
    },
    status : {
        type: String,
        enum: ['confirmed','waiting']
    },
    date: {
        type: Date,
        index: { expires: '1d' } 
    },
    cancel : {
        type: Boolean,
    },
    pnr : {
        type: Number,
        unique: true,
        required: true
    }
});

const Booking = mongoose.model("Booking",bookingSchema);

export {Booking};