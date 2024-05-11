import express from "express";
import AttendanceModel from "../../models/student management/Attendance.js";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const result = await AttendanceModel.create({ image: req.file.filename });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to upload image" });
  }
});

router.get("/getImage/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const attendance = await AttendanceModel.findById(id);
    res.json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch image" });
  }
});

router.delete("/deleteImage/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const image = await AttendanceModel.findByIdAndDelete(id);
    res.json(image);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete image" });
  }
});

export default router;