import { Search } from "lucide-react";
import ChatItem from "./ChatItem";

const chats = [
  {
    id: 1,
    username: "poonam",
    avatar: "https://i.pravatar.cc/150?img=47",
    message: "Hey! How are you? 😊",
    time: "2m",
    online: true,
    unread: 2,
  },
  {
    id: 2,
    username: "yash",
    avatar: "https://i.pravatar.cc/150?img=12",
    message: "Let's work on the project.",
    time: "15m",
    online: true,
    unread: 1,
  },
  {
    id: 3,
    username: "kiran",
    avatar: "https://i.pravatar.cc/150?img=5",
    message: "Okay 👍",
    time: "1h",
    online: false,
    unread: 0,
  },
  {
    id: 4,
    username: "aniket",
    avatar: "https://i.pravatar.cc/150?img=11",
    message: "See you tomorrow!",
    time: "3h",
    online: true,
    unread: 0,
  },
  {
    id: 5,
    username: "moon",
    avatar: "https://i.pravatar.cc/150?img=25",
    message: "That's amazing ✨",
    time: "Yesterday",
    online: false,
    unread: 0,
  },
];

function ChatList() {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl border border-gray-200 overflow-hidden">

      {/* Search */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full bg-gray-100 rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-purple-200"
          />

        </div>
      </div>

      {/* Chat Items */}
      <div>
        {chats.map((chat) => (
          <ChatItem
            key={chat.id}
            chat={chat}
          />
        ))}
      </div>

    </div>
  );
}

export default ChatList;