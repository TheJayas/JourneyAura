import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Payment } from "../models/paymentModel.js";
import { User } from "../models/userModel.js";
import sendEmail from "../utils/sendEmail.js";

const addPayment = asyncHandler(async (req, res) => {
    const { paymentAmount, cvvNumber, cardNumber,cardExpiry } = req.body;
    const paymentStatus = "Success";

    const user = await User.findById(req.user.id);

    if(user.cvvNumber !== cvvNumber || user.cardNumber !== cardNumber || user.cardExpiry !== cardExpiry){
        return res.json(new ApiError(400, "Invalid card details"));
    }

    const payment = await Payment.create({
        paymentAmount,
        paymentStatus,
        paymentDate: new Date(),
        paymentTime: new Date().toLocaleTimeString(),
        paymentUser: req.user.id,
        paymentTrain: req.params.id
    });

    if (!payment) {
        return res.json(new ApiError(401, "Unexpected error"));
    }

    sendEmail({
        email: user.email,
        subject: "Payment Successful",
        message: `Your payment of ₹${paymentAmount} was successful.`
    });

    return res.json(new ApiResponse(200, payment));
}
);

export {addPayment};