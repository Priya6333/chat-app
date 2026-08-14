function Message({ message }) {
  const isMe = message.sender === "me";

  return (
    <div
      className={`flex mb-3 ${
        isMe ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${
          isMe
            ? "bg-purple-600 text-white rounded-br-md"
            : "bg-white text-gray-800 border border-gray-200 rounded-bl-md"
        }`}
      >
        <p className="text-sm break-words">
          {message.text}
        </p>

        <div
          className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
            isMe ? "text-purple-200" : "text-gray-400"
          }`}
        >
          <span>{message.time}</span>

          {isMe && (
            <span className="text-xs">
              ✓✓
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Message;