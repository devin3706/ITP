import express from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { Student } from "../../models/student login/Student.js";
import SLogins from "../../models/admin/studentLogins.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password, school, number, address } = req.body;
  const student = await Student.findOne({ email });
  if (student) {
    return res.json({ message: "student already existed" });
  }

  const hashpassword = await bcrypt.hash(password, 10);
  const newStudent = new Student({
    name,
    email,
    password: hashpassword,
    school,
    number,
    address,
  });

  await newStudent.save();
  return res.json({ status: true, message: "record registered" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const student = await Student.findOne({ email });
  if (!student) {
    return res.json({ message: "student is not registered" });
  }

  const validpassword = await bcrypt.compare(password, student.password);
  if (!validpassword) {
    return res.json({ message: "password is incorrect" });
  }

  const token = jwt.sign({ email: student.email }, process.env.KEY, {
    expiresIn: "1h",
  });
  res.cookie("token", token, { httpOnly: true, maxAge: 360000 });

  //for DPDashboard
  const studentEmail = email;

  // Create a new Login document
  const SLogin = new SLogins({
    studentEmail: studentEmail,
    timestamp: new Date(),
  });

  // Save the login data to the database
  await SLogin.save();

  return res.json({ status: true, message: "logged in successfully" });
});

// Profile route
router.get("/profile", async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.KEY);
    const student = await Student.findOne({ email: decoded.email });
    if (!student) {
      return res.json({ message: "Student not found" });
    }
    return res.json(student);
  } catch (error) {
    console.error(error);
    return res.json({ message: "Unauthorized" });
  }
});

// Delete profile route
router.delete("/deleteProfile", async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.KEY);
    const student = await Student.findOneAndDelete({ email: decoded.email });
    if (!student) {
      return res.json({ message: "Student not found" });
    }
    return res.json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.json({ message: "Unauthorized" });
  }
});

router.post("/forgotPassword", async (req, res) => {
  const { email } = req.body;
  try {
    const student = await Student.findOne({ email });
    if (!student) {
      return res.json({ message: "student is not registered" });
    }

    const token = jwt.sign({ id: student._id }, process.env.KEY, {
      expiresIn: "5m",
    });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "minesividanaarachchi@gmail.com",
        pass: "Juththem_September6",
      },
    });

    var mailOptions = {
      from: "    ",
      to: email,
      subject: "Reset Password",
      text: `http://localhost:3000/resetPassword/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.json({ message: "error sending email" });
      } else {
        return res.json({ status: true, message: "email sent" });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/getProfile/:id", (req, res) => {
  const id = req.params.id;
  Student.findById(id)
    .then((students) => res.json(students))
    .catch((err) => res.json(err));
});

router.put("/updateProfile/:id", (req, res) => {
  const id = req.params.id;
  Student.findByIdAndUpdate(
    id,
    {
      name: req.body.name,
      email: req.body.email,
      number: req.body.number,
      school: req.body.school,
      address: req.body.address,
    },
    { new: true }
  ) // To return the updated document
    .then((student) => res.json(student))
    .catch((err) => res.json(err));
});

export default router;
