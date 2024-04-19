import mongoose from "mongoose";

const { Schema, model } = mongoose;

const classSchema = new Schema(
  {
    teacherName: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    date: {
      type: Number,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Class", classSchema);