import express from "express";
import {
  createannounce,
  getannounce,
  getannounces,
  updateannounce,
  deleteannounce,
} from "../../controllers/class scheduling/announceController.js";

const router = express.Router();

router.get("/", getannounces);

router.get("/:id", getannounce);

router.post("/create", createannounce);

router.delete("/:id", deleteannounce);

router.put("/:id", updateannounce);

export default router;
