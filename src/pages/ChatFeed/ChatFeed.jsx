import { useEffect, useState } from "react";
import { Forward } from "lucide-react";
import io from "socket.io-client";
import { useLocation, useParams } from "react-router-dom";

const socket = io.connect("http://localhost:5000/");

const ChatFeed = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const username = localStorage.getItem("username");
  const { roomName } = location.state || {};
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState([]); // Store chat messages

  const sendGroupMessage = async () => {
    if (currentMessage !== "") {
      const groupMessageData = {
        roomId: roomId,
        room: roomName,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", groupMessageData);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    if (roomId) {
      socket.emit("join_room", roomId);
    }

    socket.on("receive_group_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("receive_group_message");
    };
  }, [roomId]);

  return (
    <div className="custom-bg min-h-screen flex flex-col justify-between">
      <div className="p-2">
        <h2 className="text-xl font-bold mb-4 mt-4 bg-gray-800 px-5 py-2 w-2/6 rounded-lg text-center mx-auto text-white">
          Room Name: {roomName}
          <br />
          Room Chat ID: {roomId}
        </h2>
      </div>

      {/* Chat Feed */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat ${
              msg.author === username ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-bubble">
              <p className="font-semibold">
                {msg.author === username ? "You" : msg.author}{" "}
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

export default ChatFeed;
