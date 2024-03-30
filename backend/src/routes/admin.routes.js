import { Router } from "express";
import { allDB} from "../controllers/admin.controller.js";


const router = Router();

router.get('/alldb/',allDB);
// router.post('/cancelTicket/:id',isAuthenticatedUser,cancelTicket);

export default router;
