import { Router } from "express";
import { getUserDetails, loginUser, logout, registerUser, updateProfile } from "../controllers/user.controller.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";

const router = Router();
router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/logout',logout);
router.get('/me',isAuthenticatedUser,getUserDetails);
router.post('/update',isAuthenticatedUser,updateProfile);

export default router;
