import { useState } from "react";

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

function Search() {
  const [query, setQuery] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(query.toLowerCase()) ||
      user.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-5">
          <h1 className="text-2xl font-bold text-gray-800">
            Search
          </h1>

          <div className="relative mt-4">
            <span className="absolute left-4 top-1/2 -translate-y-1/2">
              🔍
            </span>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search users..."
              className="w-full bg-gray-100 rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-purple-200"
            />
          </div>
        </div>
      </header>

      {/* Results */}
      <main className="max-w-2xl mx-auto px-4 py-6">

        {query === "" ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-800 mb-4">
              Recent Searches
            </h2>

            <div className="space-y-4">
              {users.slice(0, 3).map((user) => (
                <UserRow key={user.id} user={user} />
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 p-6">

            <h2 className="font-semibold text-gray-800 mb-4">
              Search Results
            </h2>

            {filteredUsers.length > 0 ? (
              <div className="space-y-4">
                {filteredUsers.map((user) => (
                  <UserRow key={user.id} user={user} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-gray-500">
                <p className="text-3xl mb-3">🔍</p>
                <p className="font-medium">No users found</p>
                <p className="text-sm mt-1">
                  Try searching another username
                </p>
              </div>
            )}

          </div>
        )}

      </main>

    </div>
  );
}

function UserRow({ user }) {
  return (
    <div className="flex items-center justify-between">

      <div className="flex items-center gap-3">
        <img
          src={user.avatar}
          alt={user.username}
          className="w-12 h-12 rounded-full object-cover"
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

      <button className="px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 transition">
        Follow
      </button>

    </div>
  );
}

export default Search;