import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import ExploreCard from "../explore/ExploreCard";
import UserSuggestion from "../explore/UserSuggestion";

const posts = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600",
    username: "poonam",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600",
    username: "yash",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600",
    username: "kiran",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600",
    username: "aniket",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600",
    username: "moon",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600",
    username: "pooja",
  },
];

const suggestions = [
  {
    id: 1,
    username: "poonam",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: 2,
    username: "yash",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 3,
    username: "kiran",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
];

function Explore() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================= HEADER ================= */}
      <div className="bg-white border-b border-gray-200">

        <div className="max-w-6xl mx-auto px-4 py-5">

          <div className="flex items-center gap-3">

            {/* Back Button */}
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-gray-100 transition"
              title="Go Back"
            >
              <ArrowLeft size={22} />
            </button>

            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Explore
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Discover new posts and people
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* ================= MAIN ================= */}
      <main className="max-w-6xl mx-auto px-4 py-6">

        {/* Suggested Users */}
        <section className="bg-white rounded-2xl border border-gray-200 p-5 mb-6">

          <div className="flex items-center justify-between mb-4">

            <h2 className="font-semibold text-gray-800">
              Suggested for you
            </h2>

            <button
              type="button"
              className="text-sm font-semibold text-purple-600 hover:text-purple-700"
            >
              See All
            </button>

          </div>

          <div className="flex gap-5 overflow-x-auto">

            {suggestions.map((user) => (
              <UserSuggestion
                key={user.id}
                user={user}
              />
            ))}

          </div>

        </section>

        {/* Explore Posts */}
        <section>

          <h2 className="font-semibold text-gray-800 mb-4">
            Explore Posts
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">

            {posts.map((post) => (
              <ExploreCard
                key={post.id}
                post={post}
              />
            ))}

          </div>

        </section>

      </main>

    </div>
  );
}

export default Explore;