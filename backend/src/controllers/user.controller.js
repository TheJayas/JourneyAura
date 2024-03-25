import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { sendToken } from "../utils/jwtToken.js";
import { User } from "../models/userModel.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from 'crypto';

//register user

const registerUser = asyncHandler(async(req,res)=>{
    const {name,email,password,phoneNumber,address} = req.body;
    
    const user = await User.create({
        name,
        email,
        password,
        phoneNumber,
        address
    });

    sendToken(user,201,res);
});

const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    
    if(!email || !password){
        return new ApiError(400,"Please Enter Email & Password");
    }

    const user = await User.findOne({
        email
    }).select("+password");

    if(!user){
        return res.json(new ApiError(401,"Invalid email or password"));
    }

    const isPasswordMatched = user.comparePassword(password);

    if (!isPasswordMatched) {
        return res.json(new ApiError(401, "Invalid email or password"));
    }

    sendToken(user, 200, res);
});

const logout = asyncHandler(async(req,res)=>{
    
    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly:true,
    });

    return new ApiResponse(200, {
        msg: 'logged out succesfully',
    });

});

const updateProfile = asyncHandler(async(req,res)=>{
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    }

    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });

    return res.json(new ApiResponse(200,{}));
});

const getUserDetails = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user.id);
    return res.json(new ApiResponse(200,user));
});


export {registerUser,loginUser,logout,updateProfile,getUserDetails};