import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { sendToken } from "../utils/jwtToken.js";
import { User } from "../models/userModel.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from 'crypto';
import { Passenger } from "../models/passengerModel.js";

//register user

const registerUser = asyncHandler(async(req,res)=>{
    
    const {name,email,password,phoneNumber,address} = req.body;
    console.log(req.body);
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

//update user password
const updatePassword = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return res.json(ApiError(400,"Old Password is incorrect"));
    }

    if(req.body.password !== req.body.confirmPassword){
        return res.json(ApiError(400,"Password does not match"));
    }

    user.password = req.body.password;
    await user.save();

    sendToken(user,200,res);
});

//reset password

const resetPassword = asyncHandler(async(req,res)=>{
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');

    const user = User.findOne({resetPasswordToken,resetPasswordExpire:{$gt:Date.now()}});

    if(!user){
        return res.json(new ApiError(400,"Invalid Reset Token"));
    }

    if(req.body.password!==req.body.confirmPassword){
        return res.json(new ApiError(400,"Password does not match"));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user,200,res);

});


const forgotPassword = asyncHandler(async(req,res)=>{
    const user = await User.findOne({
        username: req.body.username
    });

    if(!user){
        return ApiError(404,"User not found");
    }

    const resetToken = user.getResetPasswordToken();

    await user.save({
        validateBeforeSave:false
    });

    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/resetpassword/${resetToken}`;    

    const message = `You are receiving this email because you have requested the reset of a password. Please make a PUT request to: \n\n ${resetPasswordUrl}`;

    try {
        await sendEmail({
            email: user.email,
            subject: "Password Recovery",
            message,
        });

        return new ApiResponse(200, {
            msg: `Email sent to ${user.email} successfully`,
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({
            validateBeforeSave:false
        });

        return new ApiError(500,"Email could not be sent"); 
    }
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

const addPassenger = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user.id);

    const {name,dob,berthPreference,mealPreference,govtId} = req.body;

    user.passengers.push({ 
        name,
        dob,
        berthPreference,
        mealPreference,
        govtId
    });

    await user.save();

    sendToken(user,200,res);
});

const editPassenger = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user.id);

    const passenger = await Passenger.findOne({_id:req.params.id,user:req.user.id});

    if(!passenger){
        return res.json(new ApiError(404,"Passenger not found"));
    }

    const {name,dob,berthPreference,mealPreference,govtId} = req.body;

    passenger.name = name;
    passenger.dob = dob;
    passenger.berthPreference = berthPreference;
    passenger.mealPreference = mealPreference;
    passenger.govtId = govtId;

    await passenger.save();

    sendToken(user,200,res);
});

export {registerUser,loginUser,logout,updateProfile,getUserDetails,updatePassword,forgotPassword,resetPassword};{}