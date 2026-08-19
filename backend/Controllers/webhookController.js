import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhook = async (req, res) => {
  try {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

    if (!webhookSecret) {
      return res.status(500).json({
        success: false,
        message: "CLERK_WEBHOOK_SECRET is missing",
      });
    }

    // Get Svix headers
    const svixId = req.headers["svix-id"];
    const svixTimestamp = req.headers["svix-timestamp"];
    const svixSignature = req.headers["svix-signature"];

    if (!svixId || !svixTimestamp || !svixSignature) {
      return res.status(400).json({
        success: false,
        message: "Missing webhook headers",
      });
    }

    // Verify webhook
    const wh = new Webhook(webhookSecret);

    const payload = req.body;

    const evt = wh.verify(JSON.stringify(payload), {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    });

    const eventType = evt.type;
    const data = evt.data;

    // ===============================
    // User Created
    // ===============================

    if (eventType === "user.created") {
      const clerkId = data.id;

      const email =
        data.email_addresses?.[0]?.email_address || "";

      const username =
        data.username ||
        data.first_name ||
        `user_${clerkId.slice(-6)}`;

      const name =
        `${data.first_name || ""} ${data.last_name || ""}`.trim() ||
        username;

      const profileImage = data.image_url || "";

      // Check if user already exists
      const existingUser = await User.findOne({
        clerkId,
      });

      if (existingUser) {
        return res.status(200).json({
          success: true,
          message: "User already exists",
        });
      }

      // Create MongoDB user
      const user = await User.create({
        clerkId,
        username,
        name,
        email,
        profileImage,
      });

      console.log("User created in MongoDB:", user._id);

      return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: user,
      });
    }

    // ===============================
    // User Updated
    // ===============================

    if (eventType === "user.updated") {
      const clerkId = data.id;

      const email =
        data.email_addresses?.[0]?.email_address || "";

      const name =
        `${data.first_name || ""} ${data.last_name || ""}`.trim();

      const profileImage = data.image_url || "";

      const updateData = {
        email,
        profileImage,
      };

      if (name) {
        updateData.name = name;
      }

      if (data.username) {
        updateData.username = data.username;
      }

      await User.findOneAndUpdate(
        { clerkId },
        updateData,
        { new: true }
      );

      console.log("User updated in MongoDB:", clerkId);

      return res.status(200).json({
        success: true,
        message: "User updated successfully",
      });
    }

    // ===============================
    // User Deleted
    // ===============================

    if (eventType === "user.deleted") {
      const clerkId = data.id;

      await User.findOneAndDelete({
        clerkId,
      });

      console.log("User deleted from MongoDB:", clerkId);

      return res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    }

    // Other events
    return res.status(200).json({
      success: true,
      message: `Webhook received: ${eventType}`,
    });
  } catch (error) {
    console.error("Clerk Webhook Error:", error);

    return res.status(400).json({
      success: false,
      message: "Webhook verification failed",
      error: error.message,
    });
  }
};

export { clerkWebhook };