import mongoose from "mongoose";
// const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const workoutSchema = new Schema(
  {
    studentName: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    slip: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

const Workout = mongoose.model("Workout", workoutSchema);

export default Workout;
