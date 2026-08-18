import Follow from "../models/Follow.js";

export const getFollowing = async (req, res) => {
  try {
    const { userId } = req.params;

    const following = await Follow.find({
      follower: userId,
    })
      .populate(
        "following",
        "username name profileImage bio"
      )
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