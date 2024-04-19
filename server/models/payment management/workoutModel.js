import mongoose from "mongoose";

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
    sid: {
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
  },
  { timestamps: true }
);

export default mongoose.model("Workout", workoutSchema);