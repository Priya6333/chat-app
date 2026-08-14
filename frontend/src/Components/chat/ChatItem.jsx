import { useNavigate } from "react-router-dom";
import Avatar from "../common/Avatar";

function ChatItem({ chat }) {
  const navigate = useNavigate();

  return (
    <button
  type="button"
  onClick={() => navigate(`/chat/${chat.username}`)}
  className="w-full flex items-center gap-4 p-4 text-left border-b border-gray-100 hover:bg-gray-50 transition"
>
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <Avatar
          src={chat.avatar}
          alt={chat.username}
          size="md"
        />

        {chat.online && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
        )}
      </div>

      {/* User Info */}
      <div className="flex-1 min-w-0">

        <div className="flex items-center justify-between">
          <p className="font-semibold text-gray-800">
            {chat.username}
          </p>

          <span className="text-xs text-gray-400">
            {chat.time}
          </span>
        </div>

        <div className="flex items-center justify-between mt-1">

          <p className="text-sm text-gray-500 truncate">
            {chat.message}
          </p>

          {chat.unread > 0 && (
            <span className="ml-3 w-5 h-5 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center">
              {chat.unread}
            </span>
          )}

        </div>

      </div>
    </button>
  );
}

export default ChatItem;