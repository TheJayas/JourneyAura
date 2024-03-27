import { Router } from "express";
import { registerTrain,getTrainDetails,addIntermediateStation,updateTrain } from "../controllers/train.controller.js";


const router = Router();

router.post('/registerTrain',registerTrain);
router.get('/getTrainDetails/:id',getTrainDetails);
router.post('/addIntermediateStation',addIntermediateStation);
router.post('/updateTrain',updateTrain);

export default router;
