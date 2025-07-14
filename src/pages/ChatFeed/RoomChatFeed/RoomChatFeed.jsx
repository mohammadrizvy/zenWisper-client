import { useEffect, useState } from "react";
import { Forward } from "lucide-react";
import io from "socket.io-client";
import { useLocation, useParams } from "react-router-dom";

const RoomChatFeed = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const username = localStorage.getItem("username");
  const { roomName } = location.state || {}; // Ensure roomName is passed, fallback if needed
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState([]); // Store chat messages
  const [socket, setSocket] = useState(null);

  // Establish the socket connection and handle joining the room
  useEffect(() => {
    const newSocket = io.connect("http://localhost:5000/");
    setSocket(newSocket);

    if (roomId) {
      newSocket.emit("join_room", roomId);
    }

    newSocket.on("receive_group_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Cleanup on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, [roomId]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (currentMessage !== "" && socket) {
      const groupMessageData = {
        roomId: roomId,
        room: roomName || "Unknown Room",
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_group_message", groupMessageData);
      setCurrentMessage("");
    }
  };

  return (
    <div className="custom-bg min-h-screen flex flex-col justify-between">
      <div className="p-2">
        <h2 className="text-xl font-bold mb-4 mt-4 bg-gray-800 px-5 py-2 w-2/6 rounded-lg text-center mx-auto text-white">
          Room Name: {roomName || "Unknown Room"} <br />
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
      <form onSubmit={handleOnSubmit}>
         <div className="w-full gap-4 p-4 bg-gray-800 flex items-center">
       
        <input
          className="w-[90%] chat-text p-3 rounded-lg bg-gray-700 text-white focus:outline-none"
          type="text"
          placeholder="Write a message..."
          value={currentMessage}
          onChange={(event) => setCurrentMessage(event.target.value)}
        />
        <button
        type="submit"
          className="ml-2 bg-[#9269FD] btn hover:bg-none p-3 rounded-md text-white"
        >
          Send <Forward />
        </button>
      </div>
      </form>
     
    </div>
  );
};

export default RoomChatFeed;
