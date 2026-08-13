function StoryCard({ story }) {
  return (
    <div className="flex flex-col items-center gap-2 min-w-[72px] flex-shrink-0">

      <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
        <div className="w-full h-full rounded-full bg-white p-[2px]">
          <img
            src={story.avatar}
            alt={story.username}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>

      <p className="text-xs text-gray-700 truncate max-w-[70px]">
        {story.username}
      </p>

    </div>
  );
}

export default StoryCard;