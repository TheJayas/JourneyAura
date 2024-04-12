import { Router } from "express";
import { addRoute } from "../controllers/route.controller.js";

const router = Router();

router.post('/addRoute',addRoute);

export default router;