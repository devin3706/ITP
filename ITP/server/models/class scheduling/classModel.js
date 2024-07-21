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
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
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
