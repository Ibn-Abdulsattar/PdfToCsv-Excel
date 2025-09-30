import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { auth, isAdmin } from "../middleware/auth.js";
import { allTickets, newTicket, totalTickets } from "../controllers/Support.js";
const router = express.Router();

router.get("/getalltickets", auth("admin"), isAdmin, wrapAsync(allTickets));

router.post("/newticket",auth("user"), wrapAsync(newTicket));

router.get("/totalTickets", auth("admin"), isAdmin, wrapAsync(totalTickets));

export default router;
