
import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Train } from "../models/trainModel.js";
import { Station } from "../models/stationModel.js";
import { Route } from "../models/routeModel.js";

const allDB = asyncHandler(async(req,res)=>{
    try {
        const models = {
            trains: await Train.find(),
            stations: await Station.find(),
            routes: await Route.find()
        };
        return res.json(new ApiResponse(200,models));
    } catch (err) {
        console.error(err);
        return res.json(new ApiError(401,"Unexpected error"));
    }
});
const trainDB = asyncHandler(async(req,res)=>{
    try {
        const trains= await Train.find();
        return res.json(new ApiResponse(200,trains));
    } catch (err) {
        console.error(err);
        return res.json(new ApiError(401,"Unexpected error"));
    }
});
const routesDB = asyncHandler(async(req,res)=>{
    try {
        const TRoutes= await Route.find();
        return res.json(new ApiResponse(200,TRoutes));
    } catch (err) {
        console.error(err);
        return res.json(new ApiError(401,"Unexpected error"));
    }
});
const stationDB = asyncHandler(async(req,res)=>{
    try {
        const stations= await Station.find();
        return res.json(new ApiResponse(200,stations));
    } catch (err) {
        console.error(err);
        return res.json(new ApiError(401,"Unexpected error"));
    }
});
export {allDB,trainDB,routesDB,stationDB};