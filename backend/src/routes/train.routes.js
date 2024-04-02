import { Router } from "express";
import { registerTrain,getTrainDetails,addIntermediateStation,updateTrain, getTrainDetailsById, deleteTrain, deleteTrainById } from "../controllers/train.controller.js";


const router = Router();

router.post('/registerTrain',registerTrain);
router.get('/getTrainDetails/:id',getTrainDetails);
router.get('/getTrainDetailsById/:id',getTrainDetailsById);
router.post('/addIntermediateStation',addIntermediateStation);
router.post('/updateTrain',updateTrain);
router.get('/deleteTrain/:id',deleteTrain);
router.get('/deleteTrainById/:id',deleteTrainById);

export default router;
