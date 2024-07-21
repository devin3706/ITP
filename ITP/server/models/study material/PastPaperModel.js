import mongoose from "mongoose";

const PastPaperDetailsSchema = new mongoose.Schema(
  {
    pdf: String,
    year: String,
    description: String, // Add description field
    grade: String, // Add grade field
    subject:String,
    likes: { type: Number, default: 0 }, // Default value of likes is 0
    dislikes: { type: Number, default: 0 }, // Default value of dislikes is 0
  },
  { collection: "PastPaperDetails" }
);

export default mongoose.model('PastPaperDetails', PastPaperDetailsSchema);