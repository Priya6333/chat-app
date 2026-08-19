import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: String,
      required: true,
    },

    sender: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["follow", "like", "comment", "message"],
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    postId: {
      type: String,
      default: null,
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Notification", notificationSchema);