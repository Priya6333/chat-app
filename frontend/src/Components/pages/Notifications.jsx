import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import NotificationItem from "../notifications/NotificationItem";
import Sidebar from "../layout/Sidebar";

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
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">

        <div className="max-w-2xl mx-auto px-4 py-4">

          <div className="flex items-center gap-3">

            {/* Back */}
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-gray-100 transition"
              title="Go Back"
            >
              <ArrowLeft size={22} />
            </button>

            <h1 className="text-2xl font-bold text-gray-800">
              Notifications
            </h1>

          </div>

        </div>

      </header>

      {/* ================= NOTIFICATIONS ================= */}
      <main className="max-w-2xl mx-auto mt-4 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

        
        {/* ================= SIDEBAR ================= */}
        <Sidebar />

        {notifications.length > 0 ? (

          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))

        ) : (

          <div className="py-16 text-center">

            <div className="text-5xl mb-4">
              🔔
            </div>

            <h2 className="font-semibold text-gray-800">
              No notifications
            </h2>

            <p className="text-sm text-gray-400 mt-1">
              You're all caught up!
            </p>

          </div>

        )}

      </main>

    </div>
  );
}

export default Notifications;