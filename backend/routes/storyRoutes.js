import express from "express";
import {
  createStory,
  getStories,
  getMyStories,
  getStoryById,
  viewStory,
  deleteStory,
} from "../controllers/storyController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createStory);
router.get("/", protect, getStories);
router.get("/me", protect, getMyStories);
router.get("/:storyId", protect, getStoryById);
router.post("/:storyId/view", protect, viewStory);
router.delete("/:storyId", protect, deleteStory);

export default router;