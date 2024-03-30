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

    const train = await Train.findOne({ trainNumber: trainId });
    let maxseatBooked = 0;
    for (let i = 0; i < train.intermediateStations.length; i++) {
        if (train.intermediateStations[i] == from_station) {
            while (i < train.intermediateStations.length && train.intermediateStations[i] != to_station) {
                const stations_status = await StationToSeat.findOne({
                    trainId,
                    stationId: train.intermediateStations[i],
                    date
                });
                // console.log(stations_status);
                if (stations_status) { maxseatBooked = Math.max(maxseatBooked, stations_status.seatsBooked.length); }
                i++;
            }
            break;
        }
    }
    console.log(maxseatBooked);
    // Fetch all stations between from_station and to_station
    if (train.seatCount <= maxseatBooked) { return res.json(new ApiError(400, "No available seats.")); }

    for (let i = 0; i < train.intermediateStations.length; i++) {
        if (train.intermediateStations[i] == from_station) {
            while (i < train.intermediateStations.length && train.intermediateStations[i] != to_station) {
                console.log(i);
                const stations_status = await StationToSeat.findOne({
                    trainId,
                    stationId: train.intermediateStations[i],
                    date
                });
                if (!stations_status) {
                    const stations_status1 = await StationToSeat.create({
                        trainId,
                        stationId: train.intermediateStations[i],
                        date
                    });
                    stations_status1.seatsBooked.push({ user: userId, seatNumber: maxseatBooked + 1 });
                    console.log(stations_status1);
                }
                else { stations_status.seatsBooked.push({ user: userId, seatNumber: maxseatBooked + 1 }); stations_status.save(); }
                i++;
            }
            break;
        }
    }

    // for (let seatNumber = 1; seatNumber <= 70; seatNumber++) {
    //     let isSeatAvailable = true;

    //     // Check if the seat is available from starting station to ending station considering intermediate stations
    //     for (const station of stations) {
    //         const bookedSeatsAtStation = station.seatsBooked.map(seat => seat.seatNumber);
    //         if (bookedSeatsAtStation.includes(seatNumber)) {
    //             isSeatAvailable = false;
    //             break;
    //         }
    //     }

    //     // If seat is available, add it to the list of available seats
    //     if (isSeatAvailable) {
    //         seats.push(seatNumber);
    //     }
    // }

    // if (seats.length === 0) {
    //     return res.json(new ApiError(400, "No available seats."));
    // }

    // For simplicity, let's just choose the first available seat
    // const selectedSeat = seats[0];

    // Book the ticket
    // return res.json(new ApiError(400, "No available seats."));
    const booking = await Booking.create({
        trainId,
        from_station,
        to_station,
        seatId: maxseatBooked + 1, // Assuming you have a field to store the seat number in the Booking model
        userId,
        date,
        status: "confirmed"
    });

    if (!booking) {
        return res.json(new ApiError(401, "Unexpected error"));
    }

    return res.json(new ApiResponse(200, booking));
});

const cancelTicket = asyncHandler(async (req, res) => {
    const bookingId = req.params.id;
    const booking = await Booking.findById(bookingId);
    if (!booking) {
        return res.json(new ApiError(404, "Booking not found"));
    }
    const train = await Train.findOne({ trainNumber: booking.trainId });
    let stations = [];
    for (let i = 0; i < train.intermediateStations.length; i++) {
        if (train.intermediateStations[i] == booking.from_station) {
            while (i < train.intermediateStations.length && train.intermediateStations[i] != booking.to_station) {
                const stations_status = await StationToSeat.findOne({
                    trainId: booking.trainId,
                    stationId: train.intermediateStations[i],
                    date: booking.date
                });
                stations.push(stations_status);
                i++;
            }
            break;
        }
    }
    for (const station of stations) {
        const seatIndex = station.seatsBooked.findIndex(seat => seat.user == booking.userId && seat.seatNumber == booking.seatId);
        if (seatIndex !== -1) {
            station.seatsBooked.splice(seatIndex, 1);
            station.save();
        }
    }
    booking.status = "cancelled";
    booking.save();
    return res.json(new ApiResponse(200, booking));
}
);

export { bookTicket, cancelTicket }; 