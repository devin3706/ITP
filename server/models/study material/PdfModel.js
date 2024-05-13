import mongoose from "mongoose";

const PdfDetailsSchema = new mongoose.Schema({
  pdf: String,
  title: String,
  description: String,
  grade: String,
  subject: String,
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  dislikedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, {
  collection: "PdfDetails"
});

export default mongoose.model('PdfDetails', PdfDetailsSchema);
