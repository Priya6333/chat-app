import express from "express";

import {
  createComment,
  getPostComments,
  deleteComment,
} from "../controllers/commentController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get comments
router.get("/:postId", protect, getPostComments);

// Create comment
router.post("/:postId", protect, createComment);

// Delete comment
router.delete("/:commentId", protect, deleteComment);

export default router;