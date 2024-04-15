// routes.js
import express from 'express';
import PdfSchema from '../../models/study material/PdfModel.js';
import { upload } from '../../middleware/study materials/multer.js';

const router = express.Router();

router.post("/upload-files", upload.single("file"), async (req, res) => {
  console.log(req.file);
  const title = req.body.title;
  const description = req.body.description;
  const grade = req.body.grade; 
  const fileName = req.file.filename;
  
  try {
    await PdfSchema.create({ title, description, grade, pdf: fileName });
    res.send({ status: "ok" });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ status: "error", message: "Error uploading file" });
  }
});

router.get("/get-files", async (req ,res) => {
  try {
    const data = await PdfSchema.find({});
    res.send({ status: "ok", data });
  } catch(error) {
    console.error("Error fetching files:", error);
    res.status(500).json({ status: "error", message: "Error fetching files" });
  }
});

router.delete("/delete-pdf/:id", async (req, res) => {
  const { id } = req.params;
  
  try {
    const pdf = await PdfSchema.findByIdAndDelete(id);
    if (!pdf) {
      return res.status(404).json({ status: "error", message: "PDF not found" });
    }
    res.json({ status: "ok", message: "PDF deleted successfully" });
  } catch (error) {
    console.error("Error deleting PDF:", error);
    res.status(500).json({ status: "error", message: "Error deleting PDF" });
  }
});

export default router;