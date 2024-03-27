import { Router } from "express";
import { registerTrain } from "../controllers/train.controller.js";


const router = Router();

router.post('/registerTrain',registerTrain);

export default router;