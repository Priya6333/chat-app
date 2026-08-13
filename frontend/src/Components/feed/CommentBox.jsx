import { useState } from "react";

function CommentBox({ onComment }) {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!comment.trim()) return;

    onComment(comment.trim());
    setComment("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 border-t border-gray-100 p-4"
    >
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment..."
        className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-sm outline-none"
      />

      <button
        type="submit"
        disabled={!comment.trim()}
        className="text-sm font-semibold text-purple-600 disabled:text-gray-300"
      >
        Post
      </button>
    </form>
  );
}

export default CommentBox;