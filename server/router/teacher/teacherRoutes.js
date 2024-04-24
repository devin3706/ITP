import express from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import crypto from 'crypto'; // Import crypto module for generating random bytes
import nodemailer from 'nodemailer'; // Import nodemailer for sending emails
import Teacher from "../../models/teacher/Teacher.js";
import TLogins from "../../models/admin/teacherLogins.js";

const router = express.Router();

// Define storage for the uploaded photos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middleware to parse JSON request body
router.use(express.json());

// Add a new teacher with photo
router.post("/add", upload.single('teacherPhoto'), async (req, res) => {
    console.log(req.body); // Log the request body to see what data is being received

    const {
        tfirstName,
        tlastName,
        tnicNumber,
        tSubject,
        tDistrict,
        tEdu,
        tInfo,
        tAddress,
        tPhone,
        tEmail,
        password,
        confirmPassword
    } = req.body;

    const teacherData = {
        firstName: tfirstName,
        lastName: tlastName,
        nicNumber: tnicNumber,
        subject: tSubject,
        district: tDistrict,
        eduQualification: tEdu,
        additionalInfo: tInfo,
        address: tAddress,
        phoneNumber: tPhone,
        email: tEmail,
        password: password,
        confirmPassword: confirmPassword
    };

    if (req.file) {
        // If a photo is uploaded, include its data in the teacherData
        teacherData.photo = {
            data: req.file.buffer,
            contentType: req.file.mimetype
        };
    }

    try {
        // Create a new instance of the Teacher model with the data from req.body
        const newTeacher = new Teacher(teacherData);

        // Save the new teacher to the database
        await newTeacher.save();

        res.status(201).json({ message: "New Teacher Added" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// View all teachers
router.get("/", async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.json(teachers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a teacher
router.put("/update/:id", async (req, res) => {
    const { id } = req.params;
    const {
        tfirstName,
        tlastName,
        tnicNumber,
        tSubject,
        tDistrict,
        tEdu,
        tInfo,
        tAddress,
        tPhone,
        tEmail,
        password
    } = req.body;

    try {
        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        const updatedTeacher = await Teacher.findByIdAndUpdate(id, {
            firstName: tfirstName,
            lastName: tlastName,
            nicNumber: tnicNumber,
            subject: tSubject,
            district: tDistrict,
            eduQualification: tEdu,
            additionalInfo: tInfo,
            address: tAddress,
            phoneNumber: tPhone,
            email: tEmail,
            password: hashedPassword // Update with hashed password
        }, { new: true });

        if (!updatedTeacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        res.status(200).json({ message: "Teacher updated", teacher: updatedTeacher });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Delete a teacher
router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTeacher = await Teacher.findByIdAndDelete(id);

        if (!deletedTeacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        res.status(200).json({ message: "Teacher deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single teacher
router.get("/get/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const teacher = await Teacher.findById(id);

        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        res.status(200).json({ teacher });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email in the database
        const user = await Teacher.findOne({ email });

        if (!user) {
            // If user is not found, return an error
            return res.status(401).json({ message: "Authentication failed. Invalid email or password." });
        }

        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            // If passwords do not match, return an error
            return res.status(401).json({ message: "Authentication failed. Invalid email or password." });
        }

        // If authentication is successful, generate a JSON Web Token (JWT)
        const token = jwt.sign({ userId: user._id }, 'your_secret_key_here', { expiresIn: '1h' });



        //for DPDashboard
                const teacherEmail = email

                // Create a new Login document
                const TLogin = new TLogins({
                    teacherEmail: teacherEmail,
                    timestamp: new Date()
                });

                // Save the login data to the database
                await TLogin.save();



        // Return the token in the response
        res.status(200).json({ message: "Authentication successful", token });
    } catch (error) {
        // If an error occurs, return an error response
        console.error("Login error:", error);
        res.status(500).json({ error: "An error occurred while processing the request." });
    }
});

// Forgot password route
router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
  
    try {
      // Find the user by email in the database
      const user = await Teacher.findOne({ email });
  
      if (!user) {
        // If user is not found, return an error
        return res.status(404).json({ message: "User not found." });
      }
  
      // Generate a unique password reset token
      const resetToken = crypto.randomBytes(20).toString("hex");
  
      // Set the reset token and expiry time in the user's document
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
  
      // Save the user document
      await user.save();
  
      // Send the password reset email with the token
      sendResetEmail(email, resetToken);
  
      res.status(200).json({ message: "Password reset email sent." });
    } catch (error) {
      console.error("Forgot password error:", error);
      res.status(500).json({ error: "An error occurred while processing the request." });
    }
});

// Function to send password reset email
const sendResetEmail = async (email, resetToken) => {
  // Create a transporter for sending emails
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587, // or 465 for SSL
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'chathuminakaushal@gmail.com',
      pass: 'qqhw vmqc znlq oagk'
    }
  });
  

  // Define email options
  const mailOptions = {
    from: 'chathuminakaushal@gmail.com',
    to: email,
    subject: 'Password Reset Request',
    html: `<h3>You have requested a password reset. Click <a href="http://localhost:3000/resetPassword/${resetToken}/${email}">here</a> to reset your password.</h3>`
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent successfully.');
  } catch (error) {
    console.error('Error sending password reset email:', error);
  }
};

// Route to handle password reset form submission
router.post("/reset-password", async (req, res) => {
    const { resetToken, newPassword, confirmPassword, email } = req.body;
    console.log("Request Body:", req.body);

    // Check if resetToken, newPassword, and confirmPassword are present in the request body
    if (!resetToken || !newPassword || !confirmPassword) {
        return res.status(400).json({ message: "Missing required fields." });
    }

    // Validate password format and match
    if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match." });
    }

    try {
        // Update user's password in the database
        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const user = await Teacher.findOne({ email });

        const updatedTeacher = await Teacher.findByIdAndUpdate(user.id, {
            password: hashedPassword // Update with hashed password
        }, { new: true });

        if (!updatedTeacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        res.status(200).json({ message: "Teacher updated", teacher: updatedTeacher });
        console.log("User after update:", user); // Log the user object after update

        if (!user) {
            return res.status(404).json({ message: "Invalid or expired token." });
        }

        // Password reset successful
        return res.status(200).json({ message: "Password reset successful." });
    } catch (error) {
        console.error("Error resetting password:", error);
        return res.status(500).json({ error: "An error occurred while processing the request." });
    }
});



export default router;
