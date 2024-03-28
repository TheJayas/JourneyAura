import { Booking } from "../models/bookingModel.js";
import { StationToSeat } from "../models/stationToseatModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Train } from "../models/trainModel.js";
import { Station } from "../models/stationModel.js";

//register train

const bookTicket = asyncHandler(async (req, res) => {
    const { trainId, from_station, to_station, date } = req.body;
    const userId = req.params.id;
    const seats = [];
    
    
    // Fetch all stations between from_station and to_station
    const stations = await StationToSeat.find({ 
        trainId,
        stationId: { $in: [from_station, to_station] }, // Only consider from_station and to_station
        date 
    });
    console.log(stations);
    for (let seatNumber = 1; seatNumber <= 70; seatNumber++) {
        let isSeatAvailable = true;

        // Check if the seat is available from starting station to ending station considering intermediate stations
        for (const station of stations) {
            const bookedSeatsAtStation = station.seatsBooked.map(seat => seat.seatNumber);
            if (bookedSeatsAtStation.includes(seatNumber)) {
                isSeatAvailable = false;
                break;
            }
        }

        // If seat is available, add it to the list of available seats
        if (isSeatAvailable) {
            seats.push(seatNumber);
        }
    }

    if (seats.length === 0) {
        return res.json(new ApiError(400, "No available seats."));
    }

    // For simplicity, let's just choose the first available seat
    const selectedSeat = seats[0];

    // Book the ticket
    const booking = await Booking.create({
        trainId,
        from_station,
        to_station,
        seatId: selectedSeat, // Assuming you have a field to store the seat number in the Booking model
        userId,
        date
    });

    if (!booking) {
        return res.json(new ApiError(401, "Unexpected error"));
    }

    return res.json(new ApiResponse(200, booking));
});

export {bookTicket}; 