const express = require("express");
const router = express.Router();

//import controllers
const { register, login, logout, getLoggedInAdmin, view, deleteAdmin, updateAdmin } = require("../controllers/admin");

//import middlewares
const { verifyToken } = require("../middlewares/adminAuth");
const { adminById } = require("../middlewares/admin");

//api routes
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/admin", verifyToken, adminById, getLoggedInAdmin);
router.get("/view", view);
router.delete("/admin/:adminID", deleteAdmin);
router.get("/admin/:adminID", adminById);
router.put("/admin/:adminID", updateAdmin);

module.exports = router;