function ProfileStats({ posts, followers, following }) {
  return (
    <div className="flex gap-8 mt-6">

      <div>
        <p className="font-bold text-gray-800">{posts}</p>
        <p className="text-sm text-gray-500">Posts</p>
      </div>

      <div>
        <p className="font-bold text-gray-800">{followers}</p>
        <p className="text-sm text-gray-500">Followers</p>
      </div>

      <div>
        <p className="font-bold text-gray-800">{following}</p>
        <p className="text-sm text-gray-500">Following</p>
      </div>

    </div>
  );
}

export default ProfileStats;