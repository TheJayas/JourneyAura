import User from "../Models/UserModel";
import ErrorHandler from "../Utils/errorHandler";
import catchAsyncErrors from "./catchAsyncErrors";
import jwt from "jsonwebtoken";

exports.isAuthenticatedUser = catchAsyncErrors(async(req,res,next)=>{
    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandler("Please Login to access!",401));
    }

    const decodedData = jwt.verify(token,process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);

    next();
});

