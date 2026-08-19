import Post from "../models/Post.js";

const createPost = async (req, res) => {
  try {
    const { caption, image, video } = req.body;

    if (!caption && !image && !video) {
      return res.status(400).json({
        success: false,
        message: "Post content is required",
      });
    }

    const post = await Post.create({
      user: req.user._id,
      caption: caption || "",
      image: image || null,
      video: video || null,
    });

    const populatedPost = await Post.findById(post._id).populate(
      "user",
      "name username profilePicture"
    );

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: populatedPost,
    });
  } catch (error) {
    console.error("Create Post Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create post",
      error: error.message,
    });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name username profilePicture")
      .populate("likes", "name username profilePicture")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    console.error("Get Posts Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get posts",
      error: error.message,
    });
  }
};

const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId)
      .populate("user", "name username profilePicture")
      .populate("likes", "name username profilePicture");

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error("Get Post Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get post",
      error: error.message,
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { caption } = req.body;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this post",
      });
    }

    post.caption = caption ?? post.caption;
    await post.save();

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: post,
    });
  } catch (error) {
    console.error("Update Post Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update post",
      error: error.message,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this post",
      });
    }

    await Post.findByIdAndDelete(postId);

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error("Delete Post Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete post",
      error: error.message,
    });
  }
};

const likePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const userId = req.user._id;

    if (post.likes.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: "Post already liked",
      });
    }

    post.likes.push(userId);
    await post.save();

    res.status(200).json({
      success: true,
      message: "Post liked successfully",
      likesCount: post.likes.length,
    });
  } catch (error) {
    console.error("Like Post Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to like post",
      error: error.message,
    });
  }
};

const unlikePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    post.likes = post.likes.filter(
      (id) => id.toString() !== req.user._id.toString()
    );

    await post.save();

    res.status(200).json({
      success: true,
      message: "Post unliked successfully",
      likesCount: post.likes.length,
    });
  } catch (error) {
    console.error("Unlike Post Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to unlike post",
      error: error.message,
    });
  }
};

export {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
};