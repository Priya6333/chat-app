import { useState } from "react";

function CreatePost() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(URL.createObjectURL(file));
    }
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
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-5">
          <h1 className="text-2xl font-bold text-gray-800">
            Create New Post
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Share a photo with your followers
          </p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
        >

          {/* Image Preview */}
          <div className="aspect-square bg-gray-100 flex items-center justify-center">

            {image ? (
              <img
                src={image}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center">

                <div className="text-5xl mb-4">
                  📷
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
              Choose Photo
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
              className="w-full resize-none bg-gray-50 border border-gray-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-purple-200"
            />

            <p className="text-xs text-gray-400 text-right mt-1">
              {caption.length}/2200
            </p>

          </div>

          {/* Post Button */}
          <div className="px-5 pb-5">

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition"
            >
              Share Post
            </button>

          </div>

        </form>

      </main>

    </div>
  );
}

export default CreatePost;