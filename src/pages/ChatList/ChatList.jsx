// src/pages/ChatList/ChatList.jsx - Complete Fixed Version
import { Link } from "react-router-dom";
import useUsers from "../../hooks/useUsers";
import { MessageCircle, Plus } from "lucide-react";
import { useState } from "react";
import { useUserChats } from "../../hooks/usePrivateMessages";

const ChatList = () => {
  const { data: users = [], isLoading: usersLoading } = useUsers();
  const currentUserEmail = localStorage.getItem("email");
  const { chats = [], isPending: chatsLoading } = useUserChats(currentUserEmail);
  
  const [activeTab, setActiveTab] = useState("chats");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter current user from users list
  const otherUsers = users.filter(user => user.email !== currentUserEmail);

  // Filter users based on search term
  const filteredUsers = otherUsers.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter chats based on search term
  const filteredChats = chats.filter(chat =>
    chat.partnerUsername.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      });
    } else if (diffInHours < 168) {
      return date.toLocaleDateString("en-US", { weekday: "short" });
    } else {
      return date.toLocaleDateString("en-US", { 
        month: "short", 
        day: "numeric" 
      });
    }
  };

  // Helper function to get the correct route based on screen size
  const getChatRoute = (email) => {
    return {
      mobile: `/mobile-chat/${email}`,
      desktop: `/chat/${email}`
    };
  };

  if (usersLoading) {
    return (
      <div className="flex justify-center items-center h-32 sm:h-64">
        <div className="text-white text-sm sm:text-base">Loading...</div>
      </div>
    );
  }

  return (
    <div className="px-2 sm:px-0">
      {/* Header - Responsive */}
      <div className="flex mb-4 justify-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold uppercase text-center">
          Chats
        </h2>
      </div>
      <p className="border-2 mx-2 sm:mx-6 rotate-[4deg]"></p>

      {/* Tab Navigation - Responsive */}
      <div className="flex mx-auto mb-3 sm:mb-5 gap-2 sm:gap-4 justify-center items-center mt-3 sm:mt-5 px-2">
        <button
          onClick={() => setActiveTab("chats")}
          className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg transition-colors flex-1 sm:flex-none justify-center ${
            activeTab === "chats"
              ? "bg-[#9269FD] text-white"
              : "text-neutral-600 hover:text-white"
          }`}
        >
          <MessageCircle size={16} className="sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-lg font-bold">YOUR CHATS</span>
        </button>
        
        <button
          onClick={() => setActiveTab("users")}
          className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg transition-colors flex-1 sm:flex-none justify-center ${
            activeTab === "users"
              ? "bg-[#9269FD] text-white"
              : "text-neutral-600 hover:text-white"
          }`}
        >
          <Plus size={16} className="sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-lg font-bold">NEW CHAT</span>
        </button>
      </div>
      <hr className="mx-2 sm:mx-0" />

      {/* Search Input - Responsive */}
      <input
        type="text"
        placeholder={activeTab === "chats" ? "Search chats..." : "Search users..."}
        className="w-full p-2 sm:p-3 mb-3 sm:mb-4 mt-3 sm:mt-5 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9269FD] text-sm sm:text-base mx-2 sm:mx-0"
        style={{ width: 'calc(100% - 1rem)' }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Content based on active tab - Responsive */}
      <div className="px-2 sm:px-0">
        {activeTab === "chats" ? (
          <div>
            {chatsLoading ? (
              <div className="text-center text-gray-400 py-4 sm:py-8 text-sm sm:text-base">
                Loading your chats...
              </div>
            ) : filteredChats.length === 0 ? (
              <div className="text-center text-gray-400 py-4 sm:py-8 text-sm sm:text-base">
                {searchTerm ? "No chats found matching your search." : "No chats yet. Start a conversation!"}
              </div>
            ) : (
              filteredChats.map((chat, index) => (
                <div key={index}>
                  {/* Mobile Link */}
                  <Link
                    to={getChatRoute(chat.partnerEmail).mobile}
                    state={{
                      partnerUsername: chat.partnerUsername,
                      partnerEmail: chat.partnerEmail
                    }}
                    className="md:hidden flex items-center p-2 sm:p-3 mb-2 border-b-2 border-neutral-600 hover:bg-gray-800 transition-colors rounded-lg"
                  >
                    <img
                      src="https://cdn.hero.page/pfp/81c2b3b4-bc9b-4286-91fe-a974f3ca6ae5-mysterious-purple-haired-boy-stunning-purple-anime-pfp-boys-1.png"
                      alt="User Avatar"
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-2 sm:mr-3 border-2 border-purple-500 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <p className="text-base sm:text-lg font-medium text-white truncate pr-2">
                          {chat.partnerUsername}
                        </p>
                        <span className="text-xs text-gray-400 flex-shrink-0">
                          {formatTime(chat.lastMessageDate)}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-400 truncate mt-1">
                        {chat.lastMessage}
                      </p>
                    </div>
                  </Link>

                  {/* Desktop Link */}
                  <Link
                    to={getChatRoute(chat.partnerEmail).desktop}
                    state={{
                      partnerUsername: chat.partnerUsername,
                      partnerEmail: chat.partnerEmail
                    }}
                    className="hidden md:flex items-center p-2 sm:p-3 mb-2 border-b-2 border-neutral-600 hover:bg-gray-800 transition-colors rounded-lg"
                  >
                    <img
                      src="https://cdn.hero.page/pfp/81c2b3b4-bc9b-4286-91fe-a974f3ca6ae5-mysterious-purple-haired-boy-stunning-purple-anime-pfp-boys-1.png"
                      alt="User Avatar"
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-2 sm:mr-3 border-2 border-purple-500 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <p className="text-base sm:text-lg font-medium text-white truncate pr-2">
                          {chat.partnerUsername}
                        </p>
                        <span className="text-xs text-gray-400 flex-shrink-0">
                          {formatTime(chat.lastMessageDate)}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-400 truncate mt-1">
                        {chat.lastMessage}
                      </p>
                    </div>
                  </Link>
                </div>
              ))
            )}
          </div>
        ) : (
          <div>
            {filteredUsers.length === 0 ? (
              <div className="text-center text-gray-400 py-4 sm:py-8 text-sm sm:text-base">
                {searchTerm ? "No users found matching your search." : "No other users available."}
              </div>
            ) : (
              filteredUsers.map((user, index) => (
                <div key={index}>
                  {/* Mobile Link */}
                  <Link
                    to={getChatRoute(user.email).mobile}
                    state={{
                      partnerUsername: user.username,
                      partnerEmail: user.email
                    }}
                    className="md:hidden flex items-center p-2 sm:p-3 mb-2 border-b-2 border-neutral-600 hover:bg-gray-800 transition-colors rounded-lg"
                  >
                    <img
                      src="https://cdn.hero.page/pfp/81c2b3b4-bc9b-4286-91fe-a974f3ca6ae5-mysterious-purple-haired-boy-stunning-purple-anime-pfp-boys-1.png"
                      alt="User Avatar"
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-2 sm:mr-3 border-2 border-purple-500 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-base sm:text-lg font-medium text-white truncate pr-2">
                        {user.username}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-400 truncate">
                        {user.email}
                      </p>
                    </div>
                    <div className="text-[#9269FD] flex-shrink-0">
                      <MessageCircle size={18} className="sm:w-5 sm:h-5" />
                    </div>
                  </Link>

                  {/* Desktop Link */}
                  <Link
                    to={getChatRoute(user.email).desktop}
                    state={{
                      partnerUsername: user.username,
                      partnerEmail: user.email
                    }}
                    className="hidden md:flex items-center p-2 sm:p-3 mb-2 border-b-2 border-neutral-600 hover:bg-gray-800 transition-colors rounded-lg"
                  >
                    <img
                      src="https://cdn.hero.page/pfp/81c2b3b4-bc9b-4286-91fe-a974f3ca6ae5-mysterious-purple-haired-boy-stunning-purple-anime-pfp-boys-1.png"
                      alt="User Avatar"
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-2 sm:mr-3 border-2 border-purple-500 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-base sm:text-lg font-medium text-white truncate pr-2">
                        {user.username}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-400 truncate">
                        {user.email}
                      </p>
                    </div>
                    <div className="text-[#9269FD] flex-shrink-0">
                      <MessageCircle size={18} className="sm:w-5 sm:h-5" />
                    </div>
                  </Link>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;