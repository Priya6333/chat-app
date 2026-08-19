import UserSettings from "../models/UserSettings.js";

export const getSettings = async (req, res) => {
  try {
    const userId = req.auth.userId;

    let settings = await UserSettings.findOne({ userId });

    if (!settings) {
      settings = await UserSettings.create({
        userId,
      });
    }

    res.status(200).json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error("Get settings error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch settings",
    });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const userId = req.auth.userId;

    const {
      privateAccount,
      activityStatus,
      messageNotifications,
      darkMode,
    } = req.body;

    const settings = await UserSettings.findOneAndUpdate(
      { userId },
      {
        privateAccount,
        activityStatus,
        messageNotifications,
        darkMode,
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.status(200).json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error("Update settings error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update settings",
    });
  }
};