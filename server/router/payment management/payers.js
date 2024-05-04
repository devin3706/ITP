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
router.get("/read", getPayers);

// Get a single workout
router.get("/get/:Payerid", getPayer);

// POST a new workout
router.post("/create", createPayer);

// DELETE a workout
router.delete("/delete/:Payerid", deletePayer);

// UPDATE a workout
router.put("/update/:Payerid", updatePayer);

export default router;
