// src/pages/ChatList/ChatList.jsx
import { Link } from "react-router-dom";
import useUsers from "../../hooks/useUsers";
import {  MessageCircle, Plus } from "lucide-react";
import { useState } from "react";
import { useUserChats } from "../../hooks/usePrivateMessages";

const ChatList = () => {
  const { data: users = [], isLoading: usersLoading } = useUsers();
  const currentUserEmail = localStorage.getItem("email");
  const { chats = [], isPending: chatsLoading, refetch } = useUserChats(currentUserEmail);
  
  const [activeTab, setActiveTab] = useState("chats"); // "chats" or "users"
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
    } else if (diffInHours < 168) { // Less than a week
      return date.toLocaleDateString("en-US", { weekday: "short" });
    } else {
      return date.toLocaleDateString("en-US", { 
        month: "short", 
        day: "numeric" 
      });
    }
  };

  if (usersLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="">
      {/* Header */}
      <div className="flex mb-4 justify-between">
        <h2 className="text-6xl font-semibold uppercase mb-4 mx-auto">Chats</h2>
      </div>
      <p className="border-2 mx-6 rotate-[4deg]"></p>

      {/* Tab Navigation */}
      <div className="flex mx-auto mb-5 gap-4 justify-center items-center mt-5">
        <button
          onClick={() => setActiveTab("chats")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === "chats"
              ? "bg-[#9269FD] text-white"
              : "text-neutral-600 hover:text-white"
          }`}
        >
          <MessageCircle size={20} />
          <span className="text-lg font-bold">YOUR CHATS</span>
        </button>
        
        <button
          onClick={() => setActiveTab("users")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === "users"
              ? "bg-[#9269FD] text-white"
              : "text-neutral-600 hover:text-white"
          }`}
        >
          <Plus size={20} />
          <span className="text-lg font-bold">NEW CHAT</span>
        </button>
      </div>
      <hr />

      {/* Search Input */}
      <input
        type="text"
        placeholder={activeTab === "chats" ? "Search chats..." : "Search users..."}
        className="w-full p-3 mb-4 mt-5 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9269FD]"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Content based on active tab */}
      {activeTab === "chats" ? (
        <div>
          {chatsLoading ? (
            <div className="text-center text-gray-400 py-8">
              Loading your chats...
            </div>
          ) : filteredChats.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              {searchTerm ? "No chats found matching your search." : "No chats yet. Start a conversation!"}
            </div>
          ) : (
            filteredChats.map((chat, index) => (
              <Link
                to={`/chat/${chat.partnerEmail}`}
                state={{
                  partnerUsername: chat.partnerUsername,
                  partnerEmail: chat.partnerEmail
                }}
                key={index}
                className="flex items-center p-3 mb-2 border-b-2 border-neutral-600 hover:bg-gray-800 transition-colors rounded-lg"
              >
                <img
                  src="https://cdn.hero.page/pfp/81c2b3b4-bc9b-4286-91fe-a974f3ca6ae5-mysterious-purple-haired-boy-stunning-purple-anime-pfp-boys-1.png"
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full mr-3 border-2 border-purple-500"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="text-lg font-medium text-white truncate">
                      {chat.partnerUsername}
                    </p>
                    <span className="text-xs text-gray-400 ml-2 flex-shrink-0">
                      {formatTime(chat.lastMessageDate)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 truncate mt-1">
                    {chat.lastMessage}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      ) : (
        <div>
          {filteredUsers.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              {searchTerm ? "No users found matching your search." : "No other users available."}
            </div>
          ) : (
            filteredUsers.map((user, index) => (
              <Link
                to={`/chat/${user.email}`}
                state={{
                  partnerUsername: user.username,
                  partnerEmail: user.email
                }}
                key={index}
                className="flex items-center p-3 mb-2 border-b-2 border-neutral-600 hover:bg-gray-800 transition-colors rounded-lg"
              >
                <img
                  src="https://cdn.hero.page/pfp/81c2b3b4-bc9b-4286-91fe-a974f3ca6ae5-mysterious-purple-haired-boy-stunning-purple-anime-pfp-boys-1.png"
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full mr-3 border-2 border-purple-500"
                />
                <div className="flex-1">
                  <p className="text-lg font-medium text-white">{user.username}</p>
                  <p className="text-sm text-gray-400">{user.email}</p>
                </div>
                <div className="text-[#9269FD]">
                  <MessageCircle size={20} />
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ChatList;