import { useState } from "react";
import { ImagePlus, ArrowLeft, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import Sidebar from "../layout/Sidebar";

function CreatePost() {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    console.log({
      image,
      caption,
    });

    alert("Post created successfully!");
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">

          <button
            onClick={() => navigate("/home")}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <ArrowLeft size={22} />
          </button>

          <div>
            <h1 className="text-xl font-bold text-gray-800">
              Create New Post
            </h1>

            <p className="text-xs text-gray-500">
              Share something with your followers
            </p>
          </div>

        </div>
      </header>

      {/* Main */}
      <main className="max-w-2xl mx-auto px-4 py-8">
          {/* ================= SIDEBAR ================= */}
        <Sidebar />
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
        >

          {/* Image Preview */}
          <div className="aspect-square bg-gray-100 flex items-center justify-center relative">

            {image ? (
              <>
                <img
                  src={image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />

                {/* Remove Image */}
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80"
                >
                  <X size={20} />
                </button>
              </>
            ) : (
              <div className="text-center">

                <div className="w-16 h-16 mx-auto rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-4">
                  <ImagePlus size={30} />
                </div>

                <p className="font-semibold text-gray-700">
                  Select a photo
                </p>

                <p className="text-sm text-gray-400 mt-1">
                  JPG, PNG or WEBP
                </p>

              </div>
            )}

          </div>

          {/* Upload */}
          <div className="p-5 border-b border-gray-200">

            <label
              htmlFor="image"
              className="block w-full text-center bg-purple-600 text-white py-3 rounded-xl font-semibold cursor-pointer hover:bg-purple-700 transition"
            >
              {image ? "Change Photo" : "Choose Photo"}
            </label>

            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

          </div>

          {/* Caption */}
          <div className="p-5">

            <label className="block font-semibold text-gray-800 mb-2">
              Caption
            </label>

            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write a caption..."
              rows="4"
              maxLength="2200"
              className="w-full resize-none bg-gray-50 border border-gray-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
            />

            <p className="text-xs text-gray-400 text-right mt-1">
              {caption.length}/2200
            </p>

          </div>

          {/* Share */}
          <div className="px-5 pb-5">

            <Button type="submit">
  Share Post
</Button>

          </div>

        </form>

      </main>

    </div>
  );
}

export default CreatePost;