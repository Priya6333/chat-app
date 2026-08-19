import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhook = async (req, res) => {
  try {
    const webhookSecret =
      process.env.CLERK_WEBHOOK_SECRET ||
      process.env.CLERK_WEBHOOK_SIGNING_SECRET;

    if (!webhookSecret) {
      return res.status(500).json({
        success: false,
        message:
          "CLERK_WEBHOOK_SECRET or CLERK_WEBHOOK_SIGNING_SECRET is missing in environment variables.",
      });
    }

    // Get Svix headers
    const svixId = req.headers["svix-id"];
    const svixTimestamp = req.headers["svix-timestamp"];
    const svixSignature = req.headers["svix-signature"];

    if (!svixId || !svixTimestamp || !svixSignature) {
      return res.status(400).json({
        success: false,
        message: "Missing Svix webhook headers",
      });
    }

    const rawPayload =
      req.body instanceof Buffer
        ? req.body.toString("utf8")
        : typeof req.body === "string"
          ? req.body
          : JSON.stringify(req.body);

    // Verify webhook
    const wh = new Webhook(webhookSecret);

    const evt = wh.verify(rawPayload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    });

    const eventType = evt.type;
    const data = evt.data;

    console.log(`Clerk Webhook Received [${eventType}]`);

    // ===============================
    // User Created
    // ===============================
    if (eventType === "user.created") {
      const clerkId = data.id;
      const email = data.email_addresses?.[0]?.email_address || "";

      let username =
        data.username ||
        data.first_name ||
        `user_${clerkId.slice(-6)}`;

      const name =
        `${data.first_name || ""} ${data.last_name || ""}`.trim() ||
        username;

      const profileImage = data.image_url || "";

      let existingUser = await User.findOne({
        $or: [{ clerkId }, { email }],
      });

      if (existingUser) {
        existingUser.clerkId = clerkId;
        if (profileImage) existingUser.profileImage = profileImage;
        if (name) existingUser.name = name;
        await existingUser.save();

        console.log("User updated in MongoDB via user.created webhook:", existingUser._id);
        return res.status(200).json({
          success: true,
          message: "User synced successfully",
          data: existingUser,
        });
      }

      const usernameExists = await User.findOne({ username });
      if (usernameExists) {
        username = `${username}_${Math.floor(100 + Math.random() * 900)}`;
      }

      // Create MongoDB user
      const user = await User.create({
        clerkId,
        username,
        name,
        email,
        profileImage,
      });

      console.log("User created in MongoDB via webhook:", user._id);

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

      const email = data.email_addresses?.[0]?.email_address || "";
      const name = `${data.first_name || ""} ${data.last_name || ""}`.trim();
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

      await User.findOneAndUpdate({ clerkId }, updateData, { new: true });

      console.log("User updated in MongoDB via webhook:", clerkId);

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

      await User.findOneAndDelete({ clerkId });

      console.log("User deleted from MongoDB via webhook:", clerkId);

      return res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Webhook received: ${eventType}`,
    });
  } catch (error) {
    console.error("Clerk Webhook Verification Error:", error.message);

    return res.status(400).json({
      success: false,
      message: "Webhook verification failed",
      error: error.message,
    });
  }
};

export { clerkWebhook };