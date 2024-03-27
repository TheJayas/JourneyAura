import { Router } from "express";
import { bookTicket } from "../controllers/booking.controller.js";


const router = Router();

router.post('/bookticket/:id',bookTicket);

export default router;
