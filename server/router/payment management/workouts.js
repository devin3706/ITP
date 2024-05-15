import express from "express";
import {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} from "../../controllers/payment management/workoutController.js";
import multer from "multer";

//image upload middleware
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const router = express.Router();
const upload = multer({ storage: storage });

// Get all workouts
router.get("/read", getWorkouts);

// Get a single workout
router.get("/get/:Workoutid", getWorkout);

// POST a new workout
router.post("/create", upload.single("slip"), createWorkout);

// DELETE a workout
router.delete("/delete/:Workoutid", deleteWorkout);

// UPDATE a workout
router.put("/update/:Workoutid", updateWorkout);

export default router;
