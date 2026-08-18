import express from "express";
import {
  getFollowing,
} from "../controllers/followingController.js";

const router = express.Router();

router.get("/:userId", getFollowing);

export default router;