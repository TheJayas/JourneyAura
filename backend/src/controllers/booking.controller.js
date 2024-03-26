import { Booking } from "../models/bookingModel.js";
import { StationToSeat } from "../models/stationToseatModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

//register train

const bookTicker = asyncHandler(async(req,res)=>{
    const {trainId,from_station,to_station,date} = req.body;
    const userId = req.params.id;
    const bookedSeat1= await StationToSeat.findOne({trainId,stationId:from_station,date});
    const bookedSeat2= await StationToSeat.findOne({trainId,stationId:to_station,date});
    
    const booking = await Booking.create({
        trainId,
        from_station,
        to_station,
        seatId,
        userId,
        date
    });
    if(!booking){
        return res.json(new ApiError(401,"Unexpected error"));
    }

    return res.json(new ApiResponse(200,booking));
});

export {};