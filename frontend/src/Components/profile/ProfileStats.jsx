import { useNavigate } from "react-router-dom";

function ProfileStats({ posts, followers, following }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-around text-center mt-6">

      <div>
        <p className="font-bold">{posts}</p>
        <p className="text-sm text-gray-500">Posts</p>
      </div>

      <button
        onClick={() => navigate("/profile/priyanka/followers")}
      >
        <p className="font-bold">{followers}</p>
        <p className="text-sm text-gray-500">Followers</p>
      </button>

      <button
        onClick={() => navigate("/profile/priyanka/following")}
      >
        <p className="font-bold">{following}</p>
        <p className="text-sm text-gray-500">Following</p>
      </button>

    </div>
  );
}

export default ProfileStats;