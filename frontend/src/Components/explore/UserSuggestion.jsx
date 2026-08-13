function UserSuggestion({ user }) {
  return (
    <div className="min-w-[130px] flex flex-col items-center text-center">

      <img
        src={user.avatar}
        alt={user.username}
        className="w-16 h-16 rounded-full object-cover mb-2"
      />

      <p className="font-semibold text-sm text-gray-800">
        {user.username}
      </p>

      <button className="mt-2 px-4 py-1.5 bg-purple-600 text-white text-xs font-semibold rounded-lg hover:bg-purple-700 transition">
        Follow
      </button>

    </div>
  );
}

export default UserSuggestion;