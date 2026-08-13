import NotificationItem from "../notifications/NotificationItem";

const notifications = [
  {
    id: 1,
    username: "poonam",
    avatar: "https://i.pravatar.cc/150?img=47",
    message: "started following you",
    time: "5 min ago",
    icon: "👤",
    type: "follow",
    action: "Follow Back",
  },
  {
    id: 2,
    username: "yash",
    avatar: "https://i.pravatar.cc/150?img=12",
    message: "liked your post",
    time: "20 min ago",
    icon: "❤️",
    type: "like",
    postImage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=200",
  },
  {
    id: 3,
    username: "kiran",
    avatar: "https://i.pravatar.cc/150?img=5",
    message: "commented on your post",
    time: "1 hour ago",
    icon: "💬",
    type: "comment",
    postImage:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=200",
  },
  {
    id: 4,
    username: "aniket",
    avatar: "https://i.pravatar.cc/150?img=11",
    message: "sent you a message",
    time: "2 hours ago",
    icon: "💬",
    type: "message",
    action: "Message",
  },
];

function Notifications() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Notifications
          </h1>
        </div>
      </header>

      {/* Notifications */}
      <main className="max-w-2xl mx-auto mt-4 bg-white rounded-2xl shadow-sm overflow-hidden">

        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
          />
        ))}

      </main>

    </div>
  );
}

export default Notifications;