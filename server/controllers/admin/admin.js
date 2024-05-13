import Admin from "../../models/admin/admins.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import ALogins from "../../models/admin/adminLogins.js";

dotenv.config();

export const register = async (req, res) => {
    try {
        const usernameExists = await Admin.findOne({
            username: req.body.username,
        });

        const emailExists = await Admin.findOne({
            email: req.body.email,
        });

        if (usernameExists) {
            return res.status(403).json({
                error: "Username is taken",
            });
        }

        if (emailExists) {
            return res.status(403).json({
                error: "Email is taken",
            });
        }

        const adminCount = await Admin.countDocuments();
        
        let adminID = adminCount + 1;
        while (await Admin.exists({ adminID })) {
            adminID++; 
        }

        const adminData = { ...req.body, adminID };
        const admin = new Admin(adminData);

        await admin.save();
        res.status(201).json({
            message: "Admin Account Created!",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to create admin account",
        });
    }
};

export const login = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const admin = await Admin.findOne({ username, email });

        if (!admin) {
            return res.status(401).json({
                error: "Invalid Credentials",
            });
        }

        if (!admin.authenticate(password)) {
            return res.status(401).json({
                error: "Invalid Password",
            });
        }

        const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });

        res.cookie("jwt", token, { expire: new Date() + 9999, httpOnly: true });
        

        //for DPDashboard
                    const teacherEmail = email

                    // Create a new Login document
                    const ALogin = new ALogins({
                        adminEmail: teacherEmail,
                        timestamp: new Date()
                    });

                    // Save the login data to the database
                    await ALogin.save();



        return res.json({
            message: "Login Successful!",
            username: admin.username,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const logout = (req, res) => {
    res.clearCookie("jwt");
    return res.json({
        message: "Logout Successfully!",
    });
};

export const getLoggedInAdmin = (req, res) => {
    const { username } = req.admin;
    return res.status(200).json({
        message: "User is still logged in",
        username: username,
    });
};

export const view = async (req, res) => {
    try {
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

export const deleteAdmin = async (req, res) => {
    try {
        const { adminID } = req.params;
        await Admin.findByIdAndDelete(adminID);
        res.json({ message: "Admin account deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateAdmin = async (req, res) => {
    try {
        const { adminID } = req.params;
        const { fName, lName, username, email, contact } = req.body;
        const updatedAdmin = await Admin.findByIdAndUpdate(adminID, { fName, lName, username, email, contact }, { new: true });

        if (!updatedAdmin) {
            return res.status(404).json({ error: "Admin not found" });
        }

        res.json({ message: "Admin account updated successfully", admin: updatedAdmin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export default {
    register,
    login,
    logout,
    getLoggedInAdmin,
    view,
    deleteAdmin,
    updateAdmin,
};
