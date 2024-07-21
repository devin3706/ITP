import Workout from "../../models/payment management/workoutModel.js";
import mongoose from "mongoose";

// get all workouts
const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// get a single workout
const getWorkout = async (req, res) => {
  const { Workoutid } = req.params;

  if (!mongoose.Types.ObjectId.isValid(Workoutid)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findById(Workoutid);

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

// create new workout
const createWorkout = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file Uploaded" });
  }

  const { studentName, course, contactNumber, address, email } = req.body;
  const slip = req.file.path;

  // add doc to db
  try {
    const workout = await Workout.create({
      studentName,
      course,
      contactNumber,
      address,
      email,
      slip,
    });
    res.status(200).json("workout una");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a workout
const deleteWorkout = async (req, res) => {
  const { Workoutid } = req.params;

  if (!mongoose.Types.ObjectId.isValid(Workoutid)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndDelete({ _id: Workoutid });

  if (!workout) {
    return res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

//update a workout
const updateWorkout = async (req, res) => {
  const { Workoutid } = req.params;

  if (!mongoose.Types.ObjectId.isValid(Workoutid)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndUpdate(
    { _id: Workoutid },
    {
      ...req.body,
    }
  );

  if (!workout) {
    return res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

export { getWorkouts, getWorkout, createWorkout, deleteWorkout, updateWorkout };
