import { useState } from "react";
import { Send, Smile } from "lucide-react";

function MessageInput({ onSend }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    onSend(message);
    setMessage("");
  };

  return (
    <footer className="bg-white border-t border-gray-200 p-3">
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto flex items-center gap-2"
      >
        {/* Emoji */}
        <button
          type="button"
          className="p-2 text-gray-500 hover:text-purple-600 transition"
        >
          <Smile size={22} />
        </button>

        {/* Input */}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-gray-100 rounded-full px-5 py-3 outline-none focus:ring-2 focus:ring-purple-200"
        />

        {/* Send */}
        <button
          type="submit"
          className="w-11 h-11 rounded-full bg-purple-600 text-white flex items-center justify-center hover:bg-purple-700 transition"
        >
          <Send size={19} />
        </button>
      </form>
    </footer>
  );
}

export default MessageInput;