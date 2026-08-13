import CommentBox from "./CommentBox";

function PostCard({ post }) {
  return (
    <article className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

      {/* Post Header */}
      <div className="flex items-center justify-between p-4">

        <div className="flex items-center gap-3">
          <img
            src={post.avatar}
            alt={post.username}
            className="w-10 h-10 rounded-full object-cover"
          />

          <div>
            <h3 className="font-semibold text-gray-800">
              {post.username}
            </h3>

            <p className="text-xs text-gray-400">
              2 hours ago
            </p>
          </div>
        </div>

        <button className="text-gray-500 text-xl">
          ⋯
        </button>

      </div>

      {/* Post Image */}
      <img
        src={post.image}
        alt="Post"
        className="w-full aspect-square object-cover"
      />

      {/* Actions + Content */}
      <div className="p-4">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-5">
            <button className="text-2xl hover:scale-110 transition">
              ♡
            </button>

            <button className="text-2xl hover:scale-110 transition">
              💬
            </button>

            <button className="text-2xl hover:scale-110 transition">
              ↗
            </button>
          </div>

          <button className="text-2xl">
            ♡
          </button>

        </div>

        {/* Likes */}
        <p className="font-semibold text-sm mt-3">
          {post.likes} likes
        </p>

        {/* Caption */}
        <p className="text-sm mt-2">
          <span className="font-semibold mr-2">
            {post.username}
          </span>

          {post.caption}
        </p>

        {/* Comments */}
        <button className="text-sm text-gray-400 mt-2">
          View all {post.comments} comments
        </button>

      </div>

      {/* Comment Box */}
      <CommentBox
        onComment={(comment) => {
          console.log("New comment:", comment);
        }}
      />

    </article>
  );
}

export default PostCard;