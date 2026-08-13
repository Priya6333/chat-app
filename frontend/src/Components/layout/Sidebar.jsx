import { useNavigate, useLocation } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      name: "Home",
      path: "/home",
      icon: "⌂",
    },
    {
      name: "Explore",
      path: "/explore",
      icon: "⌕",
    },
    {
      name: "Search",
      path: "/search",
      icon: "🔍",
    },
    {
      name: "Notifications",
      path: "/notifications",
      icon: "♡",
    },
    {
      name: "Messages",
      path: "/chat",
      icon: "✉",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "◉",
    },
    {
      name: "Settings",
      path: "/settings",
      icon: "⚙",
    },
  ];

  return (
    <aside className="hidden lg:block fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 p-5">

      <nav className="space-y-2">

        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

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
              <span className="text-xl w-6">
                {item.icon}
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