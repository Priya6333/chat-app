function PostGrid({ posts = [] }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {posts.map((post) => (
        <div
          key={post.id}
          className="aspect-square overflow-hidden rounded-lg bg-gray-100"
        >
          <img
            src={post.image}
            alt="Post"
            className="w-full h-full object-cover hover:scale-105 transition duration-300"
          />
        </div>
      ))}
    </div>
  );
}

export default PostGrid;