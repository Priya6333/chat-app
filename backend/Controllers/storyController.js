import Story from "../models/storyModel.js";

const createStory = async (req, res) => {
  try {
    const { mediaUrl, mediaType, caption } = req.body;

    if (!mediaUrl) {
      return res.status(400).json({
        success: false,
        message: "Media URL is required",
      });
    }

    const story = await Story.create({
      user: req.user._id,
      mediaUrl,
      mediaType: mediaType || "image",
      caption: caption || "",
    });

    const populatedStory = await Story.findById(story._id).populate(
      "user",
      "name username profilePicture"
    );

    res.status(201).json({
      success: true,
      message: "Story created successfully",
      data: populatedStory,
    });
  } catch (error) {
    console.error("Create Story Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create story",
      error: error.message,
    });
  }
};

const getStories = async (req, res) => {
  try {
    const stories = await Story.find({
      expiresAt: { $gt: new Date() },
    })
      .populate("user", "name username profilePicture")
      .populate("viewers", "name username profilePicture")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: stories.length,
      data: stories,
    });
  } catch (error) {
    console.error("Get Stories Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get stories",
      error: error.message,
    });
  }
};

const getMyStories = async (req, res) => {
  try {
    const stories = await Story.find({
      user: req.user._id,
      expiresAt: { $gt: new Date() },
    })
      .populate("user", "name username profilePicture")
      .populate("viewers", "name username profilePicture")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: stories.length,
      data: stories,
    });
  } catch (error) {
    console.error("Get My Stories Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get your stories",
      error: error.message,
    });
  }
};

const getStoryById = async (req, res) => {
  try {
    const { storyId } = req.params;

    const story = await Story.findById(storyId)
      .populate("user", "name username profilePicture")
      .populate("viewers", "name username profilePicture");

    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Story not found",
      });
    }

    if (story.expiresAt <= new Date()) {
      return res.status(404).json({
        success: false,
        message: "Story has expired",
      });
    }

    res.status(200).json({
      success: true,
      data: story,
    });
  } catch (error) {
    console.error("Get Story Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get story",
      error: error.message,
    });
  }
};

const viewStory = async (req, res) => {
  try {
    const { storyId } = req.params;

    const story = await Story.findById(storyId);

    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Story not found",
      });
    }

    if (story.expiresAt <= new Date()) {
      return res.status(400).json({
        success: false,
        message: "Story has expired",
      });
    }

    if (story.user.toString() !== req.user._id.toString()) {
      const alreadyViewed = story.viewers.some(
        (id) => id.toString() === req.user._id.toString()
      );

      if (!alreadyViewed) {
        story.viewers.push(req.user._id);
        await story.save();
      }
    }

    const updatedStory = await Story.findById(storyId)
      .populate("user", "name username profilePicture")
      .populate("viewers", "name username profilePicture");

    res.status(200).json({
      success: true,
      message: "Story viewed successfully",
      data: updatedStory,
    });
  } catch (error) {
    console.error("View Story Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to view story",
      error: error.message,
    });
  }
};

const deleteStory = async (req, res) => {
  try {
    const { storyId } = req.params;

    const story = await Story.findById(storyId);

    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Story not found",
      });
    }

    if (story.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this story",
      });
    }

    await Story.findByIdAndDelete(storyId);

    res.status(200).json({
      success: true,
      message: "Story deleted successfully",
    });
  } catch (error) {
    console.error("Delete Story Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete story",
      error: error.message,
    });
  }
};

export {
  createStory,
  getStories,
  getMyStories,
  getStoryById,
  viewStory,
  deleteStory,
};  