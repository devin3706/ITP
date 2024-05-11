import express from "express";
import BSMarksModel from "../../models/student management/BSMarks.js";

const router = express.Router();

router.post("/createBSMarks", async (req, res) => {
  try {
    const bsmarks = await BSMarksModel.create(req.body);
    res.json(bsmarks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create BSMarks" });
  }
});

router.get("/", async (req, res) => {
  try {
    const bsmarks = await BSMarksModel.find({});
    res.json(bsmarks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch BSMarks" });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const bsmarks = await BSMarksModel.findById(id);
    res.json(bsmarks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch BSMarks" });
  }
});

router.put("/updateBSMarks/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const bsmarks = await BSMarksModel.findByIdAndUpdate(
      id,
      { marks: req.body.marks },
      { new: true }
    );
    res.json(bsmarks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update BSMarks" });
  }
});

router.delete("/deleteBSMarks/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const bsmarks = await BSMarksModel.findByIdAndDelete(id);
    res.json(bsmarks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete BSMarks" });
  }
});

export default router;