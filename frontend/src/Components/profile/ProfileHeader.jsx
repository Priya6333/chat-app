import { useNavigate } from "react-router-dom";
import Avatar from "../common/Avatar";

function ProfileHeader({ user }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-6">

      {/* Profile Image */}
      <Avatar
  src={user.avatar}
  alt={user.username}
  size="xl"
/>

      <div className="flex-1">

        <div className="flex items-center gap-4 flex-wrap">

          {/* Username */}
          <h1 className="text-2xl font-bold text-gray-800">
            @{user.username}
          </h1>

          {/* Edit Profile */}
          <button
            onClick={() => navigate("/edit-profile")}
            className="px-5 py-2 bg-gray-100 rounded-lg font-semibold text-sm hover:bg-gray-200 transition"
          >
            Edit Profile
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProfileHeader;