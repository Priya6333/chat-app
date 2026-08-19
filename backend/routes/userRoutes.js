import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  searchUsers,
  getUserById,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getAllUsers);
router.get("/search", protect, searchUsers);
router.get("/:userId", protect, getUserById);
router.get("/profile/me", protect, getUserProfile);
router.put("/profile/me", protect, updateUserProfile);

export default router;