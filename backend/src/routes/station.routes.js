import { Router } from "express";
import {registerStation,getStationDetails,updateStation, deleteStationById, getStationDetailsById } from "../controllers/station.controller.js";


const router = Router();

router.post('/registerStation',registerStation);
router.get('/getStationDetails/:id',getStationDetails);
router.get('/getStationDetailsById/:id',getStationDetailsById);
router.post('/updateStation',updateStation);
router.get('/deleteStationById/:id',deleteStationById);

export default router;
