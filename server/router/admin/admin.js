import express from "express";
const router = express.Router();

// Import controllers
import { register, login, logout, getLoggedInAdmin, view, deleteAdmin, updateAdmin } from "../../controllers/admin/admin.js";
import { getAdminLoginsByMonth, getStudentLoginsByMonth, getTeacherLoginsByMonth, getTotalClasses, getTotalExams, getTotalFiles, getTotalStudents, getTotalTeacherLogins, getTotalTeachers } from "../../controllers/admin/summaries.js";

// Import middlewares
import { verifyToken } from "../../middleware/admin/adminAuth.js";
import { adminById } from "../../middleware/admin/admin.js";

// API routes
// Admin control
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/admin", verifyToken, adminById, getLoggedInAdmin);
router.get("/view", view);
router.delete("/admin/:adminID", deleteAdmin);
router.get("/admin/:adminID", adminById);
router.put("/admin/:adminID", updateAdmin);

//Summaries
router.get('/totalStudents', getTotalStudents);
router.get('/totalTeachers', getTotalTeachers);
router.get('/totalFiles', getTotalFiles);
router.get('/totalClasses', getTotalClasses);
router.get('/totalExams', getTotalExams);
router.get('/totalTeacherLogins', getTotalTeacherLogins);
router.get('/student-logins-by-month', getStudentLoginsByMonth);
router.get('/teacher-logins-by-month', getTeacherLoginsByMonth);
router.get('/admin-logins-by-month', getAdminLoginsByMonth);

export default router;