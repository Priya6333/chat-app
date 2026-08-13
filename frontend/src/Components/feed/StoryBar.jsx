const stories = [
  {
    id: 1,
    username: "Your Story",
    image: "https://i.pravatar.cc/150?img=32",
  },
  {
    id: 2,
    username: "poonam",
    image: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: 3,
    username: "yash",
    image: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 4,
    username: "kiran",
    image: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 5,
    username: "aniket",
    image: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: 6,
    username: "moon",
    image: "https://i.pravatar.cc/150?img=25",
  },
];

function StoryBar() {
  return (
    <div className="max-w-xl mx-auto bg-white border border-gray-200 rounded-2xl p-4">

      <div className="flex gap-5 overflow-x-auto scrollbar-hide">

        {stories.map((story) => (
          <div
            key={story.id}
            className="flex-shrink-0 flex flex-col items-center gap-2"
          >

            <div className="p-[2px] rounded-full bg-gradient-to-tr from-orange-400 via-pink-500 to-purple-600">

              <div className="p-[2px] bg-white rounded-full">
                <img
                  src={story.image}
                  alt={story.username}
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>

            </div>

            <span className="text-xs text-gray-600 max-w-16 truncate">
              {story.username}
            </span>

          </div>
        ))}

      </div>

    </div>
  );
}

export default StoryBar;