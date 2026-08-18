import express from "express";
import {
  getProfile,
  updateProfile,
  getProfileStats,
} from "../controllers/profileController.js";

const router = express.Router();

router.get("/:userId", getProfile);
router.put("/:userId", updateProfile);
router.get("/:userId/stats", getProfileStats);

export default router;