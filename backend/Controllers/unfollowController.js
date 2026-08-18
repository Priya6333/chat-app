export const unfollowUser = async (req, res) => {
  try {
    const followerId = req.user.id;
    const followingId = req.params.userId;

    const result = await Follow.findOneAndDelete({
      follower: followerId,
      following: followingId,
    });

    if (!result) {
      return res.status(404).json({
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