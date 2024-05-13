import express from "express";
import StudentModel from "../../models/student management/Student.js";

const router = express.Router();

router.post("/createUser", async (req, res) => {
  try {
    const students = await StudentModel.create(req.body);
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

router.get("/", async (req, res) => {
  try {
    const students = await StudentModel.find({});
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.get("/getUser/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const student = await StudentModel.findById(id);
    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

router.put("/updateUser/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const student = await StudentModel.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        email: req.body.email,
        number: req.body.number,
        school: req.body.school,
        address: req.body.address,
      },
      { new: true }
    );
    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update user" });
  }
});

router.delete("/deleteUser/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await StudentModel.findByIdAndDelete(id);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

export default router;