import express from "express";
import {
  getSettings,
  updateSettings,
} from "../controllers/settingsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get settings
router.get("/", protect, getSettings);

// Update settings
router.put("/", protect, updateSettings);

export default router;