const Admin = require("../models/admins");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
    //check
    const usenameExists = await Admin.findOne({
        username: req.body.username,
    });

    const emailExists = await Admin.findOne({
        email: req.body.email,
    });

    if (usenameExists) {
        return res.status(403).json({
            error: "Username is taken",
        });
    }

    if (emailExists) {
        return res.status(403).json({
            error: "Email is taken",
        });
    }

    // Generate unique integer ID number
    const adminCount = await Admin.countDocuments();
    
    let adminID = adminCount + 1;
    while (await Admin.exists({ adminID })) {
        // Increment adminId
        adminID++; 
    }

    // Create admin with unique integer ID
    const adminData = { ...req.body, adminID };
    const admin = new Admin(adminData);

    try {
        await admin.save();
        res.status(201).json({
            message: "Admin Account Created!",
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to create admin account",
        });
    }

    //create admin
    // const admin = new Admin(req.body);
    // await admin.save();

    // res.status(201).json({
    //     message: "Admin Account Created!",
    // });
};


// exports.login = async (req, res) => {
//     //find the user
//     const { username, email, password } = req.body;

//     await Admin.findOne({username, email }).exec((err, admin) => {
//         //error or no admin
//         if (err || !admin) {
//             return res.status(401).json({
//                 error: "Invalid Credentials",
//             });
//         }

//         //admin found
//         if (!admin.authenticate(password)) {
//             return res.status(401).json({
//                 error: "Invalid Username, Email or Password",
//             });
//         }

//         const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET, {
//             expiresIn: "24h",
//         });

//         res.cookie("jwt", token, { expire: new Date() + 9999, httpOnly: true });

//         const { username } = admin;
//         return res.json({
//             message: "Login Successful!",
//             username,
//         });
//     });
// };

exports.login = async (req, res) => {
    // Destructure username, email, and password from req.body
    const { username, email, password } = req.body;

    try {
        // Find the admin
        const admin = await Admin.findOne({ username, email });

        // If no admin found
        if (!admin) {
            return res.status(401).json({
                error: "Invalid Credentials",
            });
        }

        // If admin found, but password is incorrect
        if (!admin.authenticate(password)) {
            return res.status(401).json({
                error: "Invalid Password",
            });
        }

        // If admin found and password is correct, generate JWT token
        const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });

        // Set the JWT token in a cookie
        res.cookie("jwt", token, { expire: new Date() + 9999, httpOnly: true });

        // Return success message along with username
        return res.json({
            message: "Login Successful!",
            username: admin.username,
        });
    } catch (error) {
        // Handle any errors
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.logout = (req, res) => {
    //clear cookie
    res.clearCookie("jwt");

    return res.json({
        message: "Logout Successfully!",
    });
};

exports.getLoggedInAdmin = (req, res) => {
    const { username } = req.admin;

    return res.status(200).json({
        message: "User is still logged in",
        username: username,
    });
};

exports.view = async (req, res) => {
    try {
        // Fetch all admin records
        const admins = await Admin.find({}, '-hashedPassword -salt');

        res.status(200).json({
            message: "Admins retrieved successfully",
            admins: admins,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.deleteAdmin = async (req, res) => {
    try {
        const { adminID } = req.params;
        
        // Find admin by ID and delete
        await Admin.findByIdAndDelete(adminID);

        res.json({ message: "Admin account deleted successfully" });
    } catch (error) {
        console.error("Failed to delete admin account:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.updateAdmin = async (req, res) => {
    try {
        const { adminID } = req.params;
        const { fName, lName, username, email, contact } = req.body;

        // Find admin by ID and update details
        const updatedAdmin = await Admin.findByIdAndUpdate(adminID, { fName, lName, username, email, contact }, { new: true });

        if (!updatedAdmin) {
            return res.status(404).json({ error: "Admin not found" });
        }

        res.json({ message: "Admin account updated successfully", admin: updatedAdmin });
    } catch (error) {
        console.error("Failed to update admin account:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};