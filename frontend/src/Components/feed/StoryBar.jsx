import StoryCard from "./StoryCard";

const stories = [
  {
    id: 1,
    username: "Your Story",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    id: 2,
    username: "poonam",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: 3,
    username: "yash",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 4,
    username: "kiran",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 5,
    username: "aniket",
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: 6,
    username: "moon",
    avatar: "https://i.pravatar.cc/150?img=25",
  },
];

function StoryBar() {
  return (
    <div className="w-full max-w-xl mx-auto bg-white border border-gray-200 rounded-2xl p-4">

      <div className="flex gap-5 overflow-x-auto">

        {stories.map((story) => (
          <StoryCard
            key={story.id}
            story={story}
          />
        ))}

      </div>

    </div>
  );
}

export default StoryBar;