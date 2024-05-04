import express from "express";
import {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} from "../../controllers/payment management/workoutController.js";

const router = express.Router();

// Get all workouts
router.get("/read", getWorkouts);

// Get a single workout
router.get("/get/:Workoutid", getWorkout);

// POST a new workout
router.post("/create", createWorkout);

// DELETE a workout
router.delete("/delete/:Workoutid", deleteWorkout);

// UPDATE a workout
router.put("/update/:Workoutid", updateWorkout);

export default router;