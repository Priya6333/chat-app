import Follow from "../models/Follow.js";

export const getFollowers = async (req, res) => {
  try {
    const { userId } = req.params;

    const followers = await Follow.find({
      following: userId,
    })
      .populate(
        "follower",
        "username name profileImage bio"
      )
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