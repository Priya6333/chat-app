import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, ArrowLeft } from "lucide-react";

import Input from "../common/Input";
import Button from "../common/Button";
import Avatar from "../common/Avatar";

function EditProfile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "Priyanka Jagtap",
    username: "priyanka",
    bio: "Computer Engineering Student 💻 | Full Stack Developer 🚀",
    avatar: "https://i.pravatar.cc/150?img=32",
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);

      setProfile({
        ...profile,
        avatar: imageUrl,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Updated Profile:", profile);

    alert("Profile updated successfully!");

    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">

          <button
            onClick={() => navigate("/profile")}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <ArrowLeft size={22} />
          </button>

          <h1 className="text-xl font-semibold text-gray-800">
            Edit Profile
          </h1>

        </div>
      </div>

      {/* Form */}
      <main className="max-w-2xl mx-auto px-4 py-8">

        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">

          {/* Profile Image */}
          <div className="flex flex-col items-center mb-8">

            <div className="relative">

              <Avatar
                src={profile.avatar}
                alt="Profile"
                size="xl"
                className="border-4 border-white shadow-md"
              />

              <label
                htmlFor="profile-image"
                className="absolute bottom-1 right-1 w-9 h-9 bg-purple-600 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-purple-700 transition shadow-md"
              >
                <Camera size={18} />

                <input
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

            </div>

            <p className="text-sm text-purple-600 font-medium mt-3">
              Change profile photo
            </p>

          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <Input
              label="Name"
              name="name"
              value={profile.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />

            {/* Username */}
            <Input
              label="Username"
              name="username"
              value={profile.username}
              onChange={handleChange}
              placeholder="Enter username"
              required
            />

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>

              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                rows="4"
                maxLength="150"
                placeholder="Write something about yourself..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl resize-none outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400"
              />

              <p className="text-xs text-gray-400 text-right mt-1">
                {profile.bio.length}/150
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-3">

              {/* Cancel */}
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate("/profile")}
                className="flex-1"
              >
                Cancel
              </Button>

              {/* Save */}
              <Button
                type="submit"
                variant="primary"
                className="flex-1"
              >
                Save Changes
              </Button>

            </div>

          </form>

        </div>

      </main>

    </div>
  );
}

export default EditProfile;