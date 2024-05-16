import express from "express";
import multer from 'multer';
import {
  getFiles,
  deletePdfById,
  uploadFile,
  Success,
  updateById,
  upload,
  likeCount,
  dislikeCount,
  getPastPaperFiles,
  deletePastPaperById,
  uploadPastPaperFile,
  updatePastPaperById,
  pastPaperLikeCount,
  pastPaperDislikeCount,
} from '../../controllers/study materials/controller.js';

const router = express.Router();

router.use("/files", express.static("files"));

// API routes for study materials
router.get("/get-files", getFiles);
router.delete("/delete-pdf/:id", deletePdfById);
router.post("/upload-pdf", upload.single("file"), uploadFile);
router.get("/", Success);
router.put("/update-pdf/:id", upload.single("file"), updateById);
router.post("/pdfs/:id/like", likeCount);
router.post("/pdfs/:id/dislike", dislikeCount);

// API routes for past papers
router.get("/get-past-papers-files", getPastPaperFiles);
router.delete("/delete-past-papers-pdf/:id", deletePastPaperById);
router.post("/upload-past-paper", upload.single("file"), uploadPastPaperFile);
router.put("/update-past-papers-pdf/:id", upload.single("file"), updatePastPaperById);
router.post("/past-papers/:id/like", pastPaperLikeCount);
router.post("/past-papers/:id/dislike", pastPaperDislikeCount);

export default router;
