import { User } from "../models/userModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from 'jsonwebtoken';

const isAuthenticatedUser = asyncHandler(async(req,res,next)=>{
    const token = req.headers.token;
    // console.log(req.headers.token);
    // console.log(token);
    if(!token){
        return next(new ApiError(401));
    }

    const decodedData = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);

    next();
});

export {isAuthenticatedUser};