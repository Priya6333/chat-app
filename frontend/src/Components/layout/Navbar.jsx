function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="h-16 px-4 sm:px-6 flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
          Instagram
        </h1>

        {/* Search */}
        <div className="hidden sm:block w-64">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-gray-100 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-100"
          />
        </div>

        {/* Profile */}
        <div className="w-9 h-9 rounded-full overflow-hidden">
          <img
            src="https://i.pravatar.cc/150?img=32"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </header>
  );
}

export default Navbar;