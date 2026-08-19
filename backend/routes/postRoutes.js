import express from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
} from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createPost);
router.get("/", protect, getAllPosts);
router.get("/:postId", protect, getPostById);
router.put("/:postId", protect, updatePost);
router.delete("/:postId", protect, deletePost);
router.post("/:postId/like", protect, likePost);
router.post("/:postId/unlike", protect, unlikePost);

export default router;