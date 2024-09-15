import { useEffect, useState } from "react";
import { Forward } from "lucide-react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000/");

const ChatFeed = () => {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState([]);

  const handleSendMessage = () => {
    const newMessage = {
      message: message,
      sender: "You",
      time: new Date().toLocaleTimeString(),
      type: "text", // You can add logic to send file instead
    };
    socket.emit("send_message", newMessage);
    setMessageReceived([...messageReceived, newMessage]);
    setMessage("");
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived((prevMessages) => [...prevMessages, data]);
    });
  }, []);

  return (
    <div className="custom-bg min-h-screen flex flex-col justify-between">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4 text-white">Chat</h2>
        <div className="space-y-4 chat-text">
          {messageReceived.map((chat, index) => (
            <div key={index} className="flex flex-col space-y-1">
              <span className="text-gray-400 text-xs">{chat.time}</span>
              <div
                className={`p-2 rounded-lg ${
                  chat.sender === "You"
                    ? "bg-[#9269FD] text-white self-end"
                    : "bg-gray-700 text-white"
                }`}
              >
                <strong>{chat.sender}</strong>: {chat.message}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full gap-4 p-4 bg-gray-800 flex items-center">
        <input
          className="w-[90%] chat-text p-3 rounded-lg bg-gray-700 text-white focus:outline-none"
          type="text"
          placeholder="Write a message..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 bg-[#9269FD] btn hover:bg-none p-3 rounded-md text-white"
        >
          Send <Forward />
        </button>
      </div>
    </div>
  );
};

export default ChatFeed;

// might need later :

// const { id } = useParams();

// // Mock data for chats
// const chats = {
//   1: [
//     {
//       sender: "Townsend Seary",
//       message: "I'm sorry :( I'll send you as soon as possible.",
//       time: "01:35 PM",
//     },
//     {
//       sender: "Townsend Seary",
//       message: "I'm sending files now.",
//       time: "10:12 PM",
//     },
//     {
//       sender: "Townsend Seary",
//       message: "important_documents.pdf (50KB)",
//       time: "11:56 PM",
//       type: "file", // Indicating it's a file
//     },
//     {
//       sender: "You",
//       message:
//         "Thank you so much. After I review these files, I will give you my opinion. If there's a problem, you can send it back. Good luck with it!",
//       time: "11:59 PM",
//     },
//     {
//       sender: "Townsend Seary",
//       message: "I can't wait",
//       time: "07:15 AM",
//     },
//     {
//       sender: "Townsend Seary",
//       message: "Lorem ipsum dolor sit amet.",
//       time: "08:00 AM",
//     },
//     {
//       sender: "You",
//       message:
//         "I know how important this file is to you. You can trust me ;)",
//       time: "07:45 AM",
//     },
//   ],
// };

{
  /* {chats[id]?.map((chat, index) => (
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
                      ? "bg-[#9269FD] text-white self-end"
                      : "bg-gray-700 text-white"
                  }`}
                >
                  <strong>{chat.sender}</strong>: {chat.message}
                </div>
              )}
            </div> */
}
