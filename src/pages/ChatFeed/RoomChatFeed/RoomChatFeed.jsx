// src/pages/ChatFeed/RoomChatFeed/RoomChatFeed.jsx - Fully Responsive Version
import { useEffect, useState, useRef } from "react";
import { Forward, ArrowLeft } from "lucide-react";
import io from "socket.io-client";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import useRoomMessage from "../../../hooks/useRoomMessage";
import {
  DynamicChatHeaderConnected,
  DynamicChatHeaderNotConnected,
} from "./DynamicChatHeader/DynamicChatHeader";

const RoomChatFeed = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const { roomName } = location.state || {};
  const [currentMessage, setCurrentMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

  // Use React Query hook to fetch messages
  const { isPending, messages = [], isError } = useRoomMessage(roomId);

  // Local state to track messages (combines initial data + socket updates)
  const [chatMessages, setChatMessages] = useState([]);

  // Update local messages when React Query data changes
  useEffect(() => {
    if (messages && !isPending) {
      setChatMessages(messages);
    }
  }, [messages, isPending]);

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  // Socket connection setup - Fixed to prevent reconnections
  useEffect(() => {
    if (!roomId) return;

    const newSocket = io.connect(`${import.meta.env.VITE_BACKEND_URL}`);
    setSocket(newSocket);

    // Join the room
    newSocket.emit("join_room", roomId, username);

    // Listen for incoming messages
    const handleReceiveMessage = (data) => {
      setChatMessages((prevMessages) => {
        // Check if message already exists to prevent duplicates
        const messageExists = prevMessages.some(
          (msg) => msg.message === data.message &&
            msg.author === data.author &&
            msg.time === data.time
        );

        if (messageExists) {
          return prevMessages;
        }

        return [...prevMessages, data];
      });
    };

    newSocket.on("receive_room_message", handleReceiveMessage);

    // Cleanup function
    return () => {
      newSocket.off("receive_room_message", handleReceiveMessage);
      newSocket.emit("leave_room", roomId, username);
      newSocket.disconnect();
    };
  }, [roomId, username]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (currentMessage.trim() !== "" && socket && roomId) {
      const groupMessageData = {
        roomId: roomId,
        room: roomName || "Unknown Room",
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours().toString().padStart(2, "0") +
          ":" +
          new Date(Date.now()).getMinutes().toString().padStart(2, "0"),
      };

      // Send message via socket
      socket.emit("send_room_message", groupMessageData);

      // Clear input immediately
      setCurrentMessage("");

      // Optional: Add message to local state immediately for better UX
      setChatMessages((prevMessages) => [...prevMessages, groupMessageData]);
    }
  };

  return (
    <div className="custom-bg flex flex-col h-screen">
      {/* Header - Responsive */}
      <div className="bg-gradient-to-r bg-[#1B1C25] flex-none border-b border-gray-600 shadow-lg">
        <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-6">
          {roomId ? (
            // Connected to room state - Responsive
            <div className="flex flex-col space-y-2 sm:space-y-3">
              {/* Back button for mobile */}
              <div className="flex items-center gap-3 md:hidden">
                <button
                  onClick={() => navigate('/room')}
                  className="text-gray-300 hover:text-white"
                >
                  <ArrowLeft size={24} />
                </button>
                <span className="text-lg font-semibold text-white">Back to Rooms</span>
              </div>
              
              {/* Main Room Info Card - Responsive */}
              <div className="hidden md:block">
                <DynamicChatHeaderConnected roomId={roomId} roomName={roomName} />
              </div>
              
              {/* Mobile Room Header */}
              <div className="md:hidden bg-[#9269FD] p-3 rounded-lg">
                <h2 className="text-lg font-semibold text-white text-center">
                  {roomName || "🧪 Chemistry Group"}
                </h2>
                <p className="text-sm text-gray-200 text-center">
                  Room ID: {roomId}
                </p>
              </div>
            </div>
          ) : (
            // Not connected state - Responsive
            <div className="flex flex-col items-center space-y-4 max-w-3xl mx-auto">
              <DynamicChatHeaderNotConnected />
            </div>
          )}
        </div>
      </div>

      {/* Chat Feed - Responsive */}
      <div
        className="flex-grow p-2 sm:p-4 overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 140px)" }}
      >
        {isPending ? (
          <div className="flex justify-center items-center h-full">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <img
                  className="mx-auto w-20 h-20 sm:w-24 sm:h-24"
                  src="https://i.imgur.com/wAdNa6U.gif"
                  alt="Hamster animation"
                />
                <h1 className="text-2xl sm:text-3xl lg:text-4xl text-white font-bold mt-4">
                  {`Kon'nichiwa!`}
                </h1>
                <p className="text-sm sm:text-base mt-4 chat-text font-semibold">
                  No chat available
                </p>
                <h1 className="text-base sm:text-xl chat-text text-white font-bold">
                  Please join a room to start conversation
                </h1>
              </div>
            </div>
          </div>
        ) : isError ? (
          <div className="text-center p-4 bg-red-100 text-red-800 rounded-md mx-2">
            Failed to load messages. Please try again.
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {chatMessages.length === 0 && roomId ? (
              <div className="text-center p-4 text-gray-500 text-sm sm:text-base">
                No messages yet. Be the first to send one!
              </div>
            ) : (
              chatMessages.map((msg, index) => (
                <div
                  key={`${msg.author}-${msg.time}-${index}`}
                  className={`flex w-full mb-2 sm:mb-3 ${
                    msg.author === username ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 shadow-md ${
                      msg.author === username
                        ? "bg-[#9269FD] text-white rounded-br-none"
                        : "bg-gray-700 text-white rounded-bl-none"
                    } max-w-[85%] sm:max-w-[75%] break-words`}
                  >
                    <p className="font-medium text-xs sm:text-sm">
                      {msg.author === username ? "You" : msg.author}
                      <span className="text-xs text-gray-300 ml-2">({msg.time})</span>
                    </p>
                    <p className="mt-1 text-sm sm:text-base leading-relaxed">
                      {msg.message}
                    </p>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Section - Responsive */}
      <div className="flex items-center p-2 sm:p-4 bg-[#1B1C25] border-t border-gray-600">
        <img
          src="/exampleUserImage.png"
          alt="User Avatar"
          className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full mr-2 flex-shrink-0"
        />
        <form onSubmit={handleOnSubmit} className="flex w-full items-center gap-2 sm:gap-3">
          {roomId ? (
            <input
              className="flex-grow p-2 sm:p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#9269FD] text-sm sm:text-base"
              disabled={!roomId || isPending}
              type="text"
              placeholder={isPending ? "Connecting..." : "Write a message..."}
              value={currentMessage}
              onChange={(event) => setCurrentMessage(event.target.value)}
            />
          ) : (
            <div className="flex-grow p-2 sm:p-3 rounded-md text-center bg-gray-900 text-white text-sm sm:text-base">
              Please join room to continue!
            </div>
          )}

          <button
            type="submit"
            disabled={!roomId || currentMessage.trim() === "" || isPending}
            className="bg-[#9269FD] p-2 sm:p-3 rounded-md text-white flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#7d4de7] transition-colors flex-shrink-0"
          >
            <span className="hidden sm:inline">Send</span>
            <Forward size={16} className="sm:w-4 sm:h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default RoomChatFeed;