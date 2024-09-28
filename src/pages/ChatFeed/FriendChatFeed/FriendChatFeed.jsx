import { useParams } from "react-router-dom";
import { useState } from "react";
import { Forward } from "lucide-react";

const FriendChatFeed = () => {
  const { friendId } = useParams(); // Get friend ID from URL params
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");

  const sendGroupMessage = () => {
    if (currentMessage.trim() !== "") {
      const newMessage = {
        author: "You",
        message: currentMessage,
        time: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, newMessage]);
      setCurrentMessage("");
    }
  };

  return (
    <div className="custom-bg min-h-screen flex flex-col justify-between">
      <div className="p-2">
        <h2 className="text-xl font-bold mb-4 mt-4 bg-gray-800 px-5 py-2 w-2/6 rounded-lg text-center mx-auto text-white">
          Chat with Friend ID: {friendId} {/* Use friendId here */}
        </h2>
      </div>

      {/* Chat Feed */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat ${
              msg.author === "You" ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-bubble">
              <p className="font-semibold">
                {msg.author}{" "}
                <span className="text-xs text-gray-400 ml-2">({msg.time})</span>
              </p>
              <p className="mt-1">{msg.message}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div className="w-full gap-4 p-4 bg-gray-800 flex items-center">
        <input
          className="w-[90%] chat-text p-3 rounded-lg bg-gray-700 text-white focus:outline-none"
          type="text"
          placeholder="Write a message..."
          value={currentMessage}
          onChange={(event) => setCurrentMessage(event.target.value)}
        />
        <button
          onClick={sendGroupMessage}
          className="ml-2 bg-[#9269FD] btn hover:bg-none p-3 rounded-md text-white"
        >
          Send <Forward />
        </button>
      </div>
    </div>
  );
};

export default FriendChatFeed;
