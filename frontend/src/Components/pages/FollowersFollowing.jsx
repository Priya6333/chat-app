import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, UserPlus, UserCheck } from "lucide-react";
import Avatar from "../common/Avatar";

const users = [
  {
    id: 1,
    username: "poonam",
    name: "Poonam",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: 2,
    username: "yash",
    name: "Yash",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 3,
    username: "kiran",
    name: "Kiran",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 4,
    username: "aniket",
    name: "Aniket",
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: 5,
    username: "moon",
    name: "Moon",
    avatar: "https://i.pravatar.cc/150?img=25",
  },
];

function FollowersFollowing() {
  const navigate = useNavigate();
  const location = useLocation();

  const isFollowingPage = location.pathname.includes("following");

  const [followedUsers, setFollowedUsers] = useState([]);

  const toggleFollow = (id) => {
    setFollowedUsers((prev) =>
      prev.includes(id)
        ? prev.filter((userId) => userId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">

          <button
            onClick={() => navigate("/profile")}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <ArrowLeft size={22} />
          </button>

          <h1 className="text-xl font-bold text-gray-800">
            {isFollowingPage ? "Following" : "Followers"}
          </h1>

        </div>
      </header>

      {/* Users */}
      <main className="max-w-2xl mx-auto px-4 py-6">

        <div className="bg-white rounded-2xl border border-gray-200 p-5">

          <div className="space-y-5">

            {users.map((user) => {
              const isFollowed = followedUsers.includes(user.id);

              return (
                <div
                  key={user.id}
                  className="flex items-center justify-between"
                >

                  {/* User */}
                  <div className="flex items-center gap-3">

                    <Avatar
                      src={user.avatar}
                      alt={user.username}
                      size="md"
                    />

                    <div>
                      <p className="font-semibold text-gray-800">
                        {user.username}
                      </p>

                      <p className="text-sm text-gray-500">
                        {user.name}
                      </p>
                    </div>

                  </div>

                  {/* Follow */}
                  <button
                    onClick={() => toggleFollow(user.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition ${
                      isFollowed
                        ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        : "bg-purple-600 text-white hover:bg-purple-700"
                    }`}
                  >
                    {isFollowed ? (
                      <>
                        <UserCheck size={16} />
                        Following
                      </>
                    ) : (
                      <>
                        <UserPlus size={16} />
                        Follow
                      </>
                    )}
                  </button>

                </div>
              );
            })}

          </div>

        </div>

      </main>

    </div>
  );
}

export default FollowersFollowing;