import mongoose from "mongoose";

const { Schema, model } = mongoose;

const announceSchema = new Schema(
  {
    TeacherNameID: {
      type: String,
      required: true,
    },
    SubjectSubjectID: {
      type: String,
      required: true,
    },
    Announcement: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Announce", announceSchema);
