import asyncHandler from "../utils/asyncHandler.js";
import { Train } from "../models/trainModel.js";
import { Route } from "../models/routeModel.js";
import { StationToSeat } from "../models/stationToseatModel.js";
import { ApiError } from "../utils/ApiError.js";

const searchTrain = asyncHandler(async (req, res) => {
  const { from, to, date } = req.body;
  const day = new Date(date).getDay();
  console.log(from, to, date, day);
  const trains = await Train.find({
    intermediateStations: {
      $all: [from, to],
    },
    runsOnDays: {
      $in: [day],
    },
  });

  if (!trains) {
    return res.json(new ApiError(404, "No trains found"));
  }

  const trainDetails = await Promise.all(
    trains.map(async (train) => {
      try {
        const route = await Route.find({ trainId: train.trainNumber });
        const fromStation = route.find((r) => r.stationId === from);
        const toStation = route.find((r) => r.stationId === to);
    
        const fromTime = fromStation.arrivalTime;
        const toTime = toStation.arrivalTime;
        const seats = await StationToSeat.find({
          trainId: train.trainNumber,
          stationId: from,
          date,
        });
        const availableSeats = 70 - seats.length > 0 ? 70 - seats.length : 0;
        return {
          trainNumber: train.trainNumber,
          trainName: train.trainName,
          from: fromStation.stationId,
          to: toStation.stationId,
          fromTime,
          toTime,
          availableSeats,
        };
      } catch (error) {
        console.log(error);
      }
    })
  );

  return res.json({
    trains: trainDetails,
  });
});

export { searchTrain };
