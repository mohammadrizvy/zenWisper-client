
const ChatList = () => {
    return (
      <div className="">
        {/* Chat List */}
        <div className="">

        <h2 className="text-2xl font-semibold mb-4">Chats</h2>
        </div>
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search chat"
          className="w-full p-2 mb-4 rounded bg-gray-800 text-white"
        />

        {/* Chat Items */}
        {/* Example Chat Items */}
        <div className="flex items-center p-2 bg-gray-800 rounded">
          <img
            src="https://via.placeholder.com/30"
            alt="User Avatar"
            className="w-8 h-8 rounded-full mr-2"
          />
          <div className="flex-1">
            <p className="text-sm font-medium">Townsend Seary</p>
            <p className="text-xs text-gray-400 chat-text">
              Whats up, how are you?
            </p>
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
            <p className="text-xs text-gray-400 chat-text">
              Whats up, how are you?
            </p>
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
            <p className="text-xs text-gray-400 chat-text">
              Whats up, how are you?
            </p>
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
            <p className="text-xs text-gray-400 chat-text">
              Whats up, how are you?
            </p>
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
            <p className="text-xs text-gray-400 chat-text">
              Whats up, how are you?
            </p>
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
            <p className="text-xs text-gray-400 chat-text">
              Whats up, how are you?
            </p>
          </div>
          <span className="bg-green-500 text-white text-xs rounded-full px-2 py-0.5 ml-2">
            3
          </span>
        </div>
        {/* Repeat similar divs for other chat items */}
      </div>
    );
};

export default ChatList;