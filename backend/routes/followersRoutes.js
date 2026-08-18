import express from "express";
import {
  getFollowers,
} from "../controllers/followersController.js";

const router = express.Router();

router.get("/:userId", getFollowers);

export default router;