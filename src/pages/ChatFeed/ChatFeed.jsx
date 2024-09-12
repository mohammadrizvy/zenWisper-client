import { useParams } from "react-router-dom";
import Home from "../../pages/Home/Home";

const ChatFeed = () => {
  const { id } = useParams();

  // Mock data for chats
  const chats = {
    1: [
      {
        sender: "Townsend Seary",
        message: "I'm sorry :( I'll send you as soon as possible.",
        time: "01:35 PM",
      },
      {
        sender: "Townsend Seary",
        message: "I'm sending files now.",
        time: "10:12 PM",
      },
      {
        sender: "Townsend Seary",
        message: "important_documents.pdf (50KB)",
        time: "11:56 PM",
        type: "file", // Indicating it's a file
      },
      {
        sender: "You",
        message:
          "Thank you so much. After I review these files, I will give you my opinion. If there's a problem, you can send it back. Good luck with it!",
        time: "11:59 PM",
      },
      {
        sender: "Townsend Seary",
        message: "I can't wait",
        time: "07:15 AM",
      },
      {
        sender: "Townsend Seary",
        message: "Lorem ipsum dolor sit amet.",
        time: "08:00 AM",
      },
      {
        sender: "You",
        message:
          "I know how important this file is to you. You can trust me ;)",
        time: "07:45 AM",
      },
    ],
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col justify-between">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4 text-white">Chat with {id}</h2>
        <div className="space-y-4">
          {chats[id]?.map((chat, index) => (
            <div key={index} className="flex flex-col space-y-1">
              <span className="text-gray-400 text-xs">{chat.time}</span>
              {chat.type === "file" ? (
                <div className="flex items-center p-2 bg-gray-800 rounded-lg">
                  <div className="flex-grow">
                    <strong>{chat.sender}</strong>: {chat.message}
                  </div>
                  <button className="text-green-400 hover:underline ml-2">
                    Download
                  </button>
                </div>
              ) : (
                <div
                  className={`p-2 rounded-lg ${
                    chat.sender === "You"
                      ? "bg-green-500 text-white self-end"
                      : "bg-gray-700 text-white"
                  }`}
                >
                  <strong>{chat.sender}</strong>: {chat.message}
                </div>
              )}
            </div>
          )) || (
            <div>
              <Home></Home>
            </div>
          )}
        </div>
      </div>
      {/* Chat input at the bottom */}
      <div className="w-full p-4 bg-gray-800 flex items-center">
        <input
          className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none"
          type="text"
          placeholder="Write a message..."
        />
        <button className="ml-2 bg-green-500 p-2 rounded-full text-white">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatFeed;
