import Follow from "../models/Follow.js";

const followUser = async (req, res) => {
  try {
    const followerId = req.user.id;
    const followingId = req.params.userId;

    if (followerId === followingId) {
      return res.status(400).json({
        message: "You cannot follow yourself",
      });
    }

    const alreadyFollowing = await Follow.findOne({
      follower: followerId,
      following: followingId,
    });

    if (alreadyFollowing) {
      return res.status(400).json({
        message: "Already following this user",
      });
    }

    const follow = await Follow.create({
      follower: followerId,
      following: followingId,
    });

    res.status(201).json({
      success: true,
      message: "User followed successfully",
      follow,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const unfollowUser = async (req, res) => {
  try {
    const followerId = req.user.id;
    const followingId = req.params.userId;

    const deleted = await Follow.findOneAndDelete({
      follower: followerId,
      following: followingId,
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "You are not following this user",
      });
    }

    res.status(200).json({
      success: true,
      message: "User unfollowed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getFollowers = async (req, res) => {
  try {
    const { userId } = req.params;

    const followers = await Follow.find({ following: userId })
      .populate("follower", "username name profileImage bio")
      .sort({ createdAt: -1 });

    const users = followers.map((item) => item.follower);

    res.status(200).json({
      success: true,
      count: users.length,
      followers: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getFollowing = async (req, res) => {
  try {
    const { userId } = req.params;

    const following = await Follow.find({ follower: userId })
      .populate("following", "username name profileImage bio")
      .sort({ createdAt: -1 });

    const users = following.map((item) => item.following);

    res.status(200).json({
      success: true,
      count: users.length,
      following: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { followUser, unfollowUser, getFollowers, getFollowing };