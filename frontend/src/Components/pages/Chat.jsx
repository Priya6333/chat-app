import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ChatList from "../chat/ChatList";
import Sidebar from "../layout/Sidebar";

function Chat() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">

      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-100 transition"
            title="Go Back"
          >
            <ArrowLeft size={22} />
          </button>

          <h1 className="text-2xl font-bold text-gray-800">
            Messages
          </h1>

        </div>
        
        {/* ================= SIDEBAR ================= */}
        <Sidebar />
        {/* Chat List */}
        <ChatList />

      </div>

    </div>
  );
}

export default Chat;