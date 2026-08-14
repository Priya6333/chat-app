import ChatList from "../chat/ChatList";


function Chat() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">

        <h1 className="text-2xl font-bold text-gray-800 mb-5">
          Messages
        </h1>

        <ChatList />

      </div>
    </div>
  );
}

export default Chat;