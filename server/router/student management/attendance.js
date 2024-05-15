import express from "express";
import AttendanceModel from "../../models/student management/Attendance.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();
const __dirname = path.resolve();

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
    if (!attendance) {
      return res.status(404).json({ error: "Image not found" });
    }
    const imagePath = path.join(__dirname, "images", attendance.image);
    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ error: "Image file not found" });
    }
    res.sendFile(imagePath);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch image" });
  }
});

router.get("/getAllImages", async (req, res) => {
  try {
    const allAttendance = await AttendanceModel.find();
    res.json(allAttendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch all images" });
  }
});

router.delete("/deleteImage/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const image = await AttendanceModel.findByIdAndDelete(id);
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }
    const imagePath = path.join(__dirname, "images", image.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath); // Delete image file from the filesystem
    }
    res.json(image);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete image" });
  }
});

export default router;
