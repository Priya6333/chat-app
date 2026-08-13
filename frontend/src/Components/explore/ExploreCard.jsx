function ExploreCard({ post }) {
  return (
    <div className="aspect-square overflow-hidden rounded-xl bg-gray-200 cursor-pointer group">
      <img
        src={post.image}
        alt={post.username}
        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
      />
    </div>
  );
}

export default ExploreCard;