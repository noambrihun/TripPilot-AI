import { Router } from "express";
import { createTrip, getTrips,getTripById, updateTrip, deleteTrip, generateTrip } from "../controllers/tripController";

const router = Router();

router.post("/", createTrip);
router.post("/generate", generateTrip);
router.get("/", getTrips);
router.get("/:id", getTripById);
router.put("/:id", updateTrip);
router.delete("/:id", deleteTrip);
export default router;