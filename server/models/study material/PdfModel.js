import mongoose from "mongoose";

const PdfDetailsSchema = new mongoose.Schema(
  {
    pdf: String,
    title: String,
    description: String, // Add description field
    grade: String, // Add grade field
  },
  { collection: "PdfDetails" }
);

export default mongoose.model('PdfDetails', PdfDetailsSchema);