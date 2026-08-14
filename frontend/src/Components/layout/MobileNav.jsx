import { useNavigate, useLocation } from "react-router-dom";

import {
  Home as HomeIcon,
  Compass,
  Plus,
  Heart,
  MessageCircle,
} from "lucide-react";

function MobileNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200">

      <div className="flex justify-around items-center h-16 px-2">

        {/* ================= HOME ================= */}
        <button
          onClick={() => navigate("/home")}
          className={`p-2 transition ${
            isActive("/home")
              ? "text-purple-600"
              : "text-gray-600 hover:text-purple-600"
          }`}
        >
          <HomeIcon
            size={22}
            strokeWidth={isActive("/home") ? 2.3 : 1.8}
          />
        </button>

        {/* ================= EXPLORE ================= */}
        <button
          onClick={() => navigate("/explore")}
          className={`p-2 transition ${
            isActive("/explore")
              ? "text-purple-600"
              : "text-gray-600 hover:text-purple-600"
          }`}
        >
          <Compass
            size={22}
            strokeWidth={isActive("/explore") ? 2.3 : 1.8}
          />
        </button>

        {/* ================= CREATE POST ================= */}
        <button
          onClick={() => navigate("/create-post")}
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-purple-600 text-white shadow-md hover:bg-purple-700 active:scale-95 transition"
        >
          <Plus size={24} strokeWidth={2} />
        </button>

        {/* ================= MESSAGES ================= */}
        <button
          onClick={() => navigate("/chat")}
          className={`p-2 transition ${
            isActive("/chat")
              ? "text-purple-600"
              : "text-gray-600 hover:text-purple-600"
          }`}
        >
          <MessageCircle
            size={22}
            strokeWidth={isActive("/chat") ? 2.3 : 1.8}
          />
        </button>

        {/* ================= NOTIFICATIONS ================= */}
        <button
          onClick={() => navigate("/notifications")}
          className={`p-2 transition ${
            isActive("/notifications")
              ? "text-purple-600"
              : "text-gray-600 hover:text-purple-600"
          }`}
        >
          <Heart
            size={22}
            strokeWidth={isActive("/notifications") ? 2.3 : 1.8}
          />
        </button>

        {/* ================= PROFILE ================= */}
        <button
          onClick={() => navigate("/profile")}
          className="p-1"
        >
          <img
            src="https://i.pravatar.cc/150?img=32"
            alt="Profile"
            className={`w-7 h-7 rounded-full object-cover transition ${
              isActive("/profile")
                ? "ring-2 ring-purple-500 ring-offset-1"
                : "hover:ring-2 hover:ring-gray-300"
            }`}
          />
        </button>

      </div>

    </nav>
  );
}

export default MobileNav;