import Notification from "../models/Notification.js";

const getNotifications = async (req, res) => {
  try {
    const userId = req.auth.userId;

    const notifications = await Notification.find({
      recipient: userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    console.error("Get notifications error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch notifications",
    });
  }
};

const createNotification = async (req, res) => {
  try {
    const recipient = req.body.recipient;
    const sender = req.auth.userId;
    const { type, message, postId } = req.body;

    const notification = await Notification.create({
      recipient,
      sender,
      type,
      message,
      postId,
    });

    res.status(201).json({
      success: true,
      notification,
    });
  } catch (error) {
    console.error("Create notification error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create notification",
    });
  }
};

const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      {
        _id: req.params.id,
        recipient: req.auth.userId,
      },
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.status(200).json({
      success: true,
      notification,
    });
  } catch (error) {
    console.error("Mark notification error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update notification",
    });
  }
};

export { getNotifications, createNotification, markAsRead };