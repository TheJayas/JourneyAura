import { Router } from "express";
import {registerStation,getStationDetails,updateStation } from "../controllers/station.controller.js";


const router = Router();

router.post('/registerStation',registerStation);
router.get('/getStationDetails/:id',getStationDetails);
router.post('/updateStation',updateStation);

export default router;
