import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import express from "express";
import http from "http";
import "dotenv/config";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";

import connectDB from "./config/db.js";
import initializeSocket from "./socket/socket.js";

// ===============================
// Routes
// ===============================

import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import followRoutes from "./routes/followRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import storyRoutes from "./routes/storyRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import followersRoutes from "./routes/followersRoutes.js";
import followingRoutes from "./routes/followingRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import webhookRoutes from "./routes/webhookRoutes.js";

// ===============================
// Error Middleware
// ===============================

import {
  notFound,
  errorHandler,
} from "./middleware/errorMiddleware.js";

// ===============================
// App Initialization
// ===============================

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3001;

connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  clerkMiddleware({
    publishableKey:
      process.env.CLERK_PUBLISHABLE_KEY ||
      process.env.VITE_CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
  })
);

app.use(
  "/api/webhooks/clerk",
  express.raw({ type: "application/json" }),
  webhookRoutes
);

app.use(express.json());

app.get("/api/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend API is working",
  });
});

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/follows", followRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/followers", followersRoutes);
app.use("/api/following", followingRoutes);
app.use("/api/profile", profileRoutes);

initializeSocket(server);

app.use(notFound);
app.use(errorHandler);

server.listen(PORT, () => {
  console.log(`Server is Up at http://localhost:${PORT}`);
});