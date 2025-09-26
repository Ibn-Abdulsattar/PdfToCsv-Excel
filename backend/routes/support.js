import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { auth, isAdmin } from "../middleware/auth.js";
import { allTickets, newTicket, totalTickets } from "../controllers/Support.js";
const router = express.Router();

router.get("/getalltickets", auth, isAdmin, wrapAsync(allTickets));

router.post("/newticket", wrapAsync(newTicket));

router.get("/totalTickets", auth, isAdmin, wrapAsync(totalTickets));

export default router;
