import { Router } from "express";
import { bookTicket, cancelTicket } from "../controllers/booking.controller.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";


const router = Router();

router.post('/bookticket/:id',isAuthenticatedUser,bookTicket);
router.post('/cancelTicket/:id',isAuthenticatedUser,cancelTicket);

export default router;
