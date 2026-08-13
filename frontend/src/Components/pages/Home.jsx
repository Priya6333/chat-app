import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import MobileNav from "../layout/MobileNav";
import StoryBar from "../feed/StoryBar";
import PostCard from "../feed/PostCard";

const posts = [
  {
    id: 1,
    username: "pooja",
    avatar: "https://i.pravatar.cc/150?img=47",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=900",
    caption: "Beautiful day ✨",
    likes: 124,
    comments: 12,
  },
  {
    id: 2,
    username: "yash",
    avatar: "https://i.pravatar.cc/150?img=12",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900",
    caption: "Exploring new places 🌄",
    likes: 89,
    comments: 7,
  },
];

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Top Navbar */}
      <Navbar />

      <div className="flex">

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="w-full lg:ml-64 lg:mr-80 px-4 sm:px-6 py-6 pb-24">

          {/* Stories */}
          <StoryBar />

          {/* Posts */}
          <div className="max-w-xl mx-auto mt-6 space-y-6">

            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
              />
            ))}

          </div>

        </main>

      </div>

      {/* Mobile Navigation */}
      <MobileNav />

    </div>
  );
}

export default Home;