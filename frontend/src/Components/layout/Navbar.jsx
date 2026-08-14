import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">

      <div className="h-16 px-4 sm:px-6 flex items-center justify-between">

        {/* ================= LOGO ================= */}
        <button
          onClick={() => navigate("/home")}
          className="flex items-center gap-2"
        >

          {/* Instagram Style Logo */}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center">

            <div className="w-6 h-6 rounded-[7px] border-2 border-white relative">

              {/* Camera Lens */}
              <div className="absolute w-2.5 h-2.5 rounded-full border-2 border-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              </div>

              {/* Camera Dot */}
              <div className="absolute w-1.5 h-1.5 rounded-full bg-white top-0.5 right-0.5">
              </div>

            </div>

          </div>

          {/* Instagram Text */}
          <h1 className="hidden sm:block text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
            Instagram
          </h1>

        </button>


        {/* ================= SEARCH ================= */}
        <button
          onClick={() => navigate("/search")}
          className="hidden sm:flex items-center gap-2 w-64 bg-gray-100 rounded-xl px-4 py-2 text-sm text-gray-400 hover:bg-gray-200 transition"
        >

          <Search size={17} />

          <span>
            Search
          </span>

        </button>


        {/* ================= PROFILE ================= */}
        <button
          onClick={() => navigate("/profile")}
          className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-transparent hover:ring-purple-300 transition"
        >

          <img
            src="https://i.pravatar.cc/150?img=32"
            alt="Profile"
            className="w-full h-full object-cover"
          />

        </button>

      </div>

    </header>
  );
}

export default Navbar;