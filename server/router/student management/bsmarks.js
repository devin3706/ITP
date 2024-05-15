/*import express from "express";
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
*/


import express from "express";
import BSMarksModel from "../../models/student management/BSMarks.js";
import StudentModel from "../../models/student management/Student.js"; // Assuming you have a Student model defined

const router = express.Router();

// Route to create BSMarks
router.post("/createBSMarks", async (req, res) => {
  try {
    const bsmarks = await BSMarksModel.create(req.body);
    res.json(bsmarks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create BSMarks" });
  }
});

// Route to fetch all BSMarks
router.get("/", async (req, res) => {
  try {
    const bsmarks = await BSMarksModel.find({});
    res.json(bsmarks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch BSMarks" });
  }
});

// Route to fetch BSMarks by ID
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

// Route to update BSMarks by ID
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

// Route to delete BSMarks by ID
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

// Route to fetch all students
router.get("/student", async (req, res) => {
  try {
    const students = await StudentModel.find({});
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

export default router;
