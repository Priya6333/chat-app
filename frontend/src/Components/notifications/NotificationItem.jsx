function NotificationItem({ notification }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white border-b border-gray-100 hover:bg-gray-50 transition">

      {/* User Avatar */}
      <div className="relative flex-shrink-0">
        <img
          src={notification.avatar}
          alt={notification.username}
          className="w-12 h-12 rounded-full object-cover"
        />

        {/* Notification Type */}
        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
          <span className="text-sm">
            {notification.icon}
          </span>
        </div>
      </div>

      {/* Notification Content */}
      <div className="flex-1 min-w-0">

        <p className="text-sm text-gray-800">
          <span className="font-semibold">
            {notification.username}
          </span>{" "}
          {notification.message}
        </p>

        <p className="text-xs text-gray-400 mt-1">
          {notification.time}
        </p>

      </div>

      {/* Action Button / Post Preview */}
      {notification.action && (
        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            notification.type === "follow"
              ? "bg-purple-600 text-white hover:bg-purple-700"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {notification.action}
        </button>
      )}

      {/* Post Image */}
      {notification.postImage && (
        <img
          src={notification.postImage}
          alt="Post"
          className="w-12 h-12 rounded-lg object-cover"
        />
      )}

    </div>
  );
}

export default NotificationItem;