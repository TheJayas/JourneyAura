import { Router } from "express";
import { searchTrain } from "../controllers/search.controller.js";

const router = Router();

router.post('/searchTrain',searchTrain);

export default router;