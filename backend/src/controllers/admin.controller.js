
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
export {allDB};