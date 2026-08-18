export const followUser = async (req, res) => {
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