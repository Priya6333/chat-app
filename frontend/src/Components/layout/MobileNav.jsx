import { useNavigate, useLocation } from "react-router-dom";
import {
  Home as HomeIcon,
  Compass,
  Plus,
  Heart,
} from "lucide-react";

function MobileNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200">

      <div className="flex justify-around items-center h-16 px-3">

        {/* Home */}
        <button
          onClick={() => navigate("/home")}
          className={`p-2 transition ${
            isActive("/home")
              ? "text-purple-600"
              : "text-gray-600"
          }`}
        >
          <HomeIcon size={22} strokeWidth={1.8} />
        </button>

        {/* Explore */}
        <button
          onClick={() => navigate("/explore")}
          className={`p-2 transition ${
            isActive("/explore")
              ? "text-purple-600"
              : "text-gray-600"
          }`}
        >
          <Compass size={22} strokeWidth={1.8} />
        </button>

        {/* Create */}
        <button
          onClick={() => navigate("/create-post")}
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-purple-600 text-white shadow-md hover:bg-purple-700 transition"
        >
          <Plus size={24} strokeWidth={2} />
        </button>

        {/* Notifications */}
        <button
          onClick={() => navigate("/notifications")}
          className={`p-2 transition ${
            isActive("/notifications")
              ? "text-purple-600"
              : "text-gray-600"
          }`}
        >
          <Heart size={22} strokeWidth={1.8} />
        </button>

        {/* Profile */}
        <button
          onClick={() => navigate("/profile")}
          className="p-1"
        >
          <img
            src="https://i.pravatar.cc/150?img=32"
            alt="Profile"
            className={`w-7 h-7 rounded-full object-cover ${
              isActive("/profile")
                ? "ring-2 ring-purple-500 ring-offset-1"
                : ""
            }`}
          />
        </button>

      </div>

    </nav>
  );
}

export default MobileNav;