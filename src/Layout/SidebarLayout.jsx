import { Outlet } from "react-router-dom";
import SidebarMenu from "../pages/SidebarMenu/SidebarMenu";

const SidebarLayout = () => {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <SidebarMenu />

      {/* Main content area */}
      <div className="flex flex-grow">
        <div className="w-1/4 p-4 border-r border-gray-700">
          <img className="w-[55%] -mt-10 -mb-10 mx-auto" src="/public/ZenWhisper.png" alt="" />

        {/* Chat List */}
          <h2 className="text-lg font-semibold mb-4">Chats</h2>
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search chat"
            className="w-full p-2 mb-4 rounded bg-gray-800 text-white"
          />

          {/* Chat Items */}
          <div className="space-y-2">
            {/* Example Chat Items */}
            <div className="flex items-center p-2 bg-gray-800 rounded">
              <img
                src="https://via.placeholder.com/30"
                alt="User Avatar"
                className="w-8 h-8 rounded-full mr-2"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">Townsend Seary</p>
                <p className="text-xs text-gray-400 chat-text">Whats up, how are you?</p>
              </div>
              <span className="bg-green-500 text-white text-xs rounded-full px-2 py-0.5 ml-2">
                3
              </span>
            </div>
            <div className="flex items-center p-2 bg-gray-800 rounded">
              <img
                src="https://via.placeholder.com/30"
                alt="User Avatar"
                className="w-8 h-8 rounded-full mr-2"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">Townsend Seary</p>
                <p className="text-xs text-gray-400 chat-text">Whats up, how are you?</p>
              </div>
              <span className="bg-green-500 text-white text-xs rounded-full px-2 py-0.5 ml-2">
                3
              </span>
            </div>
            <div className="flex items-center p-2 bg-gray-800 rounded">
              <img
                src="https://via.placeholder.com/30"
                alt="User Avatar"
                className="w-8 h-8 rounded-full mr-2"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">Townsend Seary</p>
                <p className="text-xs text-gray-400 chat-text">Whats up, how are you?</p>
              </div>
              <span className="bg-green-500 text-white text-xs rounded-full px-2 py-0.5 ml-2">
                3
              </span>
            </div>
            <div className="flex items-center p-2 bg-gray-800 rounded">
              <img
                src="https://via.placeholder.com/30"
                alt="User Avatar"
                className="w-8 h-8 rounded-full mr-2"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">Townsend Seary</p>
                <p className="text-xs text-gray-400 chat-text">Whats up, how are you?</p>
              </div>
              <span className="bg-green-500 text-white text-xs rounded-full px-2 py-0.5 ml-2">
                3
              </span>
            </div>
            <div className="flex items-center p-2 bg-gray-800 rounded">
              <img
                src="https://via.placeholder.com/30"
                alt="User Avatar"
                className="w-8 h-8 rounded-full mr-2"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">Townsend Seary</p>
                <p className="text-xs text-gray-400 chat-text">Whats up, how are you?</p>
              </div>
              <span className="bg-green-500 text-white text-xs rounded-full px-2 py-0.5 ml-2">
                3
              </span>
            </div>
            {/* Repeat similar divs for other chat items */}
          </div>
        </div>

        {/* Dynamic Content Area */}
        <div className="flex-grow p-4">
          <Outlet /> {/* This will render the content of the current route */}
        </div>
      </div>
    </div>
  );
};

export default SidebarLayout;
