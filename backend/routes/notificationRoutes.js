import express from "express";
import {
  getNotifications,
  createNotification,
  markAsRead,
} from "../controllers/notificationController.js";

const router = express.Router();

router.get("/", getNotifications);
router.post("/", createNotification);
router.patch("/:id/read", markAsRead);

export default router;