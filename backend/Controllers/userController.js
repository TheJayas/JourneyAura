import ErrorHandler from "../Utils/errorHandler";
import catchAsyncErrors from "../Middleware/catchAsyncErrors";
import User from "../Models/UserModel";
import sendToken from "../Utils/jwtToken";
import crypto from "crypto";

export const registerUser = catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password,phoneNumber,address} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        phoneNumber,
        address,
        avatar: {
            public_id: "sampleId",
            url:"profilepic"
        },
    });

    sendToken(user,201,res);
});

export const loginUser = catchAsyncErrors(async(req,res,next)=>{
    const {email,password} = req.body;

    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email & Password",400));
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid email or password",401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Password",401));
    }

    sendToken(user,200,res);
});

export const logout = catchAsyncErrors(async(req,res,next)=>{

    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly:true,
    });

    res.status(200).json({
        success:true,
        message:"logged Out"
    })
});

export const forgotPassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email});

    if(!user){
        return next(new ErrorHandler("User not found",404));
    }

    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave:false});

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it`;

    try {
        await sendEmail({
            email:user.email,
            subject:`Irctc Password Recovery`,
            message,
        });

        res.status(200).json({
            success: true,
            message:`Email sent to ${user.email} successfully`
        });
    } catch(error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave:false});

        return next(new ErrorHandler(error.message,500));
    }
});

export const resetPassword = catchAsyncErrors(async(req,res,next)=>{
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = User.findOne({resetPasswordToken,resetPasswordExpire:{$gt:Date.now()}});

    if(!user){
        return next(new ErrorHandler("Reset Password Token is invalid or has been expired",400));
    }

    if(req.body.password!==req.body.confirmPassword){
        return next(new ErrorHandler("Password does not matched",400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user,200,res);
});





