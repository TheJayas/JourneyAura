import { Train } from "../models/trainModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

//register train

const registerTrain = asyncHandler(async(req,res)=>{
    const {name,trainNumber,seatCount,coachCount,runsOnDays} = req.body;
    
    const train = await Train.create({
        name,
        trainNumber,
        seatCount,
        coachCount,
        runsOnDays
    });
    if(!train){
        return res.json(new ApiError(401,"Unexpected error"));
    }

    return res.json(new ApiResponse(200,train));
});

const getTrainDetails = asyncHandler(async(req,res)=>{
    const train = await Train.findById(req.user.id);
    return res.json(new ApiResponse(200,train));
});

const addIntermediateStation = asyncHandler(async(req,res)=>{
    const {stationId} = req.body;
    const train = await Train.findById(req.user.id);
    if(!train){
        return res.json(new ApiError(401,"Train not found"));
    }
    train.intermediateStations.push(stationId);
    await train.save();
    return res.json(new ApiResponse(200,train));
});

const updateTrain = asyncHandler(async(req,res)=>{
    const {name,trainNumber,seatCount,coachCount,runsOnDays} = req.body;
    const train = await Train.findById(req.user.id);
    if(!train){
        return res.json(new ApiError(401,"Train not found"));
    }
    if(name)
    {train.name = name;}
    if(trainNumber){train.trainNumber = trainNumber;}
    if(seatCount){train.seatCount = seatCount;}
    if(coachCount){train.coachCount = coachCount;}
    if(runsOnDays){train.runsOnDays = runsOnDays;}
    await train.save();
    return res.json(new ApiResponse(200,train));
});



export {registerTrain,getTrainDetails,addIntermediateStation,updateTrain};