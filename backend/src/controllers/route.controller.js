import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Route } from "../models/routeModel.js";

const addRoute = asyncHandler(async (req, res) => {
    const { routeId ,trainId, stationId, arrivalTime, departureTime,day } = req.body;
    const route = await Route.create({
        routeId,
        trainId,
        stationId,
        arrivalTime,
        departureTime,
        day
    });
    if (!route) {
        return res.json(new ApiError(401, "Unexpected error"));
    }
    return res.json(new ApiResponse(200, route));
});

export { addRoute };