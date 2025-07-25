import { useEffect, useState, useRef } from "react";
import { Forward } from "lucide-react";
import io from "socket.io-client";
import { useLocation, useParams } from "react-router-dom";
import useRoomMessage from "../../../hooks/useRoomMessage";
import {
  DynamicChatHeaderConnected,
  DynamicChatHeaderNotConnected,
} from "./DynamicChatHeader/DynamicChatHeader";

const RoomChatFeed = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const username = localStorage.getItem("username");
  const { roomName } = location.state || {};
  const [currentMessage, setCurrentMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);
  // const queryClient = useQueryClient();

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

    const newSocket = io.connect("http://localhost:5000/");
    setSocket(newSocket);

    // Join the room
    newSocket.emit("join_room", roomId, username);

    // Listen for incoming messages
    const handleReceiveMessage = (data) => {
      // Only add to local state, don't invalidate query immediately
      // This prevents duplicate messages when you send a message
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
  }, [roomId, username]); // Removed queryClient from dependencies

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
      // (Remove this if your backend sends the message back to all users including sender)
      setChatMessages((prevMessages) => [...prevMessages, groupMessageData]);
    }
  };

  console.log(chatMessages)

  return (
    <div className="custom-bg flex flex-col h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r bg-[#1B1C25] flex-none border-b border-gray-600 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          {roomId ? (
            // Connected to room state
            <div className="flex flex-col  space-y-3">
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
                  key={`${msg.author}-${msg.time}-${index}`}
                  className={`flex w-full mb-3 ${msg.author === username ? "justify-end" : "justify-start"
                    }`}
                >
                  <div
                    className={`rounded-2xl px-4 py-2 shadow-md ${msg.author === username
                      ? "bg-[#9269FD] text-white rounded-br-none"
                      : "bg-gray-700 text-white rounded-bl-none"
                      } max-w-[75%] break-words`}
                  >
                    <p className="font-medium text-sm">
                      {msg.author === username ? "You" : msg.author}
                      <span className="text-xs text-gray-300 ml-2">({msg.time})</span>
                    </p>
                    <p className="mt-1 text-base leading-relaxed">{msg.message}</p>
                  </div>
                </div>

              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Section - Fixed at bottom */}
      <div className="flex items-center  p-4 ">
        <img
          src="/exampleUserImage.png" alt="User Avatar"
          className="w-12 h-12 rounded-full mr-2"
        />
        <form onSubmit={handleOnSubmit} className="flex w-full items-center">
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