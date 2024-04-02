import { Train } from "../models/trainModel.js";
import { Station } from "../models/stationModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

//register train

const registerTrain = asyncHandler(async(req,res)=>{
    const {name,trainNumber,seatCount,coachCount,runsOnDays,intermediateStations} = req.body;
    const avtrain = (await Train.find({trainNumber:trainNumber}))[0];
    if(avtrain){return res.json(new ApiError(401,"Train with this name already exists!"));}
    const train = await Train.create({
        name,
        trainNumber,
        seatCount,
        coachCount,
        runsOnDays,
        intermediateStations
    });
    console.log(12345)
    if(!train){
        console.log(1223);
        return res.json(new ApiError(401,"Unexpected error"));
    }

    return res.json(new ApiResponse(200,train));
});

const getTrainDetails = asyncHandler(async(req,res)=>{
    const train = (await Train.find({trainNumber:req.params.id}))[0];
    return res.json(new ApiResponse(200,train));
});

const addIntermediateStation = asyncHandler(async(req,res)=>{
    const {trainId,stationId} = req.body;
    const train = await Train.find({trainNumber:trainId});
    const station = await Station.find({stationNumber:stationId});
    if(!train){
        return res.json(new ApiError(401,"Train not found"));
    }
    if(!station){
        return res.json(new ApiError(401,"Station not found"));
    }
    // console.log(train[0]);
    // console.log(station[0]);
    // console.log(station.stationNumber);
    const stationNum = station[0].stationNumber;
    // console.log(stationNum);

    if(!stationNum){
        return res.json(new ApiError(401,"StationNum not found"));
    }
    (train[0].intermediateStations).push(stationNum);
    await train[0].save();
    return res.json(new ApiResponse(200,train));
});

const updateTrain = asyncHandler(async(req,res)=>{
    const {name,trainNumber,seatCount,coachCount,runsOnDays} = req.body;
    const train = (await Train.find({trainNumber:trainNumber}))[0];
    if(!train){
        return res.json(new ApiError(401,"Train not found"));
    }
    if(name)
    {train.name = name;}
    if(seatCount){train.seatCount = seatCount;}
    if(coachCount){train.coachCount = coachCount;}
    if(runsOnDays){train.runsOnDays = runsOnDays;}
    await train.save();
    return res.json(new ApiResponse(200,train));
});



export {registerTrain,getTrainDetails,addIntermediateStation,updateTrain};