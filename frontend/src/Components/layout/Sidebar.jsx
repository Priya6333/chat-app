import { useNavigate, useLocation } from "react-router-dom";

import {
  Home as HomeIcon,
  Compass,
  Search,
  Plus,
  Heart,
  MessageCircle,
  UserCircle,
  Settings,
} from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      name: "Home",
      path: "/home",
      icon: HomeIcon,
    },
    {
      name: "Explore",
      path: "/explore",
      icon: Compass,
    },
    {
      name: "Search",
      path: "/search",
      icon: Search,
    },
    {
      name: "Create",
      path: "/create-post",
      icon: Plus,
    },
    {
      name: "Notifications",
      path: "/notifications",
      icon: Heart,
    },
    {
      name: "Messages",
      path: "/chat",
      icon: MessageCircle,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: UserCircle,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="hidden lg:block fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 p-5">

      {/* Profile Section */}
      <div
        onClick={() => navigate("/profile")}
        className="flex items-center gap-3 px-3 py-4 mb-5 border-b border-gray-200 cursor-pointer rounded-xl hover:bg-gray-50 transition"
      >
        <img
          src="https://i.pravatar.cc/150?img=32"
          alt="Priyanka"
          className="w-12 h-12 rounded-full object-cover"
        />

        <div className="min-w-0">
          <p className="font-semibold text-gray-800 truncate">
            Priyanka
          </p>

          <p className="text-xs text-gray-500 truncate">
            @priyanka
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">

        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition ${
                isActive
                  ? "bg-purple-100 text-purple-600 font-semibold"
                  : "text-gray-700 hover:bg-gray-100 hover:text-purple-600"
              }`}
            >
              <span className="w-6 flex items-center">
                <Icon
                  size={21}
                  strokeWidth={1.8}
                />
              </span>

              <span>{item.name}</span>
            </button>
          );
        })}

      </nav>

    </aside>
  );
}

export default Sidebar;