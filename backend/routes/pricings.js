import express from "express";
import { auth, isAdmin } from "../middleware/auth.js";
import wrapAsync from "../utils/wrapAsync.js";
import {
  allPackages,
  deletePackage,
  newPackage,
  updatePackage,
  indivPackage,
} from "../controllers/Pricing.js";
const router = express.Router();

router.post("/newpackage", auth("admin"), isAdmin, wrapAsync(newPackage));

router.get("/allpackages", wrapAsync(allPackages));

router.put("/updatepackage/:id",auth("admin"), isAdmin, wrapAsync(updatePackage));

router.delete("/deletepackage/:id", auth("admin"), isAdmin, wrapAsync(deletePackage));

router.get('/indivpackage/:id', wrapAsync(indivPackage));

export default router;
