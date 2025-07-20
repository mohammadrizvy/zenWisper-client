import { useEffect, useState, useRef } from "react";
import { Forward } from "lucide-react";
import io from "socket.io-client";
import { useLocation, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import useRoomMessage from "../../../hooks/useRoomMessage";
import { DynamicChatHeaderConnected, DynamicChatHeaderNotConnected } from "./DynamicChatHeader/DynamicChatHeader";

const RoomChatFeed = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const username = localStorage.getItem("username");
  const { roomName } = location.state || {};
  const [currentMessage, setCurrentMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);
  const queryClient = useQueryClient();

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

  // Socket connection setup
  useEffect(() => {
    const newSocket = io.connect("http://localhost:5000/");
    setSocket(newSocket);

    if (roomId) {
      newSocket.emit("join_room", roomId);
    }

    newSocket.on("receive_room_message", (data) => {
      // Update local state immediately for UI
      setChatMessages((prevMessages) => [...prevMessages, data]);

      // Invalidate the query to refetch messages on next render
      // This ensures sync between server and local state
      queryClient.invalidateQueries({ queryKey: ["messages", roomId] });
    });

    return () => {
      newSocket.disconnect();
    };
  }, [roomId, queryClient]);

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

      await socket.emit("send_room_message", groupMessageData);
      setCurrentMessage("");
    }
  };

  return (
    <div className="custom-bg flex flex-col h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 flex-none border-b border-gray-600 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          {roomId ? (
            // Connected to room state
            <div className="flex flex-col items-center space-y-3">
              {/* Main Room Info Card */}
             
            <DynamicChatHeaderConnected roomId={roomId} roomName={roomName} />
            
            </div>
          ) : (
            // Not connected state
            <div className="flex flex-col items-center space-y-4 max-w-3xl mx-auto">
              {/* Warning Card */}
              <DynamicChatHeaderNotConnected />
            </div>
          )}
        </div>
      </div>

      {/* Chat Feed - Fixed height with overflow */}
      <div
        className="flex-grow p-4 overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 180px)" }}
      >
        {isPending ? (
          <div className="flex justify-center items-center h-full">
            <div className="flex items-center justify-center ">
              <div className="text-center">
                {/* Lottie Animation */}
                {/* Alternatively, use an image */}
                <img
                  className="mx-auto"
                  src="https://i.imgur.com/wAdNa6U.gif"
                  alt="Hamster animation"
                />
                <h1 className="text-4xl text-white  font-bold mt-4">
                  {`Kon'nichiwa!`}
                </h1>
                <p className="text-base mt-4 chat-text font-semibold">
                  No chat availabe
                </p>
                <h1 className="text-xl chat-text text-white font-bold ">
                  Please join a room to start conversation
                </h1>
              </div>
            </div>
          </div>
        ) : isError ? (
          <div className="text-center p-4 bg-red-100 text-red-800 rounded-md">
            Failed to load messages. Please try again.
          </div>
        ) : (
          <div className="space-y-4">
            {chatMessages.length === 0 && roomId ? (
              <div className="text-center p-4 text-gray-500">
                No messages yet. Be the first to send one!
              </div>
            ) : (
              chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`chat ${
                    msg.author === username ? "chat-end" : "chat-start"
                  }`}
                >
                  <div
                    className={`chat-bubble ${
                      msg.author === username
                        ? "bg-[#9269FD] text-white"
                        : "bg-gray-700 text-white"
                    } max-w-[75%] break-words`}
                  >
                    <p className="font-semibold">
                      {msg.author === username ? "You" : msg.author}
                      <span className="text-xs text-gray-300 ml-2">
                        ({msg.time})
                      </span>
                    </p>
                    <p className="mt-1">{msg.message}</p>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Section - Fixed at bottom */}
      <div className="flex-none w-full p-4 bg-gray-800">
        <form onSubmit={handleOnSubmit} className="flex items-center">
          {roomId ? (
            <input
              className="flex-grow p-3 rounded-lg bg-gray-700 text-white focus:outline-none"
              disabled={!roomId || isPending}
              type="text"
              placeholder={isPending ? "Connecting..." : "Write a message..."}
              value={currentMessage}
              onChange={(event) => setCurrentMessage(event.target.value)}
            />
          ) : (
            <div className="flex-grow mx-auto p-3 rounded-md text-center bg-gray-900 text-white">
              Please join room to continue!
            </div>
          )}

          <button
            type="submit"
            disabled={!roomId || currentMessage.trim() === "" || isPending}
            className="ml-3 bg-[#9269FD] p-3 rounded-md text-white flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#7d4de7] transition-colors"
          >
            Send <Forward size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default RoomChatFeed;
