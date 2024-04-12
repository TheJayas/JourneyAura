import { Router } from "express";
import { searchTrain } from "../controllers/search.controller";

const router = Router();

router.post('/searchTrain',searchTrain);

export default router;