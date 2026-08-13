function Sidebar() {
  const menuItems = [
    "Home",
    "Explore",
    "Search",
    "Notifications",
    "Messages",
    "Profile",
    "Settings",
  ];

  return (
    <aside className="hidden lg:block fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 p-5">

      <nav className="space-y-2">

        {menuItems.map((item) => (
          <button
            key={item}
            className="w-full text-left px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 hover:text-purple-600 transition"
          >
            {item}
          </button>
        ))}

      </nav>

    </aside>
  );
}

export default Sidebar;