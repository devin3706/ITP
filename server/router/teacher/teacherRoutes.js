import express from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import Teacher from "../../models/teacher/Teacher.js";

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
        password,
        confirmPassword
    } = req.body;

    try {
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
            password: password,
            confirmPassword: confirmPassword
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

        // Return the token in the response
        res.status(200).json({ message: "Authentication successful", token });
    } catch (error) {
        // If an error occurs, return an error response
        console.error("Login error:", error);
        res.status(500).json({ error: "An error occurred while processing the request." });
    }
});

export default router;
