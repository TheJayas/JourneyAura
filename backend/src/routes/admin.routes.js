import { Router } from "express";
import { allDB, routesDB, stationDB, trainDB} from "../controllers/admin.controller.js";


const router = Router();

router.get('/alldb/',allDB);
router.get('/traindb/',trainDB);
router.get('/stationdb/',stationDB);
router.get('/routedb/',routesDB);
// router.post('/cancelTicket/:id',isAuthenticatedUser,cancelTicket);

export default router;
