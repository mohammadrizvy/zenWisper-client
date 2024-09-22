import { useEffect, useState } from "react";
import { Forward } from "lucide-react";
import io from "socket.io-client";
import { useLocation, useParams } from "react-router-dom";

const socket = io.connect("http://localhost:5000/");

const ChatFeed = () => {
  const { roomId } = useParams();
  const location = useLocation(); // Access location state
  // Get roomId from URL
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState([]);
  const username = localStorage.getItem("username");
  const { roomName } = location.state || {};

  // Join the room when the component mounts
  useEffect(() => {
    if (roomId) {
      socket.emit("join_room", roomId);
      console.log(`Joined room: ${roomId}`);
    }
  }, [roomId]);

  // Send a message to the room
  const handleSendMessage = () => {
    const newMessage = {
      message: message,
      sender: username,
      time: new Date().toLocaleTimeString(),
      type: "text",
      roomId: roomId, // Attach roomId to the message
    };

    socket.emit("send_message", newMessage); // Emit the message to the room
    setMessageReceived([...messageReceived, newMessage]);
    setMessage("");
  };

  // Listen for messages in the room
  useEffect(() => {
    socket.on("receive_message", (data) => {
      // Check if the message belongs to the current room
      if (data.roomId === roomId) {
        setMessageReceived((prevMessages) => [...prevMessages, data]);
      }
    });
  }, [roomId]);

  return (
    <div className="custom-bg min-h-screen flex flex-col justify-between">
      <div className="p-2">
        <h2 className="text-xl font-bold mb-4 mt-4 bg-gray-800 px-5 py-2 w-2/6 rounded-lg  text-center mx-auto  text-white">
          Room Name : {roomName}
          <br />
          Room Chat ID : {roomId}
        </h2>
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
