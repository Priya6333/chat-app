import ProfileHeader from "../profile/ProfileHeader";
import ProfileStats from "../profile/ProfileStats";
import PostGrid from "../profile/PostGrid";

import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import MobileNav from "../layout/MobileNav";

const user = {
  username: "priyanka",
  name: "Priyanka Jagtap",
  avatar: "https://i.pravatar.cc/300?img=32",
  bio: "Computer Engineering Student 💻 | Full Stack Developer 🚀",
  posts: 12,
  followers: 256,
  following: 180,
};

const posts = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600",
  },
];

function Profile() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================= NAVBAR ================= */}
      <Navbar />

      <div className="flex">

        {/* ================= SIDEBAR ================= */}
        <Sidebar />

        {/* ================= MAIN CONTENT ================= */}
        <main className="w-full lg:ml-64 px-4 sm:px-6 py-6 pb-24">

          <div className="max-w-4xl mx-auto">

            {/* ================= PROFILE HEADER ================= */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">

              <ProfileHeader user={user} />

              {/* ================= STATS ================= */}
              <ProfileStats
                posts={user.posts}
                followers={user.followers}
                following={user.following}
              />

              {/* ================= BIO ================= */}
              <div className="mt-5">

                <h2 className="font-semibold text-gray-800">
                  {user.name}
                </h2>

                <p className="text-sm text-gray-600 mt-1">
                  {user.bio}
                </p>

              </div>

            </div>


            {/* ================= POSTS ================= */}
            <div className="mt-6 bg-white rounded-2xl border border-gray-200 p-4">

              <h2 className="font-semibold text-gray-800 mb-4">
                Posts
              </h2>

              <PostGrid posts={posts} />

            </div>

          </div>

        </main>

      </div>

      {/* ================= MOBILE NAV ================= */}
      <MobileNav />

    </div>
  );
}

export default Profile;