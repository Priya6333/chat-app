import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Message from "./Message";
import MessageInput from "./MessageInput";

import {
  ArrowLeft,
  Phone,
  Video,
  MoreVertical,
} from "lucide-react";

import Avatar from "../common/Avatar";

const users = [
  {
    username: "poonam",
    name: "Poonam",
    avatar: "https://i.pravatar.cc/150?img=47",
    online: true,
  },
  {
    username: "yash",
    name: "Yash",
    avatar: "https://i.pravatar.cc/150?img=12",
    online: true,
  },
  {
    username: "kiran",
    name: "Kiran",
    avatar: "https://i.pravatar.cc/150?img=5",
    online: false,
  },
  {
    username: "aniket",
    name: "Aniket",
    avatar: "https://i.pravatar.cc/150?img=11",
    online: true,
  },
  {
    username: "moon",
    name: "Moon",
    avatar: "https://i.pravatar.cc/150?img=25",
    online: false,
  },
];

const initialMessages = {
  poonam: [
    {
      id: 1,
      text: "Hey! How are you? 😊",
      sender: "them",
      time: "10:30 PM",
    },
    {
      id: 2,
      text: "I'm good! How about you?",
      sender: "me",
      time: "10:31 PM",
    },
    {
      id: 3,
      text: "I'm doing great! ✨",
      sender: "them",
      time: "10:32 PM",
    },
  ],

  yash: [
    {
      id: 1,
      text: "Hey, project complete zala ka?",
      sender: "them",
      time: "9:20 PM",
    },
    {
      id: 2,
      text: "Almost! Thoda frontend remaining aahe.",
      sender: "me",
      time: "9:22 PM",
    },
  ],

  kiran: [
    {
      id: 1,
      text: "Kal college la yetoy ka?",
      sender: "them",
      time: "6:10 PM",
    },
    {
      id: 2,
      text: "Ho, nakki 😄",
      sender: "me",
      time: "6:12 PM",
    },
  ],

  aniket: [
    {
      id: 1,
      text: "Bro, website baghitli 🔥",
      sender: "them",
      time: "4:30 PM",
    },
    {
      id: 2,
      text: "Thanks bro! 😎",
      sender: "me",
      time: "4:35 PM",
    },
  ],

  moon: [
    {
      id: 1,
      text: "That design looks amazing ✨",
      sender: "them",
      time: "Yesterday",
    },
    {
      id: 2,
      text: "Thank you! 💜",
      sender: "me",
      time: "Yesterday",
    },
  ],
};

function ChatWindow() {
  const navigate = useNavigate();
  const { username } = useParams();

  // Current user
  const user =
    users.find((u) => u.username === username) || users[0];

  // Current user's messages
  const [messages, setMessages] = useState(
    initialMessages[username] || []
  );

  // Send new message
  const handleSend = (text) => {
    if (!text.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: text,
      sender: "me",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">

      {/* ================= HEADER ================= */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">

        <div className="max-w-3xl mx-auto flex items-center gap-3 w-full">

          {/* Back Button */}
          <button
            onClick={() => navigate("/chat")}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <ArrowLeft size={21} />
          </button>

          {/* Avatar */}
          <div className="relative">

            <Avatar
              src={user.avatar}
              alt={user.username}
              size="md"
            />

            {user.online && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
            )}

          </div>

          {/* User Info */}
          <div className="flex-1">

            <p className="font-semibold text-gray-800">
              {user.username}
            </p>

            <p
              className={`text-xs ${
                user.online
                  ? "text-green-500"
                  : "text-gray-400"
              }`}
            >
              {user.online ? "Online" : "Offline"}
            </p>

          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">

            <button
              className="p-2 rounded-full hover:bg-gray-100 transition"
              title="Call"
            >
              <Phone size={19} />
            </button>

            <button
              className="p-2 rounded-full hover:bg-gray-100 transition"
              title="Video Call"
            >
              <Video size={20} />
            </button>

            <button
              className="p-2 rounded-full hover:bg-gray-100 transition"
              title="More"
            >
              <MoreVertical size={20} />
            </button>

          </div>

        </div>

      </header>

      {/* ================= MESSAGES ================= */}
      <main className="flex-1 overflow-y-auto px-4 py-6">

        <div className="max-w-2xl mx-auto space-y-3">

          {messages.length > 0 ? (
            messages.map((msg) => (
              <Message
                key={msg.id}
                message={msg}
              />
            ))
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-400 text-sm">
                No messages yet. Say hello 👋
              </p>
            </div>
          )}

        </div>

      </main>

      {/* ================= MESSAGE INPUT ================= */}
      <MessageInput onSend={handleSend} />

    </div>
  );
}

export default ChatWindow;