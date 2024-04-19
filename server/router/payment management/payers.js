import express from "express";
import {
  getPayers,
  getPayer,
  createPayer,
  deletePayer,
  updatePayer,
} from "../../controllers/payment management/payerController.js";

const router = express.Router();

// Get all workouts
router.get("/get", getPayers);

// Get a single workout
router.get("/get/:id", getPayer);

// POST a new workout
router.post("/create", createPayer);

// DELETE a workout
router.delete("/delete/:id", deletePayer);

// UPDATE a workout
router.patch("/update/:id", updatePayer);

export default router;
