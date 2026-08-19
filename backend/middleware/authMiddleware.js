import { getAuth, clerkClient } from "@clerk/express";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);

    // Check Clerk authentication
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Please login.",
      });
    }

    // Find MongoDB user using Clerk ID
    let user = await User.findOne({
      clerkId: userId,
    }).select("-password");

    if (!user) {
      try {
        const clerkUser = await clerkClient.users.getUser(userId);

        if (clerkUser) {
          const email = clerkUser.emailAddresses?.[0]?.emailAddress || "";
          let username =
            clerkUser.username ||
            clerkUser.firstName ||
            `user_${userId.slice(-6)}`;

          const name =
            `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() ||
            username;

          const profileImage = clerkUser.imageUrl || "";

          user = await User.findOne({ email });

          if (user) {
            user.clerkId = userId;
            if (profileImage) user.profileImage = profileImage;
            await user.save();
          } else {
            const usernameExists = await User.findOne({ username });
            if (usernameExists) {
              username = `${username}_${Math.floor(100 + Math.random() * 900)}`;
            }

            user = await User.create({
              clerkId: userId,
              username,
              name,
              email,
              profileImage,
            });
          }

          console.log("User auto-provisioned in MongoDB via protect middleware:", user._id);
        }
      } catch (clerkErr) {
        console.error("Clerk user fetch error in protect middleware:", clerkErr.message);
      }
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found in database.",
      });
    }

    // Attach user to request
    req.user = user;

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);

    return res.status(500).json({
      success: false,
      message: "Authentication failed.",
    });
  }
};

export { protect };