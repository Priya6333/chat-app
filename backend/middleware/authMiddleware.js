import { getAuth } from "@clerk/express";
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
    const user = await User.findOne({
      clerkId: userId,
    }).select("-password");

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