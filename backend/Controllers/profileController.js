import User from "../models/User.js";
import Follow from "../models/Follow.js";

// GET PROFILE
export const getProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const followersCount = await Follow.countDocuments({
      following: userId,
    });

    const followingCount = await Follow.countDocuments({
      follower: userId,
    });

    res.status(200).json({
      success: true,

      user: {
        ...user.toObject(),
        followersCount,
        followingCount,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// UPDATE PROFILE
export const updateProfile = async (req, res) => {
  try {
    const userId = req.params.userId;

    // User can only update their own profile
    if (req.user.id !== userId) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own profile",
      });
    }

    const {
      name,
      username,
      bio,
      profileImage,
    } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (name !== undefined) {
      user.name = name;
    }

    if (username !== undefined) {
      user.username = username;
    }

    if (bio !== undefined) {
      user.bio = bio;
    }

    if (profileImage !== undefined) {
      user.profileImage = profileImage;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",

      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        bio: user.bio,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// PROFILE STATS
export const getProfileStats = async (req, res) => {
  try {
    const { userId } = req.params;

    const followersCount = await Follow.countDocuments({
      following: userId,
    });

    const followingCount = await Follow.countDocuments({
      follower: userId,
    });

    res.status(200).json({
      success: true,
      followers: followersCount,
      following: followingCount,
      posts: 0,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};