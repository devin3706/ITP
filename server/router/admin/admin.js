import express from "express";
const router = express.Router();

// Import controllers
import { register, login, logout, getLoggedInAdmin, view, deleteAdmin, updateAdmin } from "../../controllers/admin/admin.js";

// Import middlewares
import { verifyToken } from "../../middleware/admin/adminAuth.js";
import { adminById } from "../../middleware/admin/admin.js";

// API routes
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/admin", verifyToken, adminById, getLoggedInAdmin);
router.get("/view", view);
router.delete("/admin/:adminID", deleteAdmin);
router.get("/admin/:adminID", adminById);
router.put("/admin/:adminID", updateAdmin);

export default router;