import { Server } from "socket.io";

const onlineUsers = new Map();

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // User online
    socket.on("user-online", (userId) => {
      onlineUsers.set(userId, socket.id);

      io.emit(
        "online-users",
        Array.from(onlineUsers.keys())
      );
    });

    // Join chat
    socket.on("join-chat", (chatId) => {
      socket.join(chatId);

      console.log(`User joined chat: ${chatId}`);
    });

    // Send message
    socket.on("send-message", (message) => {
      const { chatId, receiverId } = message;

      io.to(chatId).emit("receive-message", message);

      const receiverSocketId = onlineUsers.get(receiverId);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit(
          "new-message",
          message
        );
      }
    });

    // Typing
    socket.on("typing", ({ chatId, userId }) => {
      socket.to(chatId).emit("user-typing", {
        userId,
      });
    });

    // Stop typing
    socket.on("stop-typing", ({ chatId, userId }) => {
      socket.to(chatId).emit("user-stop-typing", {
        userId,
      });
    });

    // Disconnect
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);

      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }

      io.emit(
        "online-users",
        Array.from(onlineUsers.keys())
      );
    });
  });

  return io;
};

export default initializeSocket;